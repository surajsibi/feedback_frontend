import React, {  useEffect, useState } from "react";
import FeedbackForm from "./feedbackForm.jsx";
import Button from "../utils/Button.jsx";
import {addFeedback, setEditingFeedback, updateFeedback,} from "../../store/feedbackSlice.js"
import { useDispatch ,useSelector} from "react-redux";
import toast from "react-hot-toast";


const FeedbackTextarea = () => {
  const [content, setcontent] = useState("");
  const dispatch = useDispatch();
 
  const editFeedback = useSelector(state => state.feedback.editingFeedback);
  console.log(editFeedback,"this is edit feedback");

  const [buttonValue, setButtonValue] = useState("Submit");
  

  const handleSubmit =async (e) => {
    e.preventDefault();
    if(!content){
      toast.error("Please write your feedback");
    }
    else if(editFeedback){
      await dispatch(updateFeedback({id:editFeedback._id,updatedContent:content}));
     await setButtonValue("Submit");
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
   <div className='flex flex-col gap-2 '>
     <form >
      <FeedbackForm
        placeholder="Write your feedback"
        content={content}
        setcontent={setcontent}
      />
    </form>
    <div className="flex justify-center">
    <Button onClick={handleSubmit}  className="py-2 px-4 mt-5 bg-green-400 text-white w-[30%] self-center text-xl" children={buttonValue}/>
   
    </div>
   </div>
  );
};

export default FeedbackTextarea;
