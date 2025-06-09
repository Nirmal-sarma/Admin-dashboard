import React from 'react'
import { Link } from 'react-router'

const NavItem = () => {
  return (
    <section className='nav-items'>
      <Link to='/' className='Link-logo'>
      <img src="/assets/icons/logo.svg" alt='logo' className='size-[30px'/>
        <h1>Tourvisto</h1>
      </Link>

      NavItem
     </section>
  )
}

export default NavItem