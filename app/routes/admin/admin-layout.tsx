import React from 'react'
import { Outlet } from 'react-router';
import {SidebarComponent} from "@syncfusion/ej2-react-navigations";
import NavItem from 'components/NavItem';
const AdminLayout = () => {
  return (
    <div className='admin-layout'>
        MoibleSidebar
        <aside className='w-full max-w-[270px] hidden lg:block'>
            Sidebar
           <SidebarComponent>
              <NavItem/>
           </SidebarComponent>
         </aside>
         <aside className='children'>
                <Outlet/>
        </aside>
    </div>
  )
}

export default AdminLayout;