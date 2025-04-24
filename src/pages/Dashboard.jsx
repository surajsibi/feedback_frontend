import { useEffect, useState } from 'react';
import FeedbackTextarea from "../components/feedback/FeedbackPage.jsx"  
import FeedbackList from '../components/feedback/FeedbackList.jsx';
import Button  from '../components/utils/Button.jsx';

export default function Dashboard() { 

  const [editFeedback, setEditFeedback] = useState(false);

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center  items-center ">
    <div className='border px-3  w-[50%] h-[70%]'>
    <div className=' flex flex-col items-center gap-2 '>
      <div className='font-bold  text-xl'>Feedback</div>
      <div className='flex gap-4'>
        <Button  onClick={() => setEditFeedback(false)} children="Add Feedback"/>
        <Button onClick={() => setEditFeedback(true)} children="Edit Feedback"/> 
      </div>
    </div>
    <div className='mt-2'>
      <div>
        Your Feedback
      </div>
      <div>
      {editFeedback == false ?<FeedbackTextarea /> :<FeedbackList setEditFeedback={setEditFeedback}/>}
      
      
      </div>
    </div>
    </div>
      
    </div>
  );
}
