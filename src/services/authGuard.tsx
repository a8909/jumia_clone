import React from 'react'
import { getToken } from '../../src/services/localStorage';
import {Outlet, Navigate} from 'react-router-dom';

const AuthGuard = () => {
  return (
    getToken() ? <Outlet/> : <Navigate to="/login" />
  )
}

export default AuthGuard