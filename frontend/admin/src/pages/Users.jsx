import React, { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa6"
import axiosInstance from "../utils/axiosInstance"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import PasswordInput from "../components/Inputs/PasswordInput"
import { TbTrash } from "react-icons/tb"
import { BsPerson } from "react-icons/bs"
import { FaPencilAlt } from "react-icons/fa"

const Users = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
    role: "",
  })

  const [users, setUsers] = useState([])

  // Edit mode
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingUserId, setEditingUserId] = useState(null)

  // Get role of logged-in user (admin or superadmin)
  const loggedInUserRole = localStorage.getItem("role") || ""

  // Set default role based on the logged-in user
  useEffect(() => {
    if (!isEditMode) {
      setData((prevData) => ({
        ...prevData,
        role: loggedInUserRole === "admin" ? "crew" : "admin", // Default to crew for admin, admin for superadmin
      }))
    }
  }, [loggedInUserRole, isEditMode])

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/api/users")
      setUsers(response.data.results)
    } catch (error) {
      console.error("Error fetching users", error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Delete user
  const hideItem = async (itemId) => {
    try {
      await axiosInstance.patch(`/api/users/delete/${itemId}`)
      setUsers((prevUsers) => prevUsers.filter((item) => item._id !== itemId))
      toast.success("User removed")
    } catch (error) {
      toast.error("Error deleting user")
    }
  }

  // Handle change in form inputs
  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setData({ ...data, [name]: value })
  }

  // Handle form submission (Add/Edit user)
  const onSubmitHandler = async (event) => {
    event.preventDefault()

    if (!data.role) {
      toast.error("Please select a role for the user.")
      return
    }

    // Ensure role is in lowercase
    const updatedData = {
      ...data,
      role: data.role.toLowerCase(),
    }

    if (isEditMode) {
      // Edit user
      try {
        const response = await axiosInstance.patch(
          `/api/users/edit/${editingUserId}`,
          updatedData
        )
        if (response.status === 200) {
          toast.success("User updated successfully")
          resetForm()
          fetchUsers() // Refetch users after successful edit
        } else {
          toast.error("Error updating user")
        }
      } catch (error) {
        toast.error("Error updating user")
      }
    } else {
      // Add user
      try {
        const response = await axiosInstance.post("/api/users/add", updatedData)
        if (response.status === 201) {
          toast.success(response.data.message)
          resetForm()
          fetchUsers() // Refetch users after adding a new one
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        toast.error("Error adding user")
      }
    }
  }

  // Edit user
  const editUser = (user) => {
    setData({
      username: user.username,
      password: "",
      role: user.role.charAt(0).toUpperCase() + user.role.slice(1), // Display role in capitalized form
    })
    setEditingUserId(user._id)
    setIsEditMode(true)
  }

  // Reset form after submission or cancel
  const resetForm = () => {
    setData({
      username: "",
      password: "",
      role: loggedInUserRole === "admin" ? "crew" : "admin", // Reset to default based on logged-in user role
    })
    setEditingUserId(null)
    setIsEditMode(false)
  }

  // Filter users based on the logged-in user's role
  const filteredUsers = (users || []).filter((user) => {
    if (!user.role) return false
    if (loggedInUserRole === "admin") {
      return (
        user.role.toLowerCase() === "crew" ||
        user.role.toLowerCase() === "rider"
      )
    } else if (loggedInUserRole === "superadmin") {
      return user.role.toLowerCase() === "admin"
    }
    return false
  })

  return (
    <>
      <ToastContainer />

      <div className="p-4 sm:p-10 w-full bg-white rounded-xl">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-y-5 max-w-[555px]"
          action=""
        >
          <h4 className="bold-22 pb-2 uppercase">
            {isEditMode
              ? `Edit ${loggedInUserRole === "superadmin" ? "Admin" : "User"}`
              : `Add ${loggedInUserRole === "superadmin" ? "Admin" : "User"}`}
          </h4>
          <div className="flex flex-col gap-y-2">
            <p>Type</p>
            <select
              onChange={onChangeHandler}
              value={data.role.toLowerCase() || ""}
              name="role"
              className="flex items-center ring-1 ring-slate-900/10 bg-red-500/5 px-5 py-3 cursor-pointer rounded mb-3 mt-3 w-1/2 md:w-1/4"
            >
              {loggedInUserRole === "admin" && (
                <>
                  <option value="crew">Crew</option>
                  <option value="rider">Rider</option>
                </>
              )}
              {loggedInUserRole === "superadmin" && (
                <option value="admin">Admin</option>
              )}
            </select>
          </div>
          <div className="flex items-center bg-red-500/5 px-5 rounded mb-3">
            <input
              onChange={onChangeHandler}
              value={data.username}
              name="username"
              placeholder="Username"
              type="text"
              required
              className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
            ></input>{" "}
          </div>{" "}
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
            {isEditMode ? "Save Changes" : "Add a User"}
          </button>
        </form>

        <h4 className="bold-22 uppercase mt-12">Users</h4>
        <div className="overflow-auto mt-5">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-900/20 text-gray-30 regular-14 xs:regular-16 text-start py-12">
                <th className="p-1 text-left">User</th>
                <th className="p-1 text-left">Username</th>
                <th className="p-1 text-left">Role</th>
                <th className="p-1 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((item) => (
                <tr
                  key={item._id}
                  className="border-b border-slate-900/20 text-gray-50 p-6 medium-14 text-left"
                >
                  <td className="p-1">
                    <BsPerson className="bold-22" />
                  </td>
                  <td className="p-1">
                    <div className="line-clamp-3">{item.username}</div>
                  </td>
                  <td className="p-1">{item.role}</td>
                  <td className="p-1">
                    <div className="flex gap-3">
                      {/* Edit button */}
                      <FaPencilAlt
                        onClick={() => editUser(item)}
                        className="cursor-pointer"
                      />
                      {/* Delete button */}
                      <TbTrash
                        onClick={() => hideItem(item._id)}
                        className="cursor-pointer"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Users
