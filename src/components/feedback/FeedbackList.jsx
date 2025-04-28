import React, { useEffect } from "react";
import {getFeedbacks} from '../../store/feedbackSlice.js'
import { setEditingFeedback } from "../../store/feedbackSlice.js";
import {useDispatch, useSelector} from 'react-redux'
import { RxCross2 } from "react-icons/rx";
export default function FeedbackList({setEditFeedback}) {
  const dispatch = useDispatch()
  const feedbacks = useSelector((state) => state.feedback.feedbacks);

  useEffect(() => {
    dispatch(getFeedbacks());
  }, []);
  console.log(feedbacks);

  const handleEdit = (feedback) => {
    dispatch(setEditingFeedback(feedback));
    setEditFeedback(false);
  };
  
  
  return (
    <div className="border w-full h-[65vh] overflow-y-scroll">
      <table className="table-auto border w-full ">
      <thead>
        <tr className="border">
        <th className="p-4 border">ID</th>
          <th className="p-4 border">Content</th>
          <th className="p-4">Actions</th>
          </tr>
      </thead>
      <tbody>
          {feedbacks && feedbacks.length > 0 ? (
            feedbacks.map((feedback,index) => (
              <tr key={feedback.id || feedback._id} className="border-b">
                <td className="p-4 border-r">{index+1|| feedback._id}</td>
                <td className="p-4 border-r w-[80%]">{feedback.content}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleEdit(feedback)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4">
                No feedback found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
