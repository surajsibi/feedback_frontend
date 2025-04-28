import React, { useEffect } from 'react'
import {getUsers} from "../../store/adminSlice.js"
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {logoutUser} from "../../store/authSlice.js"
import Button from "../utils/Button.jsx"


const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);

  useEffect(()=>{
    dispatch(getUsers());
  },[])
  console.log(users);

  const handleViewUser = (userId) => {
    navigate(`/admin/${userId}`);    
 
  };
  const logout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="p-4 border w-full h-full flex flex-col  ">
    <h1 className='text-3xl font-bold text-center'>Admin Dashboard</h1>
    <div className="flex justify-between w-full  ">
    <h2 className="text-xl font-semibold mb-4">All Users</h2>
    <div className="flex  ml-[80%] justify-center items-center " >
    <Button
      children="Logout"
      onClick={logout}
      disableHover={true}
      className="bg-black text-white px-4 py-2 rounded hover:bg-black transition "
    />
    </div>
    <div>

    </div>
    </div>
    <div className="w-full h-[90%] overflow-y-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-t">
              <td className="py-2 px-4">{user.username}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleViewUser(user._id)}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default AdminDashboard
