import React, { useEffect, useState } from "react";
import FeedbackForm from "../feedback/feedbackForm.jsx";
import Button from "../utils/Button.jsx";
import {
  updateFeedback,
} from "../../store/adminSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
          <form>
            <FeedbackForm
              placeholder="edit your feedback"
              content={content}
              setcontent={setcontent}
            />
          </form>

          <Button onClick={handleSubmit} children={buttonValue} />
        </div>
      ) : (
        <div className="border rounded-md flex flex-col justify-center w-[40%]">
          <textarea
            readOnly
            value={editFeedback.content}
            className="w-full h-40 p-2  rounded resize-none"
          />
          <Button onClick={handleClose} children="Go Back" />
        </div>
      )}
    </div>
  );
};

export default AdminFeedbackPage;
