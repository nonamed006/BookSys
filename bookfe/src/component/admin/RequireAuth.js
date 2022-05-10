import React from 'react';
import { Navigate } from 'react-router';

const RequireAuth = ({children, isLogin}) => {

    if((!!localStorage.getItem('Authorization')) == false){
        return <Navigate to="/login" />
    }
    console.log(isLogin);
    return children;
};

export default RequireAuth;