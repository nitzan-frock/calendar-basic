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

                <button
                    className={classes.Google}
                    onClick={props.googleClicked}>
                    Sign in with Google
                </button>
                <div className={classes.Skip} onClick={props.skipLogin}>Skip login.</div>
            </div>
        </div>
    );
};

export default SignIn;