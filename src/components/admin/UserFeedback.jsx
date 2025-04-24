import React, { useEffect } from 'react'
import { getUserFeedback } from '../../store/adminSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import {setEditingFeedback} from "../../store/feedbackSlice.js"
import { useNavigate } from 'react-router-dom';
import { deleteFeedback } from '../../store/adminSlice.js';





const UserFeedback = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {id} = useParams()
    console.log(id,"is this id");
    
    const feedbacks = useSelector((state) => state.admin.usersFeedback);
    const handleDelete = (feedbacks) =>{
      dispatch(deleteFeedback(feedbacks._id));
    }

    useEffect(()=>{
        dispatch(getUserFeedback(id));
    },[id,handleDelete])
    console.log(feedbacks,"this is ");

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
        const day = String(date.getDate()).padStart(2, "0");
        const year = String(date.getFullYear()).slice(-2); // get last two digits
        return `${day}-${month}-${year}`;
      };
    

      const handleEdit = (feedback) => {
        dispatch(setEditingFeedback(feedback));
        navigate("/admin/feedback/edit")
      };
      
      const handleView = (feedback) => {
        dispatch(setEditingFeedback(feedback));
        navigate("/admin/feedback/view")
      };

      
      


  return (
    <div className='w-full h-[100vh] flex flex-col justify-center  items-center'>
    <h1 className='text-3xl mb-4 font-bold'>Admin Feedback dashboard</h1>
    <div className="w-[50%]">
    <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
          <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Feedback</th>
            <th className="py-2 px-4">date</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
        {feedbacks && feedbacks.length > 0 ? (
            feedbacks.map((feedback,index) => (
              <tr key={feedback.id || feedback._id} className="border-t">
                <td className="py-2 px-4 w-[10%]">{index+1|| feedback._id}</td>
                <td className="py-2 px-4 w-[70%]">{feedback.content}</td>
                <td className='w-[20%]'>{formatDate(feedback.createdAT)}</td>
                <td className="py-2 px-4">
                  <div className="flex gap-2 w-[20%]">
                    <button
                        onClick={() =>handleView(feedback) }
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                    >
                      View
                    </button>
                    <button
                        onClick={() =>handleEdit(feedback) }
                      className="bg-green-400 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                        onClick={() => handleDelete(feedback) }
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-2 px-4 text-center">
                No feedbacks found
              </td>
            </tr>
          )}      
        </tbody>
      </table>
      
    </div></div>
  )
}

export default UserFeedback
