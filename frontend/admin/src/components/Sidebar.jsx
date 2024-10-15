import React from "react"
import { NavLink } from "react-router-dom"
import {
  BsCardChecklist,
  BsCardList,
  BsPeople,
  BsPerson,
  BsPlusSquare,
} from "react-icons/bs"

const Sidebar = ({ username, role }) => {
  username = localStorage.getItem("username")
  role = localStorage.getItem("role")

  return (
    <div className="max-sm:flexCenter max-xs:pb-3 rounded-xl bg-white pb-3 mb-3 sm:w-1/5 sm:min-h-screen pl-6 lg:pl-12 sm:pr-3 sm:mr-3">
      <div className="flex sm:flex-col gap-5 pt-4 sm:pt-10">
        {/* Common to All Users */}
        <NavLink
          to={"/profile"}
          className={({ isActive }) =>
            isActive
              ? "active-link"
              : "flexStart gap-x-2 p-5 medium-15 cursor-pointer max-w-60 h-10 rounded-xl"
          }
        >
          <BsPerson />
          <div className="hidden lg:flex">Profile</div>
        </NavLink>

        {/* Only for Superadmin and Admin */}
        {(role === "admin" || role === "superadmin") && (
          <NavLink
            to={"/users"}
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : "flexStart gap-x-2 p-5 medium-15 cursor-pointer max-w-60 h-10 rounded-xl"
            }
          >
            <BsPeople />
            <div className="hidden lg:flex">Users</div>
          </NavLink>
        )}

        {/* Only for Admin */}
        {role === "admin" && (
          <>
            <NavLink
              to={"/add"}
              className={({ isActive }) =>
                isActive
                  ? "active-link"
                  : "flexStart gap-x-2 p-5 medium-15 cursor-pointer max-w-60 h-10 rounded-xl"
              }
            >
              <BsPlusSquare />
              <div className="hidden lg:flex">Add Items</div>
            </NavLink>

            <NavLink
              to={"/list"}
              className={({ isActive }) =>
                isActive
                  ? "active-link"
                  : "flexStart gap-x-2 p-5 medium-15 cursor-pointer max-w-60 h-10 rounded-xl"
              }
            >
              <BsCardList />
              <div className="hidden lg:flex">List Items</div>
            </NavLink>
          </>
        )}

        {/* Only for Admin and Crew */}
        {(role === "admin" || role === "crew") && (
          <NavLink
            to={"/orders"}
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : "flexStart gap-x-2 p-5 medium-15 cursor-pointer max-w-60 h-10 rounded-xl"
            }
          >
            <BsCardChecklist />
            <div className="hidden lg:flex">Orders</div>
          </NavLink>
        )}

        {/* Only for Rider */}
        {role === "rider" && (
          <NavLink
            to={"/rider-orders"}
            className={({ isActive }) =>
              isActive
                ? "active-link"
                : "flexStart gap-x-2 p-5 medium-15 cursor-pointer max-w-60 h-10 rounded-xl"
            }
          >
            <BsCardChecklist />
            <div className="hidden lg:flex">Rider Orders</div>
          </NavLink>
        )}
      </div>
    </div>
  )
}

export default Sidebar
