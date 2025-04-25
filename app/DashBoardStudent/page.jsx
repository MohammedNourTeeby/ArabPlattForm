import React from 'react'
import Header from './Header'
import WelcomMassage from './WelcomMassage'
import Courses from './Courses'
import Footer from '@/components/Footer';

function page() {
  return (
    <div>
      <Header/>
      <WelcomMassage/>
      <Courses/>
      <Footer />

    </div>
  )
}

export default page
