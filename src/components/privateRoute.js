import React from 'react';
import { Navigate } from 'react-router';
import { Outlet } from 'react-router-dom';
import { UserAuth } from "../contexts/AuthContext"


const PrivateRoute = ({isLogged, setIsLogged}) => {
    const {user} = UserAuth();
    if(user){
        setIsLogged(true)
    }
    return isLogged?<Outlet/>: <Navigate to="/"/>
}

export default PrivateRoute;
