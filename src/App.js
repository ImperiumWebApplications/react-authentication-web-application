import React, {useEffect, useContext} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from "./store/auth-contex";

function App() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const ctx = useContext(AuthContext)

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("loggedIn"))) {
            ctx.onLogin()
        }
    }, [ctx])

    // const loginHandler = () => {
    //     // We should of course check email and password
    //     // But it's just a dummy/ demo anyways
    //     localStorage.setItem("loggedIn", "true")
    //     setIsLoggedIn(true);
    // };
    //
    // const logoutHandler = () => {
    //     localStorage.removeItem("loggedIn")
    //     setIsLoggedIn(false);
    // };

    return (
        <React.Fragment>
            <MainHeader/>
            <main>
                {!ctx.isLoggedIn && <Login />}
                {ctx.isLoggedIn && <Home />}
            </main>
        </React.Fragment>
    );
}

export default App;
