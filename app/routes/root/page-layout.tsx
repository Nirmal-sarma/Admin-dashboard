import React from 'react'
import {useNavigate } from 'react-router';
import { logoutUser } from '~/appwrite/auth';

const PageLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate('/signIn');
  }


 return (
    <div>
        <button
            className='cursor-pointer'
            onClick={handleLogout}
          >
            <img src="/assets/icons/logout.svg"
              alt="logout"
              className='size-6'

            />
          </button>
          <button  className='cursor-pointer' onClick={()=>{ navigate('/dashboard') }}>
            Dashboard
            </button>
    </div>
  )
}

export default PageLayout;