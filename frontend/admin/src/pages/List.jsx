import React, { useEffect, useState } from "react"
import axiosInstance from "../utils/axiosInstance"
import { BASE_URL } from "../utils/constants"
import { TbTrash } from "react-icons/tb"
import spag from "../assets/temp_images/spaghetti.png"
import elbowMac from "../assets/temp_images/elbow-mac.jpg"
import farfalle from "../assets/temp_images/farfalle.jpg"
import { toast } from "react-toastify"

const List = () => {
  const [list, setList] = useState([])

  // Temporary render
  const tempList = () => {
    setList([
      {
        _id: "67014a7e7a115464aed32e1b",
        name: "Spaghetti noodles",
        type: "Pasta",
        price: 500,
        quantity: 99999,
        image: spag,
        _status: "active",
      },
      {
        _id: "67014b1d7a115464aed32e25",
        name: "Farfalle noodles",
        type: "Pasta",
        price: 500,
        quantity: 99999,
        image: farfalle,
        _status: "active",
      },
      {
        _id: "67014bdf7a115464aed32e27",
        name: "Elbow Macaroni noodles",
        type: "Pasta",
        price: 500,
        quantity: 99999,
        image: elbowMac,
        _status: "active",
      },
    ])
  }

  // Temporary delete btn
  const hideItem = (itemId) => {
    setList((prevList) => {
      const updatedList = prevList.filter((item) => item._id !== itemId)
      return updatedList // Return the updated list to update the state
    })
    toast.success("Menu item removed")
  }

  // API call - GET menu items - Waiting
  // const fetchlist = async () => {
  //   const response = await axiosInstance.get(`${BASE_URL}/api/dashboard/list`)
  //   console.log(response.data)

  //   if (response.data.success) {
  //     setList(response.data.data)
  //   } else {
  //     toast.error("Error")
  //   }
  // }

  // API Call - PATCH remove items - Waiting
  // const removeItem = async (itemId) => {
  //   const response = await axiosInstance.patch(`${BASE_URL}/item/remove`)
  //   {
  //     id: itemId
  //   }

  //   await fetchlist()
  //   if (response.data.success) {
  //     toast.success(response.data.message)
  //   } else {
  //     toast.error("Error")
  //   }
  // }

  useEffect(() => {
    // fetchList()
    tempList()
  }, [])

  return (
    <div className="p-4 sm:p-10 box-border w-full bg-white rounded-xl">
      <h4 className="bold-22 uppercase">Menu List</h4>
      <div className="overflow-auto mt-5">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-900/20 text-gray-30 regular-14 xs:regular-16 text-start py-12">
              <th className="p-1 text-left">Item</th>
              <th className="p-1 text-left">Name</th>
              <th className="p-1 text-left">Type</th>
              <th className="p-1 text-left">Price</th>
              <th className="p-1 text-left">Remove</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr
                key={item._id}
                className="border-b border-slate-900/20 text-gray-50 p-6 medium-14 text-left"
              >
                <td className="p-1">
                  {/* API call - Waiting */}
                  {/* <img src={`${url}/images/` + item.image} alt="" /> */}

                  {/* Temporary render */}
                  <img
                    src={item.image}
                    alt={item.name}
                    height={60}
                    width={60}
                    className="rounded-lg"
                  />
                </td>
                <td className="p-1">
                  <div className="line-clamp-3">{item.name}</div>
                </td>
                <td className="p-1">{item.type}</td>
                <td className="p-1">{item.price}</td>
                <td className="p-1">
                  <div className="bold-22 cursor-pointer hover:bold-28">
                    <TbTrash onClick={() => hideItem(item._id)} />
                    {/* <TbTrash onClick={() => removeItem(item._id)} /> */}
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

export default List
