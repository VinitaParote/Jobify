//import React from 'react';
import { Link, Form, redirect, useNavigation , useActionData} from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../component';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

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
  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
  <Wrapper>
    <Form method='post' className='form'>
      <Logo />
      <h4>Login Here!</h4>
      {errors && <p style={{ color: 'red' }}>{errors.msg}</p>}
      <p></p>
     <FormRow type="email" name="email"  />
     <FormRow type="password" name="password"  />
     <div>
     <button type='submit' className='btn btn-block' disabled={isSubmitting}>
      {isSubmitting ? 'loging':'login'}
      </button>
      </div>
     <button type='button' className='btn btn-block'>explore the app</button>
     <p>Not a Member yet? 
      <Link to='/register' className='member-btn'>Register </Link>
     </p>
     
    </Form>
  </Wrapper>
  );
};

export default Login;