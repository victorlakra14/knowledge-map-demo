import React, { useEffect, useState } from 'react'
import axiosInstance from '../../Axios';
import { schemeCategory10 } from 'd3-scale-chromatic';

export const TopRightPanel = () => {
  
  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    try {
      const res = await axiosInstance.get("/course");
      setCourses(res.data.courses);
    } catch (err) {
      alert(err.message);
    }
  }

  const getColorScale = () => {
    return schemeCategory10;
  }

  const getNodeColor = (courseID) => {
    const colorScale = getColorScale();
    return colorScale[courseID % colorScale.length];
  }

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="panel bg-white shadow-lg rounded p-4">
      {
        courses && (
          <>
            {courses.map((course) => {
              return (
                <div key={course.course_id} className="flex gap-2 items-center">
                  <div style={{backgroundColor: getNodeColor(course.course_id)}} className="w-3 h-3 rounded-full" />
                  <p className="font-semibold">{course.course_title}</p>
                </div>
              )
            })}
          </>
        )
      }
    </div>
  )
}
