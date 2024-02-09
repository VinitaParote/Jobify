import React from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { DashboardLayout, HomeLayout, Register, Landing, Login, Error, AddJob, AllJobs, DeleteJob, EditJob, Profile, Stats, Admin, } from './pages';

import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { loader as dashboardLoarder } from './pages/DashboardLayout';


export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
}

 checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'dashboardlayout',
        element: <DashboardLayout />,
        loader: dashboardLoarder,
        children: [{
          index: true,
          element: <AddJob />
        },
        {
          path: 'alljobs',
          element: <AllJobs />
        },
        {
          path: 'profile',
          element: <Profile />
        },
        {
          path: 'stats',
          element: <Stats />
        },
        {
          path: 'admin',
          element: <Admin />
        },
        ]
      },
      //  {
      //   path: 'landing',
      //   element: <Landing/>,
      //  },
      //  {
      //   path: 'error',
      //   element: <Error/>,
      //  },
    ],
  },
]);


const App = () => {
  return <RouterProvider router={router} />;
}

export default App;