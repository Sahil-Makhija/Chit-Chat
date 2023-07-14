import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AddFriends } from './pages';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/user/find',
        element: <AddFriends />
      }
    ]
  }
])

root.render(
  <Provider store={store} >
    <RouterProvider router={router} ></RouterProvider>
  </Provider>
);
