import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import baseurl from '../BaseUrl'

const LogIn = () => {
    const [formdata, setformdata] = useState({
        email : "",
        password: ""
    })

    const navi = useNavigate()

    const handleChange = (e) => {
        setformdata({...formdata, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(formdata.email, formdata.password)

        senddata()
        setformdata({
            email : "",
            password : ""
        })
    }

    const senddata = async() => {
        try {
            const res = await axios.post(`${baseurl}/user/logindata`, formdata)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('email', res.data.email)
            alert(res.data.message)
            navi('/main')
        } catch (error) {
            const val = error.response?.data?.message
            alert(val)
        }
    }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-indigo-600">Log In</h2>

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
            placeholder="Enter your password"
            value={formdata.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition ease-in"
        >
          Log In
        </button>

        {/* Sign Up Link */}
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{' '}
          <Link to="/" className="text-indigo-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}

export default LogIn
