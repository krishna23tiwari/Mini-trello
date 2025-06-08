import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { FaBars } from 'react-icons/fa'
import axios from 'axios'
import baseurl from '../BaseUrl'
import { getAuthHeaders } from '../utils/authHeaders'

const NavBar = () => {
  const count = useSelector((state) => state.counter.value)

  const [menuOpen, setMenuOpen] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [passwordModal, setPasswordModal] = useState(false)

  const dropdownRef = useRef(null)
  const userEmail = localStorage.getItem("email")

  const [profileData, setProfileData] = useState({
    name: '',
    age: '',
    email: userEmail || ''
  })

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    email: userEmail || ''
  })

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value })
  }

  const handleSaveProfile = async () => {
    try {
      const res = await axios.put(`${baseurl}/user/update-profile`, profileData, getAuthHeaders())
      alert(res.data.message)
      setEditModal(false)
    } catch (err) {
      alert(err.response?.data?.message || "Error updating profile")
    }
  }

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value })
  }

  const handlePasswordReset = async () => {
    try {
      const res = await axios.post(`${baseurl}/user/reset-password`, passwordData, getAuthHeaders())
      alert(res.data.message)
      setPasswordModal(false)
    } catch (err) {
      alert(err.response?.data?.message || "Error resetting password")
    }
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md relative">
      <div className="text-xl font-bold text-gray-800">My App</div>

      <div className="flex items-center gap-4">
        <span className="font-medium text-gray-700">Counter: {count}</span>
        <button className="border px-3 py-1 rounded hover:bg-indigo-500 hover:text-white">Theme</button>

       
        <div ref={dropdownRef} className="relative">
          <FaBars className="text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-48 z-50">
              <button onClick={() => { setEditModal(true); setMenuOpen(false) }} className="w-full text-left px-4 py-2 hover:bg-indigo-100">Edit Profile</button>
              <button onClick={() => { setPasswordModal(true); setMenuOpen(false) }} className="w-full text-left px-4 py-2 hover:bg-indigo-100">Reset Password</button>
              <button className="w-full text-left px-4 py-2 hover:bg-indigo-100">Settings</button>
            </div>
          )}
        </div>
      </div>

      
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-center text-indigo-600">Edit Profile</h2>

            <input name="name" placeholder="Name" value={profileData.name} onChange={handleProfileChange}
              className="w-full border px-3 py-2 rounded focus:outline-indigo-400" />

            <input name="age" placeholder="Age" value={profileData.age} onChange={handleProfileChange}
              className="w-full border px-3 py-2 rounded focus:outline-indigo-400" />

            <input type="email" value={profileData.email} readOnly
              className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed" />

            <div className="flex justify-end space-x-2">
              <button onClick={() => setEditModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleSaveProfile} className="px-4 py-2 bg-indigo-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}

  
      {passwordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-center text-indigo-600">Reset Password</h2>

            <input type="email" value={passwordData.email} readOnly
              className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed" />

            <input type="password" name="oldPassword" placeholder="Old Password"
              value={passwordData.oldPassword} onChange={handlePasswordChange}
              className="w-full border px-3 py-2 rounded focus:outline-indigo-400" />

            <input type="password" name="newPassword" placeholder="New Password"
              value={passwordData.newPassword} onChange={handlePasswordChange}
              className="w-full border px-3 py-2 rounded focus:outline-indigo-400" />

            <div className="flex justify-end space-x-2">
              <button onClick={() => setPasswordModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handlePasswordReset} className="px-4 py-2 bg-indigo-600 text-white rounded">Change</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar
