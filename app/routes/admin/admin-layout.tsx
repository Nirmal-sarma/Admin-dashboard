import React from 'react'
import { Outlet, redirect } from 'react-router';
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { account } from '~/appwrite/client';
import { getExistingUser, storeUserData } from '~/appwrite/auth';
import NavItems from "components/NavItem"
import MobileSidebar from 'components/MobileSidebar';


export async function clientLoader() {
  try {
    console.log("running ...")
    const user = await account.get();
    console.log({'user': user.$id})
    if (!user.$id) throw redirect('/signIn');

    let existingUser = await getExistingUser(user.$id);
   console.log({'existingUser':existingUser});
    // if (existingUser?.status === "user") {
    //      throw redirect('/');
    // }
    if (!existingUser) {
      await storeUserData();
      existingUser = await getExistingUser(user.$id); // Fetch the newly created user
    }
    return existingUser;
  } catch (error) {
      console.log("Error in clientLoader.....",error)
      throw redirect('/signIn')
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