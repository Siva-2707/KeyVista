import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Header from './components/Header';
import ListingPage from './pages/ListingPage';
import ListingDetail from './pages/ListingDetail';
import { Router, RouterProvider,createBrowserRouter } from 'react-router';
import {useState} from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    // Clear tokens or session here
    setIsLoggedIn(false);
  };

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <div>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Login/>
      </div>
    },
    {
      path: "/signup",
      element: <div>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <SignUp/>
      </div>
    },
    {
      path: "/",
      element: <div>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Home/>
      </div>
    },{
      path: "/listings",
      element: <div>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <ListingPage/>
      </div>
    },
    {
      path: "/listings/:id",
      element: <div>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <ListingDetail/>
      </div>
    }
  ]);
  return (
      <RouterProvider router={router}/>
  )
}

export default App
