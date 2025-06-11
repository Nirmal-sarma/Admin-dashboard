import React from 'react'
import { Outlet, redirect } from 'react-router';
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { NavItems, MobileSidebar } from '../../../components';
import { account } from '~/appwrite/client';
import { getExistingUser, storeUserData } from '~/appwrite/auth';

export async function clientLoader() {
  try {
    const user = await account.get();
    if (!user.$id) return redirect('/signIn');

    const existingUser = await getExistingUser(user.$id);

    if (existingUser?.status === 'user') {
      return redirect('/');
    }
    return existingUser?.$id ? existingUser : await storeUserData();
  } catch (error) {
      console.log("Error in clientLoader")
      redirect('/signIn')
  }
}

const AdminLayout = () => {
  return (
    <div className='admin-layout'>
      <MobileSidebar />
      <aside className='w-full max-w-[270px] hidden lg:block'>
        Sidebar
        <SidebarComponent>
          <NavItems />
        </SidebarComponent>
      </aside>
      <aside className='children'>
        <Outlet />
      </aside>
    </div>
  )
}

export default AdminLayout;