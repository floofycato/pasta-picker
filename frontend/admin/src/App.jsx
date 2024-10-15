import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Dashboard from "./pages/Dashboard" // Shared Dashboard for all roles
import Login from "./pages/Login" // Public Login page
import Profile from "./pages/Profile" // For all users
import Users from "./pages/Users" // For superadmin and admin
import Orders from "./pages/Orders/Orders" // For admin and crew
import Add from "./pages/Add" // For admin
import List from "./pages/List" // For admin
import RiderOrders from "./pages/Orders/RiderOrders" // For riders
import { useEffect, useState } from "react"

const App = () => {
  const [role, setRole] = useState(localStorage.getItem("role"))
  const [username, setUsername] = useState(localStorage.getItem("username"))

  useEffect(() => {
    setRole(localStorage.getItem("role"))
    setUsername(localStorage.getItem("username"))
  }, [])

  return (
    <Router>
      <Routes>
        {/* Public route for login */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        {role ? (
          <>
            {/* All users go to the same dashboard; sidebar will handle the role-based items */}
            <Route
              path="/"
              element={<Dashboard role={role} username={username} />}
            >
              {/* Child routes under dashboard, handled via Outlet */}
              <Route
                path="/profile"
                username={username}
                role={role}
                element={<Profile role={role} username={username} />}
              />
              <Route path="/orders" element={<Orders />} />

              {/* Manage Users: For superadmin */}
              {(role === "superadmin" || role === "admin") && (
                <Route
                  path="/users"
                  element={<Users role={role} username={username} />}
                />
              )}

              {/* Add Items and List Items: Only for admin */}
              {role === "admin" && (
                <>
                  <Route path="/add" element={<Add />} />
                  <Route path="/list" element={<List />} />
                </>
              )}

              {/* Rider Orders: Only for riders */}
              {role === "rider" && (
                <Route path="/rider-orders" element={<RiderOrders />} />
              )}
            </Route>
          </>
        ) : (
          // Redirect to login if not logged in
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  )
}

export default App
