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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [location, setLocation] = useState({ "city": null, "country": null });

  useEffect(() => {
      navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`)
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
      const data = await res.json();
      const city = data.address.city || data.address.town || data.address.village;
      const country = data.address.country;
      // console.log(`${city}, ${country}`);
      setLocation({"city": city, "country": country});
    }, (err) => {
      console.error('Error getting location', err);
    });
  },[])

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
        <ListingPage location={location}/>
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
