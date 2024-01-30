import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Autocomplete, Checkbox, FormControlLabel, TextField } from '@mui/material';

const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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

export const SelectGradeModal = ({mainGrade, setMainGrade}) => {

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleGradeChange = (e) => {
        setMainGrade(e.target.value)
    }

    const handleSelectAllGrades = () => {
        if (mainGrade.length === grades.length) {
            setMainGrade([])
        }
        else {
            setMainGrade(grades)
        }
    }


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
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={mainGrade}
                        label="Grade"
                        onChange={handleGradeChange}
                    >
                        <MenuItem value={1}>Grade 1</MenuItem>
                        <MenuItem value={2}>Grade 2</MenuItem>
                        <MenuItem value={3}>Grade 3</MenuItem>
                        <MenuItem value={4}>Grade 4</MenuItem>
                        <MenuItem value={5}>Grade 5</MenuItem>
                        <MenuItem value={6}>Grade 6</MenuItem>
                        <MenuItem value={7}>Grade 7</MenuItem>
                        <MenuItem value={8}>Grade 8</MenuItem>
                        <MenuItem value={9}>Grade 9</MenuItem>
                        <MenuItem value={10}>Grade 10</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Modal>
    </div>
  )
}
