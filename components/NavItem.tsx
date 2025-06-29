import React, { useEffect, useState } from 'react'
import { Link, NavLink, Route, useLoaderData, useNavigate, type LoaderFunctionArgs } from 'react-router'
import { getExistingUser, logoutUser } from '~/appwrite/auth'
import { account } from '~/appwrite/client'
import { sidebarItems } from '~/constants'
import { cn } from '~/lib/utils'

// const loader=async(args: LoaderFunctionArgs)=>{
//   const user=await account.get();
//   if(!user.$id){
//     return {'info':`User don't exist`}
//   }
//   return user;
// }

const NavItem:React.FC = ({ handleClick}: { handleClick?: () => void}) => {
  const user = useLoaderData();
  const navigate = useNavigate();
  console.log({'navitem':user});
  const handleLogout = async () => {
    await logoutUser();
    navigate('/signIn');
  }
  // const [user, setUser] = useState<any>(null);

  // useEffect(() => {
  //   account.get()
  //     .then(setUser)
  //     .catch(() => setUser(null));
  // }, []);
  return (
    <section className='nav-items'>
      <Link to='/' className='Link-logo'>
        <img src="/assets/icons/logo.svg" alt='logo' className='size-[30px]' />
        <h1>Tourvisto</h1>
      </Link>

      <div className='container'>
        <nav>
          {sidebarItems.map(({ id, icon, label, href }) => (
            <NavLink to={href} key={id}>
              {({ isActive }: { isActive: boolean }) => (
                <div className={cn('group nav-item', {
                  'bg-primary-100 !text-white': isActive
                })} onClick={handleClick}>
                  {label}
                  <img
                    src={icon}
                    alt={label}
                    className={`group-hover:brightness-0 size-0 group-hover:invert ${isActive ? 'brightness-0 invert' : 'text-dark-200'}`}
                  />
                </div>
              )}

            </NavLink>
          ))
          }

        </nav>

        <footer className='nav-footer'>
          <img src={user?.imageUrl || '/assets/images/david.webp'} alt={user?.name || 'David'} referrerPolicy='no-referrer' />


          <article>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>

          </article>
          <button
            className='cursor-pointer'
            onClick={handleLogout}
          >
            <img src="/assets/icons/logout.svg"
              alt="logout"
              className='size-6'

            />
          </button>
        </footer>
      </div>
    </section>
  )
}

export default NavItem