import{ useEffect, useState } from 'react';
import { data } from './index';
import { useDispatch } from 'react-redux';
import { addItems } from '../StoreSlice/CartSlice';
import {cards , removeCard} from "../StoreSlice/CardSlice"
import toast , {Toaster} from 'react-hot-toast';
import { useSelector } from 'react-redux';
const Card = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  
    const dispatch = useDispatch();
    const dataItems = useSelector((state)=>state.card.allCards)
    const cartItems = useSelector((state) => state.cart.items);
    
  const openModal = (item) => {
    setSelectedItem(item);
  };
  useEffect(()=>{
    
    dispatch(cards(data))
    
  },[])
  
  

  const closeModal = () => {
    setSelectedItem(null);
  };
  const addToCart = (item)=>{
    dispatch(addItems(item))
    dispatch(removeCard(item))
    const notify = ()=> toast("Item added to the cart")
    notify()
    

  }
  const visibleItems = dataItems.filter(
    card => !cartItems.find(cartItem => cartItem.id === card.id)
  );
  if(visibleItems.length===0){
    return <h1 className='flex justify-center items-center text-2xl text-white'>No Items</h1>
  }
  return (
    <>
      <div className="min-h-full min-w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {visibleItems.map((item , index) => (
            
            
          <article
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openModal(item)}
          >
            <img
              src={item.image}
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
            onClick={()=>{addToCart(item)}}
            
              
            >
              Add to Cart
            </button>
            
            
            </div>
            
          </article>
        ))}
        <div>
            <Toaster
              position="top-right"
                
            />
        </div>
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
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-64 object-cover rounded-md"
              />
            </div>
            
            <div className="flex overflow-x-auto gap-2 mb-4">
              {selectedItem.additionalImages?.map((img, index) => (
                <img
                  key={index}
                  src={img}
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
              onClick={() => alert('Enquire button clicked!')}
            >
              Enquire
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;