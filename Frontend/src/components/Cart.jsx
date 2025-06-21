import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeItem, clearCart } from "../StoreSlice/CartSlice";
import toast, { Toaster } from "react-hot-toast";
const Cart = ({ data }) => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(null);
  const handleEnquire = async ()=>{
    const res  = await fetch('http://localhost:3000/enquire');
    const  data = await res.json();
    console.log(data)
    toast("Email is send")

  }
  const removeTheItem = (item) => {
    dispatch(removeItem(item));
    toast("Item removed");
  };
  const clear = () => {
    dispatch(clearCart());
  };

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };
  if (data.length == 0) {
    return (
      <h1 className="flex justify-center items-center text-2xl text-white">
        No items in the Cart
      </h1>
    );
  }
  return (
    <>
      <div>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          onClick={clear}
        >
          Clear Cart
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {data.map((item, index) => (
          <article
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && openModal(item)}
          >
            <img
              src={
                typeof item.image === "string"
                  ? item.image
                  : item.image?.[0]?.path
                  ? `http://localhost:3000/${item.image[0].path.replace(
                      /\\/g,
                      "/"
                    )}`
                  : "fallback.jpg"
              }
              alt={item.name}
              onClick={() => openModal(item)}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {item.title}
              </h2>
            </div>
            <div>
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                onClick={() => removeTheItem(item)}
              >
                Remove From the Cart
              </button>
            </div>
          </article>
        ))}
        <Toaster position="top-center" />
      </div>

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={closeModal}
              aria-label="Close modal"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {selectedItem.name}
            </h2>
            <div className="mb-4">
              <img
                src={
                typeof selectedItem.image === "string"
                  ? selectedItem.image
                  : selectedItem.image?.[0]?.path
                  ? `http://localhost:3000/${selectedItem.image[0].path.replace(
                      /\\/g,
                      "/"
                    )}`
                  : "fallback.jpg" 
              }
                alt={selectedItem.name}
                className="w-full h-64 object-cover rounded-md"
              />
            </div>
            
            <div className="flex overflow-x-auto gap-2 mb-4">
              {selectedItem.additionalImages?.map((img, index) => (
                <img
                  key={index}
                  src={
                typeof selectedItem.image === "string"
                  ? selectedItem.image
                  : selectedItem.image?.[0]?.path
                  ? `http://localhost:3000/${selectedItem.additionalImages[0].path.replace(
                      /\\/g,
                      "/"
                    )}`
                  : "fallback.jpg" 
              }
                  alt={`${selectedItem.name} additional ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-md"
                />
              ))}
            </div>
            <p className="text-gray-600 mb-2">
              <strong>Type:</strong> {selectedItem.type}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Description:</strong> {selectedItem.description}
            </p>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
              onClick={handleEnquire}
            >
              Enquire
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
