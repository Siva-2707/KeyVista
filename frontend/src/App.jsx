import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { Router, RouterProvider,createBrowserRouter } from 'react-router';

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/signup",
      element: <SignUp/>
    },
    {
      path: "/",
      element: <Home/>
    }
  ]);
  return (
      <RouterProvider router={router}/>
  )
}

export default App
