import React from 'react'
import { Outlet } from 'react-router-dom'
import './UserPanel.css'
import Navbar from '../../components/navBar/NavBar'
import Footer from '../../components/footer/Footer'
import SideBar from './sideBar/SideBar'
export default function UserPanel() {
  return (
    <>
  
      <Navbar />
    <section class="content">
          <div class="content-header">
              <div class="container">
                  <span class="content-header__title">حساب کاربری من</span>
                  <span class="content-header__subtitle">پیشخوان</span>
              </div>
          </div>
          <div class="content-main">
              <div class="container">
                  <div class="row">
                      <SideBar />
  
                      <Outlet />
  
                  </div>
              </div>
          </div>
      </section>
  
          <Footer />
    
    </>

  )
}
