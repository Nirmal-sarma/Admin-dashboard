import {Outlet, redirect} from "react-router";
import {SidebarComponent} from "@syncfusion/ej2-react-navigations";
import {MobileSidebar, NavItems} from "../../../components";
import {account} from "~/appwrite/client";
import {getExistingUser, storeUserData} from "~/appwrite/auth";

export async function clientLoader() {
<<<<<<< HEAD
    try {
        const user = await account.get();

        if(!user.$id) return redirect('/sign-in');

        const existingUser = await getExistingUser(user.$id);

        if(existingUser?.status === 'user') {
            return redirect('/');
        }

        return existingUser?.$id ? existingUser : await storeUserData();
    } catch (e) {
        console.log('Error in clientLoader', e)
        return redirect('/sign-in')
    }
=======
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
>>>>>>> 3cecaebbbd6c52fd618ebe6772ad651b4376ab3e
}

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <MobileSidebar />

            <aside className="w-full max-w-[270px] hidden lg:block">
                <SidebarComponent width={270} enableGestures={false}>
                    <NavItems />
                </SidebarComponent>
            </aside>

            <aside className="children">
                <Outlet />
            </aside>
        </div>
    )
}
export default AdminLayout
