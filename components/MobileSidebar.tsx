// @ts-nocheck
import { SidebarComponent } from '@syncfusion/ej2-react-navigations'
import React from 'react'
import { Link } from 'react-router'
import NavItem from './NavItem'

const MobileSidebar = () => {
    let sidebar: SidebarComponent
    const toggleSidebar = () => {
        sidebar.toggle();
    }
    return (
        <div className='mobile-sidebar wrapper'>
            <header>
                <Link to="/">
                    <img src="/assets/icons/logo.svg"
                        alt='Logo'
                        className='size-[30px]' />
                    <h1> Tourvisto</h1>
                </Link>
                <button onClick={toggleSidebar}>
                    <img src="/assets/icons/menu.svg" alt="menu" className='size-7' />


                </button>
                <SidebarComponent
                    width={270}
                    ref={(Sidebar) => sidebar = Sidebar}
                    created={() => sidebar.hide()}
                    closeOnDocumentClick={true}
                    showBackdrop={true}
                >
                    <NavItem handleClick={toggleSidebar} />
                </SidebarComponent>
            </header>
        </div>
    )
}

export default MobileSidebar