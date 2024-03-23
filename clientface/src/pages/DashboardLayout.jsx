import React, { createContext, useContext, useState } from 'react'
import { Outlet, redirect, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { Bigsidebar, SmallSidebar, Navbar, Loading} from '../component';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

const DashboardContext = createContext();

export const loader = async()=>{
  try {
    const {data} = await customFetch.get('/users/current-user');
    return data;
  } catch (error) {
    return redirect('/');
  }
} 

const DashboardLayout= (isDarkThemeEnable) => {
  const {user}  = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation()
 const isPageLoading = navigation.state === 'loading'

const [showSidebar, setshowSidebar] = useState(false);
const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnable);

const toggleDarkTheme = ()=>{
  const newDarkTheme = !isDarkTheme;
  setIsDarkTheme(newDarkTheme);
  document.body.classList.toggle('dark-theme', newDarkTheme);
  localStorage.setItem('darkTheme', newDarkTheme);
};

const toggleSidebar =()=>{
  setshowSidebar(!showSidebar);
};

const logoutUser = async() => {
  navigate('/')
  await  customFetch.get('/auth/logout');
  toast.success('logging out...')
};

  return (
    <DashboardContext.Provider value={{
      user,
      showSidebar,
      isDarkTheme,
      toggleSidebar,
      toggleDarkTheme,
      logoutUser
    }}>
    <Wrapper>
      <main className='dashboard'>
        <SmallSidebar />
        <Bigsidebar />
        <div>
          <Navbar />
          <div className='dashboard-page'>
          {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
        </div>
      </main>
    </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;