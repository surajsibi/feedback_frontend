import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FeedbackTextarea from "../components/feedback/FeedbackPage.jsx"  
import FeedbackList from '../components/feedback/FeedbackList.jsx';
import Button  from '../components/utils/Button.jsx';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { logoutUser } from '../store/authSlice.js';

import {setEditingFeedback} from "../store/feedbackSlice.js"
export default function Dashboard() { 
  const [editFeedback, setEditFeedback] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logout = async() =>{
   await dispatch(logoutUser())
    navigate("/")        
  }
  const handleCancel=()=>{
    dispatch(setEditingFeedback(null));
    setEditFeedback(true);
  }

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center  items-center ">
    <div className=' px-3  w-[100%] h-[100%] mt-4'>
    <div className=' flex flex-col items-center gap-9 '>
      <div className='flex '>
      <div className='font-bold  text-3xl ml-22'>Feedback</div>
      <Button onClick = {logout} children="Logout" className=' py-2 px-4 ml-[150%] bg-black text-white'/>
      </div>
      <div className='flex gap-4'>
        <Button  onClick={() => setEditFeedback(false)} className='py-2 px-4 bg-blue-400 text-white'  children="Add Feedback"/>
        <Button onClick={() => setEditFeedback(true)} className= ' py-2 px-4 bg-red-400 text-white' children="Edit Feedback"/> 
      </div>
    </div>
    <div className='mt-2'>
      <div className='flex justify-between'>
      <div className='my-3 font-semibold text-2xl'>
        {editFeedback == false ? "Add Feedback" : "Edit Feedback"}
      </div>
      <div className='flex justify-center items-center'>
      {editFeedback == true ? "" :<Button onClick={handleCancel} className='font-bold text-xl border-none px-2 py-2 bg-red-600 ' children={<RxCross2  width={30} height={30} />}/>}
      </div>
      </div>
      
      <div className='mt-7'>
      {editFeedback == false ?<FeedbackTextarea /> :<FeedbackList setEditFeedback={setEditFeedback}/>}
      </div>
    </div>
    </div>
    </div>
  );
}
