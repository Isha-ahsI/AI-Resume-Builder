import React from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <>
      {/* <div className="min-h-screen bg-background text-foreground"> */}
        <Navbar />
        <Outlet />
        <Footer />
      {/* </div> */}
    </>
  )
}
