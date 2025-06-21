import React, { useState } from 'react'
import {Button, Container , Input} from "./index"
import { useRef } from 'react';
import toast , {Toaster} from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addItems } from '../StoreSlice/CartSlice';
const Form = () => {
  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const typeRef = useRef(null);
  const descRef = useRef(null);
  const imageRef = useRef(null);
  const additionalImagesRef = useRef(null);
  
  const handleForm =async (e)=>{
    e.preventDefault();
    const formData= new FormData();
    formData.append('name' , nameRef.current.value )
    formData.append('type' , typeRef.current.value)
    formData.append('description' , descRef.current.value)
    formData.append('image' , imageRef.current.files[0])
    const additionalFiles = additionalImagesRef.current.files;
    for (let i = 0; i < additionalFiles.length; i++) {
      formData.append('additionalImages', additionalFiles[i]);
    }
    try {
      const res = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        dispatch(addItems(result))
        toast("Item Added")
        
      } else {
        toast.error('Upload failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Server error!');
    }
    
  }
  
  return (
    <Container>
        <form action="http://localhost:3000/upload" onSubmit={handleForm} method='post' encType="multipart/form-data">
            <div className='pt-12'>
                <Input ref={nameRef} label = "Item Name" placeholder = "Item Name" className = "min-w-2.5"/>
                <Input ref={typeRef} label = "Item type" placeholder = "Item Type" className = "min-w-2.5"/>
                <Input ref={descRef} label = "Item Description" placeholder = "Item Description" className = "min-w-2.5" />
                <Input ref={imageRef} label = "image" name = "image" placeholder = "Cover Image" type = "file" className = "min-w-2.5" />
                <Input ref={additionalImagesRef} multiple  label = "Additional Images" name = "additionalImages" placeholder = "Addtional Images" type = "file" className = "min-w-2.5"/>
                
                

            </div>
            <div className='flex justify-center items-center'>
              <Button onClick = {handleForm}>Add to Cart</Button>
              <Toaster/>
            </div>
            
        </form>
    </Container>
    
  )
}

export default Form