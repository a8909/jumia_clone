import React from 'react';
import './App.scss';
import Login from './components/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthGuard from './services/authGuard';
import DashBoard from './components/dashBoard';

function App() {
  return (
    <React.Fragment>
      <Router >
        <Routes>
          <Route element={<AuthGuard/>}>
            <Route path='/dashboard' element={<DashBoard/>}/>
          </Route>
          <Route path='/login' element={<Login/>} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
