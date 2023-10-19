import React, { memo, useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { UserContext } from '../Context/UserContext'


function Layout() {
  let {setUserToken,setUserId,setUserName}=useContext(UserContext)

  useEffect(() => {
    if (localStorage.getItem('token') !==null) {
      setUserToken(localStorage.getItem('token'))
    }
    if (localStorage.getItem('id') !==null) {
      setUserId(localStorage.getItem('id'))
    }
    if (localStorage.getItem('name') !==null) {
      setUserName(localStorage.getItem('name'))
    }
    
  
  }, []);
  return <>
    <Navbar/>
    <div className='container my-5' id='myPage'>
      <Outlet />
    </div>
   
    <Footer/>
  </>
}


export default memo(Layout)