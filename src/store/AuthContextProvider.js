import React from "react";
import AuthContext from "./auth-contex";

const AuthContextProvider = (props) => {
    return (
        <AuthContext.Provider value={{isLoggedIn: props.isLoggedIn}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider