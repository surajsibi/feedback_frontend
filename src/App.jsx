import { useState } from "react";
import "./App.css";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Admin from "./pages/Admin.jsx";
import UserFeedback from "./components/admin/UserFeedback.jsx";
import AdminFeedbackPage from "./components/admin/AdminFeedbackPage.jsx";
import {Toaster} from "react-hot-toast"

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      
        <Routes>  
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/admin/:id" element={<UserFeedback/>} />
          <Route path="/admin/feedback/:name" element={<AdminFeedbackPage/>} />
        </Routes>
        <Toaster position="top-right"
        reverseOrder={false}
        
        toastOptions={{
          error:{
            style: {
              borderRadius:"0", color:"red"
            },
          },
          success:{
            style: {
              borderRadius:"0", color:"green"
            },
          },
          // Define default options
        
          duration: 2000,
          style: {
            width: '300px',
            background: '#363636',
            color: '#fff',
          },
        }}
        
        />

    </>
  );
}

export default App;
