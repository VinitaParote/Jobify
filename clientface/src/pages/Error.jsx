import React from 'react'
import { Link, useRouteError } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage';
import img from '../assets/images/not-found.svg';

const Error = () => {
  const error = useRouteError();
  if(error.status === 404){
    return <Wrapper>
      <div>
        <img src={img} alt="not found" />
        <h3>Ohh! Page not found</h3>
        <p>The page you are looking for does not exist.</p>
        <Link to="/dashboardlayout">Back Home</Link>
      </div>
    </Wrapper>
  }
  return (
    <div>
    <h1>Error page</h1>
    <Link to='/'>back home</Link>
    </div>
  )
}

export default Error;