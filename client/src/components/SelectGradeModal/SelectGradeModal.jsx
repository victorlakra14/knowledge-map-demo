import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Autocomplete, Checkbox, FormControlLabel, ListItemText, TextField } from '@mui/material';
import axiosInstance from '../../Axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};

export const SelectGradeModal = ({mainGrade, setMainGrade, setNodes}) => {

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const [courses, setCourses] = useState();

    const getCourses = async () => {
        try {
            const res = await axiosInstance.get("/course");
            setCourses(res.data.courses);
            const courseIds = res.data.courses.map((course) => course.course_id);
            setMainGrade(courseIds);
        } catch (err) {
            alert(err.message)
        }
    }

    const handleSelectAllGrades = () => {
        if (mainGrade.length === courses.length) {
            setMainGrade([])
        } else {
            const courseIds = courses.map((course) => course.course_id)
            setMainGrade(courseIds)
        }
    }

    const getFilteredNodes = async () => {
        try {
        //   const res = await axiosInstance.post("/node/filter", {course_ids: mainGrade});
            const res = await axiosInstance.post("/testNodes/filter", {course_ids: mainGrade});
          setNodes(res.data.filtered_testNodes);
          setTimeout(() => {
            handleCloseModal();
          }, 1 * 1000);
        } catch (err) {
          alert(err.message);
        }
    };

    const submitGradeHandler = () => {
      getFilteredNodes();  
    }

    useEffect(() => {
        getCourses();
    }, [])


  return (
    <div className="select-grade-modal-container">
        <Button onClick={handleOpenModal}>Select Grade</Button>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <p className="text-lg mb-5 font-semibold">Select Grades</p>
                {
                    courses && (
                        <>
                            <FormControl fullWidth>
                            <InputLabel id="checkbox-dropdown-label">Grades</InputLabel>
                                <Select
                                    labelId='checkbox-dropdown-label'
                                    id='checkbox-dropdown'
                                    multiple
                                    label='Grades'
                                    value={mainGrade}
                                    onChange={() => {}}
                                    renderValue={(selected) => {
                                        const selectedCourses = courses.filter((course) => selected.includes(course.course_id));
                                        return selectedCourses.map((course) => course.course_title).join(', ');
                                    }}
                                >
                                    <MenuItem key="select-all" onClick={handleSelectAllGrades}>
                                        <FormControlLabel 
                                            control={
                                                <Checkbox 
                                                    indeterminate={
                                                        mainGrade.length > 0 && 
                                                        mainGrade.length < courses.length
                                                    }
                                                    checked={
                                                        mainGrade.length === courses.length
                                                    }
                                                />
                                            }
                                            label="Select All"
                                        />
                                    </MenuItem>
                                    {
                                        courses.map((course) => (
                                            <MenuItem key={course.course_id} value={course.course_id}>
                                                <FormControlLabel 
                                                    control={
                                                        <Checkbox 
                                                            checked={mainGrade.includes(course.course_id)}
                                                            onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    setMainGrade([...mainGrade, course.course_id])
                                                                } else {
                                                                    setMainGrade(mainGrade.filter((id) => id !== course.course_id))
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label={course.course_title}
                                                />
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </>
                    )
                }
                <div className="mt-5 flex justify-end">
                    <Button onClick={submitGradeHandler}>
                        Submit
                    </Button>
                </div>
            </Box>
        </Modal>
    </div>
  )
}
