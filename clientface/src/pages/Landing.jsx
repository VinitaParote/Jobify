import React from 'react'
import styled from 'styled-components';
import Wrapper from '../assets/wrappers/LandingPage';
 import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import {FormRow, Logo } from '../component';

const Landing = () => {
  return (
   <Wrapper><nav>
   <Logo />
    </nav>
    <div className='container page'>
      <div className="info">
        <h1>
          job <span>Hunting</span> app
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi eaque error quaerat nulla dolorum minima ex modi quisquam, quibusdam iure nam unde exercitationem, odio praesentium odit pariatur minus deleniti? Iusto.</p>
        <Link to='/register' className='btn register-link'>Register</Link>
        <Link to='/login' className='btn'>Login</Link>
      </div>
      <img src={main} alt='job hunt' className='img main-img'/>
    </div>
    </Wrapper>
  )
}

export default Landing;