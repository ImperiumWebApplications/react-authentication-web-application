import React, {useEffect, useContext} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from "./store/auth-contex";

function App() {
    const ctx = useContext(AuthContext)

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("loggedIn"))) {
            ctx.onLogin()
        }
    }, [ctx])

    return (
        <React.Fragment>
            <MainHeader/>
            <main>
                {!ctx.isLoggedIn && <Login/>}
                {ctx.isLoggedIn && <Home/>}
            </main>
        </React.Fragment>
    );
}

export default App;
