import React from "react"

import LOGO from "../assets/images/logo-admin.svg"
import ProfileInfo from "./ProfileInfo"
import { useNavigate } from "react-router-dom"

const Header = ({ username, role }) => {
  const navigate = useNavigate()

  username = localStorage.getItem("username")
  role = localStorage.getItem("role")

  const onLogout = () => {
    localStorage.removeItem("role")
    localStorage.removeItem("username")
    username = null
    role = null
    navigate("/login")
  }

  return (
    // <div className="bg-white flex items-cneter justify-between px-6 py-2 drop-shadow sticky top-0 z-10">
    <div className="max-padd-container flexBetween py-2">
      <img src={LOGO} alt="papi admin" className="h-14 m-2" />

      <ProfileInfo username={username} onLogout={onLogout} />
    </div>
  )
}

export default Header
