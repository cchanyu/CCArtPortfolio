import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase/firebase.config';

import Home from './pages/Home';
import Create from './pages/Create';
import Login from './pages/Login';

import './App.css';

function App() {

    // check if user is logged in
    const [ isAuth, setIsAuth ] = useState(localStorage.getItem('isAuth'));

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);

            // useNavigate('/') only works inside of BrowserRouter
            // but since we're outside of it, we need to use window.location
            window.location.pathname = '/login';
        })
    }

    return (
        <div className='App'>
            <Router>
                <nav className='navbar navbar-expand-lg justify-content-center navbar-light bg-dark text-center py-4'>
                    <Link to='/' className='nav-link text-white mx-2'>Home</Link>
                    {!isAuth ? <Link to='/login' className='nav-link text-white mx-2'>Login</Link> : 
                    (<>
                        <Link to='/create' className='nav-link text-white mx-2'>Create</Link>
                        <button className='btn btn-primary' onClick={signUserOut}>Log out</button>
                    </>)}
                </nav>

                <div className='container mt-5'>
                    <Routes>
                        <Route path='/' element={<Home isAuth={isAuth} />} />
                        <Route path='/create' element={<Create isAuth={isAuth} />} />
                        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
                    </Routes>
                </div>
            </Router>
        </div>
    )
}

export default App;