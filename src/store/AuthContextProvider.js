import React, {useState} from "react";
import AuthContext from "./auth-contex";

const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const logoutHandler = () => {
        localStorage.removeItem("loggedIn")
        setIsLoggedIn(false)
    }

    const loginHandler = () => {
        localStorage.setItem("loggedIn", "true")
        setIsLoggedIn(true)
    }


    return (
        <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider