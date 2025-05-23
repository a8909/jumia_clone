import React from 'react';
import './App.scss';
import Login from './components/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthGuard from './services/authGuard';
import DashBoard from './components/dashBoard';
import SingleProduct from './components/singleProduct';
import Cart from './components/cart';

function App() {
  return (
    <React.Fragment>

      <Router>
        <Routes>
          <Route element={<AuthGuard />}>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path='/dashboard/slug/:slug' element={<SingleProduct />} />
            <Route path='/cart' element={<Cart />} />
          </Route>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
