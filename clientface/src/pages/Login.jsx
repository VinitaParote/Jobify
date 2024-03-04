//import React from 'react';
import { Link, Form, redirect , useActionData, useNavigate} from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo, SubmitBtn } from '../component';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
//import SubmitBtn from '../component/SubmitBtn';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: '' };
  if (data.password.length < 3) {
    errors.msg = 'password too short';
    return errors;
  }
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successful');
    return redirect('/dashboardlayout');
  } catch (error) {
    // toast.error(error?.response?.data?.msg);
    errors.msg = error.response.data.msg;
    return errors;
  }
};

const Login = () => {
  const navigate = useNavigate();
  const loginDemoUser = async()=>{
    const data = {
      email:'test@test.com',
      password:'secret123'
    }
    try {
      await customFetch.post('/auth/login', data);
      toast.success('Take a Glimpse about our app');
      navigate('/dashboardlayout')
    } catch (error) {
      errors.msg = error.response.data.msg;
    }
  }
  return (
  <Wrapper>
    <Form method='post' className='form'>
      <Logo />
      <h4>Login Here!</h4>
     
     <FormRow type="email" name="email"  />
     <FormRow type="password" name="password"  />
     <SubmitBtn formBtn />
     <button type='button' className='btn btn-block' onClick={loginDemoUser}>explore the app</button>
     <p>Not a Member yet? 
      <Link to='/register' className='member-btn'>Register </Link>
     </p>
     
    </Form>
  </Wrapper>
  );
};

export default Login;