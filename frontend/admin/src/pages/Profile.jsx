import React, { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa6"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import PasswordInput from "../components/Inputs/PasswordInput"
import { TbTrash } from "react-icons/tb"
import { BsPerson } from "react-icons/bs"
import axiosInstance from "../utils/axiosInstance"

const Profile = ({ username, role }) => {
  username = localStorage.getItem("username")
  role = localStorage.getItem("role")

  const [data, setData] = useState({
    username: "",
    password: "",
  })

  const onChangeHandler = (event) => {
    // const name = event.target.name
    const { name, value } = event.target
    setData({ ...data, [name]: value })
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append("username", data.username)
    formData.append("password", data.password)

    // Temporary Render
    console.log(data)
    toast.success("User added")
    setData({
      username: "",
      password: "",
    })

    //   API call - Waiting
    //   const response = await axiosInstance.post(
    //     `${BASE_URL}/users/create`,
    //     formData
    //   )
    //   if (response.data.success) {
    //     setData({
    //       username: "",
    //       password: "",
    //     })
    //     toast.success(response.data.message)
    //   } else {
    //     toast.error(response.data.message)
    //   }
  }

  return (
    <>
      <div className="p-4 sm:p-10 w-full bg-white rounded-xl">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-y-5 max-w-[555px]"
          action=""
        >
          <h4 className="bold-22 pb-2 uppercase">Edit Profile</h4>

          <div className="flex items-center bg-red-500/5 px-5 rounded mb-3">
            <input
              onChange={onChangeHandler}
              value={data.username}
              name="username"
              placeholder="Username"
              type="text"
              required
              className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
            ></input>
          </div>

          <PasswordInput
            name="password"
            value={data.password}
            onChange={onChangeHandler}
          />

          <button
            type="submit"
            className="btn-dark sm:w-5/12 flexCenter gap-x-2 !py-2 rounded"
          >
            <FaPlus />
            Add User
          </button>
        </form>
      </div>
    </>
  )
}

export default Profile
