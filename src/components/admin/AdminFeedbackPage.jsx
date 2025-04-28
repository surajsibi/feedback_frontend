import React, { useEffect, useState } from "react";
import FeedbackForm from "../feedback/feedbackForm.jsx";
import Button from "../utils/Button.jsx";
import { updateFeedback } from "../../store/adminSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import {setEditingFeedback} from "../../store/feedbackSlice.js";

const AdminFeedbackPage = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [content, setcontent] = useState("");
  const dispatch = useDispatch();

  const editFeedback = useSelector((state) => state.feedback.editingFeedback);
  console.log(editFeedback, "this is edit feedback");

  const [buttonValue, setButtonValue] = useState("update");


  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      updateFeedback({
        id: editFeedback._id,
        updatedContent: content,
      })
    );
    navigate(`/admin/${editFeedback.user._id}`);
  };

  const handleCancel = () => {
    dispatch(setEditingFeedback(null));
    navigate(`/admin/${editFeedback.user._id}`);
  };

  const handleClose = async () => {
    navigate(`/admin/${editFeedback.user._id}`);
  };

  useEffect(() => {
    setcontent(editFeedback?.content);
  }, [editFeedback]);
  

  return (
    <div className="flex w-full h-[100vh] items-center justify-center">
      {name == "edit" ? (
        <div className="flex flex-col gap-2 w-[50%]">
          <div className="flex  justify-between">
            <h1 className="text-3xl font-bold">Edit Feedback</h1>
            
            <div>
              <Button
                onClick={handleCancel}
                className="font-bold text-xl border-none px-2 py-2 bg-red-400 "
                children={<RxCross2 width={30} height={30} />}
              />
            </div>
          </div>
          <form>
            <FeedbackForm
              placeholder="edit your feedback"
              content={content}
              setcontent={setcontent}
            />
          </form>
          <Button
            onClick={handleSubmit}
            disableHover={true}
            children={buttonValue}
          />
        </div>
      ) : (
        <div className=" rounded-md flex flex-col justify-center w-[40%]">
          <textarea
            readOnly
            value={editFeedback.content}
            className="w-full h-40 p-2 text-xl font-bold  rounded-lg resize-none bg-white mb-5"
          />
          <Button
            onClick={handleClose}
            children="Go Back"
            disableHover={true}
          />
        </div>
      )}
    </div>
  );
};

export default AdminFeedbackPage;
