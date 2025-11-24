import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../../components/admin/adminNavbar'
import AdminSidebar from '../../components/admin/adminSidebar'


const Layout = () => {
  return (
    <div>
       <AdminNavbar />
       <div className="flex">
        <AdminSidebar />
        <Outlet />
       </div>
    </div>
  )
}


export default Layout