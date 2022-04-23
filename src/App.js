import React, {useState, useEffect} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContextProvider from "./store/AuthContextProvider";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("loggedIn"))) {
            setIsLoggedIn(true)
        }
    }, [])

    const loginHandler = () => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        localStorage.setItem("loggedIn", "true")
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem("loggedIn")
        setIsLoggedIn(false);
    };

    return (
        <AuthContextProvider isLoggedIn={isLoggedIn}>
            <MainHeader onLogout={logoutHandler}/>
            <main>
                {!isLoggedIn && <Login onLogin={loginHandler}/>}
                {isLoggedIn && <Home onLogout={logoutHandler}/>}
            </main>
        </AuthContextProvider>
    );
}

export default App;
