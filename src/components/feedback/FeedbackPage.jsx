import React, {  useEffect, useState } from "react";
import FeedbackForm from "./feedbackForm.jsx";
import Button from "../utils/Button.jsx";
import {addFeedback, setEditingFeedback, updateFeedback,} from "../../store/feedbackSlice.js"
import { useDispatch ,useSelector} from "react-redux";


const FeedbackTextarea = () => {
  const [content, setcontent] = useState("");
  const dispatch = useDispatch();
 
  const editFeedback = useSelector(state => state.feedback.editingFeedback);
  console.log(editFeedback,"this is edit feedback");

  const [buttonValue, setButtonValue] = useState("Submit");
  

  const handleSubmit =async (e) => {
    e.preventDefault();
    if(editFeedback){
      await dispatch(updateFeedback({id:editFeedback._id,updatedContent:content}));
     await setButtonValue("Submit");
      console.log("work done")
      setcontent("");
    }
    else{
     console.log(content)
      await  dispatch(addFeedback({content}))

      setcontent("");
    }
  };
  

  useEffect(() => {
    if (editFeedback) {
      setcontent(editFeedback.content);
      setButtonValue("Update");
    } else {
      setcontent("");
      setButtonValue("Submit");
    }
  }, [editFeedback]);

  return (
   <div className='flex flex-col gap-2'>
     <form >
      <FeedbackForm
        placeholder="Write your feedback"
        content={content}
        setcontent={setcontent}
      />
    </form>

    <Button onClick={handleSubmit} children={buttonValue}/>
   </div>
  );
};

export default FeedbackTextarea;
