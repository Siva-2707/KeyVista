import React, { useContext } from 'react'
import AppContext from '../context/AppContext';
import UserDashboard from './Dashboard/UserDashboard';
import AdminDashboard from './Dashboard/AdminDashboard';

const Dashboard = () => {

    const {isAdmin} = useContext(AppContext);
    console.log("Is Admin: ", isAdmin);
    return isAdmin ? <AdminDashboard/> : <UserDashboard/>
}

export default Dashboard