import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import HomePage from './HomePage'

function page() {
  return (
    <div   className="flex"> <Sidebar /> <div className="flex-1">  <Header/> 
    <HomePage/>
      DSHTrainer</div>
   
    </div>
  )
}

export default page
