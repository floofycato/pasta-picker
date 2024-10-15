import React, { useState } from "react"
import { FiUploadCloud } from "react-icons/fi"
import { FaPlus } from "react-icons/fa6"
import axiosInstance from "../utils/axiosInstance"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { BASE_URL } from "../utils/constants"

const Add = () => {
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name: "",
    type: "Pasta",
    price: "",
    quantity: "",
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((data) => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("type", data.type)
    formData.append("price", Number(data.price))
    formData.append("quantity", Number(data.quantity))
    formData.append("image", image)

    // Temporary Render
    console.log(data)
    toast.success("Menu item added")
    setImage(false)
    setData({
      name: "",
      type: "",
      price: "",
      quantity: "",
    })

    // API call - Waiting
    // const response = await axiosInstance.post(
    //   `${BASE_URL}/items/create`,
    //   formData
    // )
    // if (response.data.success) {
    //   setData({
    //     name: "",
    //     type: "",
    //     price: "",
    //     quantity: "",
    //   })
    //   setImage(false)
    //   toast.success(response.data.message)
    // } else {
    //   toast.error(response.data.message)
    // }
  }

  return (
    <div className="p-4 sm:p-10 w-full bg-white rounded-xl">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-y-5 max-w-[555px]"
        action=""
      >
        <h4 className="bold-22 pb-2 uppercase">Items Upload</h4>
        <div className="flex flex-col gap-y-2 max-w-28 h-20 medium-15">
          <p>Upload image</p>
          <label htmlFor="image">
            <div className="flexCenter ring-1 ring-slate-900/10 p-1 h-16">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="p-1 h-16"
                />
              ) : (
                <FiUploadCloud className="text-4xl text-tertiary" />
              )}
            </div>
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <p>Type</p>
          <select
            onChange={onChangeHandler}
            value={data.type}
            name="type"
            className="flex items-center ring-1 ring-slate-900/10 bg-red-500/5 px-5 py-3 cursor-pointer rounded mb-3 mt-3 w-1/2 md:w-1/4"
          >
            <option value="Pasta">Pasta</option>
            <option value="Sauce">Sauce</option>
            <option value="Topping">Topping</option>
          </select>
        </div>

        <div className="flex items-center bg-red-500/5 px-5 rounded mb-3 mt-3">
          <input
            onChange={onChangeHandler}
            value={data.name}
            name="name"
            placeholder="Name"
            type="text"
            required
            className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
          ></input>
        </div>

        <div className="flex items-center gap-x-6 ">
          <div className="flex flex-1 items-center bg-red-500/5 px-5 rounded mb-3 mt-3">
            <input
              onChange={onChangeHandler}
              value={data.price}
              name="price"
              type="number"
              placeholder="PHP Price"
              required
              className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
            />
          </div>
          <div className="flex flex-1 items-center bg-red-500/5 px-5 rounded mb-3 mt-3">
            <input
              onChange={onChangeHandler}
              value={data.quantity}
              name="quantity"
              type="number"
              placeholder="Quantity"
              required
              className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn-dark sm:w-5/12 flexCenter gap-x-2 !py-2 rounded"
        >
          <FaPlus />
          Add Item
        </button>
      </form>
    </div>
  )
}

export default Add
