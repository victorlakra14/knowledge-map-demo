import { Box, Button, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { v4 } from "uuid";
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

export const AddNewNodeModal = ({getNodes, setNodes}) => {

    const [openAddNewNodeModal, setOpenAddNewNodeModal] = useState(false);
    const [courses, setCourses] = useState();
    const [chapters, setChapters] = useState();
    const [newNode, setNewNode] = useState({
        id: null,
        data: {
            label: "",
            course_id: null,
            course_name: "",
            chapter_id: null,
            chapter_name: "",
            exercise_id: null,
            exercise_name: "",
        },
        type: "topicNode",
        position: { x: 2000, y: 2000 }, 
    })

    const handleOpenAddNewNodeModal = () => {
        setOpenAddNewNodeModal(true);
    }

    const handleCloseAddNewNodeModal = () => {
        setOpenAddNewNodeModal(false);
    }

    const getCourses = async () => {
        try {
            const res = await axiosInstance.get("/course");
            setCourses(res.data.courses);
        } catch (err) {
            alert(err.message)
        }
    }

    const getChapters = async () => {
        try {
            const res = await axiosInstance.get("/chapter");
            setChapters(res.data.chapters);
        } catch (err) {
            alert(err.message)
        }
    }

    const handleNodeLabelChange = (e) => {
        setNewNode((prev) => {
            return {
                ...prev,
                data: {
                    ...prev.data,
                    label: e.target.value,
                    exercise_name: e.target.value
                }
            }
        })
    }

    const courseChangeHandler = (e) => {
        setNewNode((prev) => {
            return {
                ...prev,
                data: {
                    ...prev.data,
                    course_name: courses.filter((course) => course.course_id === e.target.value)[0].course_title,
                    course_id: Number(e.target.value)
                }
            }
        })
    }

    const chapterChangeHandler = (e) => {
        setNewNode((prev) => {
            return {
                ...prev,
                data: {
                    ...prev.data,
                    chapter_name: chapters.filter((chapter) => chapter.chapter_id == e.target.value)[0].chapter_title,
                    chapter_id: e.target.value
                }
            }
        })
    }

    const addNewNodeHandler = async () => {

        const nodeID = v4();
        const newNodeWithID = {
            ...newNode,
            id: nodeID,
            data: {
                ...newNode.data,
                exercise_id: nodeID
            }
        }

        try {
            // const res = await axiosInstance.post("/node/add", newNodeWithID);
            const res = await axiosInstance.post("/testNodes/add", newNodeWithID);
            console.log("Node added successfully", res);
            setNodes((prevNodes) => [...prevNodes, res.data.testNode]);
            handleCloseAddNewNodeModal();
        } catch (err) {
            alert(err.message)
        }
    }

    useEffect(() => {
        getCourses();
        getChapters();
    }, [])

  return (
    <div className="add-new-modal-node-container">
        <Button onClick={handleOpenAddNewNodeModal} color="primary" className="add-new-modal-node-btn">
            Add New Node
        </Button>
        <Modal
            open={openAddNewNodeModal}
            onClose={handleCloseAddNewNodeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <p className="text-lg mb-5 font-semibold">Add New Node</p>
                <input type="text" placeholder="Node Label" className="w-full h-10 border border-black rounded mb-5 px-3" onChange={handleNodeLabelChange}/>
                <select name="course" id="course" className="w-full h-10 border border-black rounded mb-5 px-3" onChange={courseChangeHandler}>
                    <option value="" disabled selected>Select Course</option>
                    {
                        courses && courses.map((course) => (
                            <option value={course.course_id}>{course.course_title}</option>
                        ))
                    }
                </select>
                <select name="chapter" id="chapter" className="w-full h-10 border border-black rounded mb-5 px-3" onChange={chapterChangeHandler}>
                    <option value="" disabled selected>Select Chapter</option>
                    {
                        chapters && chapters.map((chapter) => (
                            <option value={chapter.chapter_id}>{chapter.chapter_title}</option>
                        ))
                    }
                </select>
                <button className="w-full h-10 bg-blue-500 text-white rounded" onClick={addNewNodeHandler}>Add Node</button>
            </Box>
        </Modal>
    </div>
  )
}
