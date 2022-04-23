import React, {useState, useEffect, useReducer, useContext, useRef} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from "../../store/auth-contex";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                value: action.value,
                isValid: action.value.includes("@")
            }
        case 'INPUT_BLUR':
            return {
                ...state,
                isValid: state.value.includes("@")
            }
        default:
            return state;
    }
}

const passwordReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                value: action.value,
                isValid: action.value.trim().length > 0
            }
        case 'INPUT_BLUR':
            return {
                ...state,
                isvalid: state.value.trim().length > 0
            }
        default:
            return state;
    }
}

const Login = () => {
    const ctx = useContext(AuthContext)
    const [formIsValid, setFormIsValid] = useState(false);
    const emailInputRef = useRef()
    const passwordInputRef = useRef()

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: null
    })

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: '',
        isValid: null
    })

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFormIsValid(
                emailState.isValid && passwordState.isValid
            )
        }, 1000)
        return (() => {
            clearTimeout(timeout)
        })
    }, [emailState.isValid, passwordState.isValid])

    const emailChangeHandler = (event) => {
        dispatchEmail({
            type: 'CHANGE',
            value: event.target.value
        })
    };

    const passwordChangeHandler = (event) => {
        dispatchPassword({
            type: 'CHANGE',
            value: event.target.value
        })
    };

    const validateEmailHandler = () => {
        dispatchEmail({type: 'INPUT_BLUR'})
    };

    const validatePasswordHandler = () => {
        dispatchPassword({type: 'INPUT_BLUR'})
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            ctx.onLogin(emailState.value, passwordState.value);
        } else if (!emailState.isValid) {
            emailInputRef.current.focus()
        } else {
            passwordInputRef.current.focus()
        }
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input type={"email"}
                       id={"email"}
                       value={emailState.value}
                       onChange={emailChangeHandler}
                       onBlur={validateEmailHandler}
                       label={"email"}
                       ref={emailInputRef}
                />

                <Input type={"password"}
                       id={"password"}
                       value={passwordState.value}
                       onChange={passwordChangeHandler}
                       onBlur={validatePasswordHandler}
                       label={"password"}
                       ref={passwordInputRef}
                />

                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
