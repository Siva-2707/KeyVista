import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Header from './components/Header';
import ListingPage from './pages/ListingPage';
import ListingDetail from './pages/ListingDetail';
import { Router, RouterProvider,createBrowserRouter } from 'react-router';
import {useState, useEffect} from 'react';

function App() {


  const router = createBrowserRouter([
    {
      path: "/login",
      element: <div>
        <Header/>
        <Login/>
      </div>
    },
    {
      path: "/signup",
      element: <div>
        <Header/>
        <SignUp/>
      </div>
    },
    {
      path: "/",
      element: <div>
        <Header/>
        <Home/>
      </div>
    },{
      path: "/listings",
      element: <div>
        <Header/>
        <ListingPage/>
      </div>
    },
    {
      path: "/listings/:id",
      element: <div>
        <Header/>
        <ListingDetail/>
      </div>
    }
  ]);
  return (
      <RouterProvider router={router}/>
  )
}

export default App
