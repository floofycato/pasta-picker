import React, { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance"
import { BASE_URL } from "../../utils/constants"
import { toast } from "react-toastify"
import { TbTrash } from "react-icons/tb"
import { FaBox } from "react-icons/fa6"

const Orders = () => {
  const [orders, setOrders] = useState([])

  // Temporary render
  const tempOrders = () => {
    setOrders([
      {
        _id: "1",
        createAt: "Oct 18, 2024",
        items: [
          { name: "Spaghetti Noodles", quantity: 1 },
          { name: "Marinara Sauce", quantity: 2 },
        ],
        customer: {
          email: "jem@gmail.com",
          address: "Cavite",
          contact: 9999999999,
        },
        total: 1000,
        status: "Pending",
      },
      {
        _id: "2",
        createAt: "Oct 18, 2024",
        items: [
          { name: "Spaghetti Noodles", quantity: 1 },
          { name: "Marinara Sauce", quantity: 2 },
        ],
        customer: {
          email: "jem@gmail.com",
          address: "Cavite",
          contact: 9999999999,
        },
        total: 1000,
        status: "Declined",
      },
      {
        _id: "3",
        createAt: "Oct 18, 2024",
        items: [{ name: "Carbonara", quantity: 2 }],
        customer: {
          email: "jem@gmail.com",
          address: "Cavite",
          contact: 9999999999,
        },
        total: 1000,
        status: "For Pick Up",
      },
    ])
  }

  const handleOrderStatus = (orderId) => {
    console.log(orderId)
  }

  // API GET - waiting
  // const fetchAllOrders = async () => {
  //   response = await axiosInstance.get(`${BASE_URL}/order/list`)
  //   if (response.data.success) {
  //     setOrders(response.data.data)
  //     console.log(response.data.data)
  //   } else {
  //     toast.error("Error")
  //   }
  // }

  const statusHandler = async (event, orderId) => {
    const response = await axiosInstance.post(BASE_URL + "/order/status", {
      orderId,
      status: event.target.value,
    })
    if (response.data.success) {
      await fetchAllOrders()
    }
  }

  useEffect(() => {
    // fetchAllOrders()
    tempOrders()
  }, [])

  return (
    <div className="p-4 sm:p-10 box-border w-full bg-white rounded-xl">
      <h4 className="bold-22 uppercase">Orders</h4>
      <div className="overflow-auto mt-5">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-900/20 text-gray-30 regular-14 xs:regular-16 text-start py-12">
              <th className="p-1 text-left hidden sm:table-cell">Order</th>
              <th className="p-1 text-left hidden sm:table-cell">Date</th>
              <th className="p-1 text-left">Items</th>
              <th className="p-1 text-left">No.</th>
              <th className="p-1 text-left">Total</th>
              <th className="p-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr
                key={i}
                className="border-b border-slate-900/20 text-gray-50 p-6 medium-14 text-left"
              >
                <td className="p-1 hidden sm:table-cell">
                  <FaBox className="text-2xl text-secondary" />
                </td>
                <td className="p-1 hidden sm:table-cell">{order.createAt}</td>
                <td className="p-1">
                  <div className="py-2">
                    <p className="font-bold">
                      {order.items.map((item, index) => {
                        if (index === order.items.length - 1) {
                          return item.name + " x " + item.quantity
                        } else {
                          return item.name + " x " + item.quantity + ", "
                        }
                      })}
                    </p>
                  </div>
                  <hr className="w-1/2" />
                  <div>
                    <h5>{order.customer.email}</h5>
                    <div>
                      <p>{order.customer.address}</p>
                      <p className="mb-2">{order.customer.contact}</p>
                    </div>
                  </div>
                </td>
                <td className="p-1">{order.items.length}</td>
                <td className="p-1">&#8369;{order.total}</td>
                <td className="p-1">
                  <div className="bold-22 cursor-pointer">
                    <select
                      onChange={(event) => statusHandler(event, order._id)}
                      value={order.status}
                      className="bg-primary ring-1 ring-secondary text-sm max-w-20 xl:max-w-28"
                    >
                      <option value="Pending" className="medium-14">
                        Pending
                      </option>
                      <option value="In Kitchen" className="medium-14">
                        In Kitchen
                      </option>
                      <option value="For Pick Up" className="medium-14">
                        For Pick Up
                      </option>
                      <option value="Declined" className="medium-14">
                        Declined
                      </option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders
