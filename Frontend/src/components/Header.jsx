import React from 'react'
import {Container , Button , Card } from "./index"
import { Link } from 'react-router-dom'

const Header = () => {
    const navItems = [
        {
            name : "Add Items",
            url : "/add-items"
        },
        {
            name : "View items",
            url : "/view-items"
        }
    ]
  return (
    
        <>
            <nav>
                <ul className='h-full w-full flex justify-center items-center space-x-4'>
                    {navItems.map((item , index)=>{
                        return <Link key={index} to={item.url}><li><Button>{item.name}</Button></li></Link>
                    })}
                </ul>
            </nav>
            
        </>
        

    
  )
}

export default Header