import React from 'react';
import Wrapper from '../assets/wrappers/BigSidebar';
import Logo from './logo';
import { useDashboardContext } from '../pages/DashboardLayout';
import NavLinks from './NavLinks';
const Bigsidebar = () => {

  const { showSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container ' : 'sidebar=container show-sidebar'}>

        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  )
}

export default Bigsidebar;