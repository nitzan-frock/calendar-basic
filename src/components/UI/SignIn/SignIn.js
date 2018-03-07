import React from 'react';
import classes from './SignIn.css';

const SignIn = (props) => {
    return (
        <div className={classes.LoginPage}>
            <div className={classes.Container}>
                <input  
                    onChange={e => props.emailChanged(e)}
                    value={props.email}
                    type="email" 
                    placeholder="Email" />
                <input 
                    onChange={e => props.passChanged(e)}
                    value={props.pass}
                    onKeyPress={props.enterPressed}
                    type="password" 
                    placeholder="Password" />

                <button 
                    className={classes.Login}
                    onClick={props.loginClicked}
                    id="login">
                    Log in
                </button>

                <button 
                    className={classes.Signup}
                    onClick={props.signupClicked}
                    id="signUp">
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default SignIn;