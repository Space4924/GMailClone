import React, { useState, Suspense } from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
// import Emails from '../components/Emails'
import SuspenseLoader from '../components/common/SuspenseLoader'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

const Main = () => {
  const [openDrawers, setOpenDrawers] = useState(false);


  const toggleDrawer = () => {
    console.log("working");
    setOpenDrawers(prev => !prev);
  }
  return (
    <>
      <Header toggleDrawer={toggleDrawer} />
      <Box>
        <SideBar openDrawers={openDrawers} toggleDrawer={toggleDrawer} />
        {/* <Emails openDrawers={openDrawers}/> */}
        <Suspense fallback={<SuspenseLoader />}>
          <Outlet context={{openDrawers}} />
        </Suspense>
      </Box>
    </>
  )
}

export default Main
