import React, { useState } from "react"
import PasswordInput from "../components/Inputs/PasswordInput"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axiosInstance"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!password) {
      setError("Please enter a valid password.")
      return
    }

    setError("") // Clear any previous errors

    try {
      // Login API Call to backend
      const response = await axiosInstance.post("/api/login/users", {
        username: username,
        password: password,
      })

      console.log("Response from server:", response)

      // Assuming the response includes user role and username
      if (response && response.data && response.data.data) {
        // The Login API needs to return the user's role & username
        // Store the user role and username in localStorage
        const { role, username } = response.data.data

        localStorage.setItem("role", role)
        localStorage.setItem("username", username)

        // Use setTimeout to ensure localStorage is updated
        setTimeout(() => {
          navigate("/profile")
        }, 100)

        // Redirect to the dashboard after login
      } else {
        // Handle the case where login is not successful
        setError("Unexpected response from the server.")
      }
    } catch (error) {
      // Catch and display any errors from the API
      if (error.response && error.response.data) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again later.")
      }
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin()
    }
  }

  return (
    <div className="h-screen bg-red-50 overflow-hidden relative">
      <div className="login-ui-box right-10 -top-40" />
      <div className="login-ui-box bg-red-200 -bottom-40 right-1/2" />

      <div className="container h-screen w-screen overflow-hidden flex items-center flex-col md:flex-row justify-center px-20x mx-auto">
        <div className="md:w-2/4 h-[90vh] flex items-end bg-login-bg-img bg-cover bg-center md:rounded-lg p-10 z-50">
          <div>
            <h4 className="text-5xl text-white font-semibold leading-[58px]">
              Dashboards
            </h4>
            <p className="text-[15px] text-white leading-6 pr-7 mt-4">
              Access dashboards to manage the Pasta Picker website.
            </p>
          </div>
        </div>

        <div className="w-screen md:w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-red-200/20">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl font-semibold mb-7">Login</h4>

            <input
              type="text"
              placeholder="Username"
              className="input-box"
              value={username}
              onChange={({ target }) => {
                setUsername(target.value)
              }}
            />

            <PasswordInput
              value={password}
              onChange={({ target }) => {
                setPassword(target.value)
              }}
              onKeydown={handleKeyDown}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-secondary">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
