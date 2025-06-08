import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import baseurl from '../BaseUrl'


const SignUp = () => {
    const [formdata, setformdata] = useState({
        name : "",
        email : "",
        password : "",
        age : "",
        gender : ""
    })

    const navi = useNavigate()

    const handleChange = (e) => {
        setformdata({...formdata, [e.target.name]: e.target.value })   
    }

    const handlesubmit = (e) => {
        e.preventDefault()
        console.log(formdata.name, formdata.email, formdata.password, formdata.age, formdata.gender)

        sendingdata()
        setformdata({
            name: "",
            email: "",
            password: "",
            age: "",
            gender: ""
          });   
    }

    const sendingdata = async() => {
        try {
            const res = await axios.post(`${baseurl}/user/senddata`, formdata)
            alert(res.data.message)
            localStorage.setItem('email', formdata.email)
            navi('/otp')
        } catch (error) {
            const res = (error.response?.data?.message )
            alert(res)
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <form onSubmit={handlesubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-indigo-600">Sign Up</h2>

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Name</label>
          <input
            type="text"
            name='name'
            placeholder="Enter your name"
            value={formdata.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name='email'
            placeholder="Enter your email"
            value={formdata.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Password</label>
          <input
            type="password"
            name='password'
            placeholder="Enter password"
            value={formdata.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Age</label>
          <input
            type="number"
            name='age'
            placeholder="Enter your age"
            value={formdata.age}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Gender</label>
          <select 
          value={formdata.gender}
          onChange={handleChange}
          name='gender'
           className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition ease-in"
        >
          Sign Up
        </button>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </div>
  )
}

export default SignUp
