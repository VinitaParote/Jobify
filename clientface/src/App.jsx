import React from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { DashboardLayout, HomeLayout, Register, Landing, Login, Error, AddJob, AllJobs, DeleteJob, EditJob, Profile, Stats, Admin, } from './pages';

import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { loader as dashboardLoarder } from './pages/DashboardLayout';
import { action as addJobAction} from './pages/AddJob';
import { loader as allJobsLoader} from './pages/AllJobs';
import { loader as editJobLoader } from './pages/EditJob';
import { action as editJobAction } from './pages/EditJob';
import { action as deleteJobAction } from './pages/DeleteJob';
import { loader as adminLoader } from './pages/Admin';
import { action as profileAction } from './pages/Profile';
import { loader as  StatsLoader } from './pages/Stats';

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
          element: <AddJob />,
          action: addJobAction
        },
        {
          path: 'AllJobs',
          element: <AllJobs />,
          loader: allJobsLoader,
        },
        {
          path: 'profile',
          element: <Profile />,
          action: profileAction,
        },
        {
          path: 'stats',
          element: <Stats />,
          loader: StatsLoader,
        },
        {
          path: 'admin',
          element: <Admin />,
          loader: adminLoader,
        },
        {
          path: 'edit-job/:id',
          element: <EditJob />,
          loader: editJobLoader,
          action: editJobAction,
        },
        {
          path:'delete-job/:id',
          action: deleteJobAction,
        }
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