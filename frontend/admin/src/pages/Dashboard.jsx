import React from "react"
import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { ToastContainer } from "react-toastify"

const Dashboard = ({ role, username }) => {
  return (
    <>
      <ToastContainer />
      <div className="bg-primary text-[#404040] text-[90%]">
        <Header username={username} role={role} />
        <div className="mx-auto max-w-[1440px] flex flex-col sm:flex-row mt-3">
          <Sidebar username={username} role={role} />
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Dashboard
