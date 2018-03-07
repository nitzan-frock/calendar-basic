import React, { Component } from 'react';
import firebase from './firebase';
import classes from './Layout.css';
import Calendar from './containers/Calendar/Calendar';
import SignIn from './components/UI/SignIn/SignIn';
import Logout from './components/UI/Logout/Logout';
import Aux from './hoc/Auxiliary/Auxiliary';
class Layout extends Component {
    state = {
        userSignedIn: false,
        email: "",
        pass: ""
    }

    emailChangedHandler = (e) => {
        this.setState({email: e.target.value});
    }

    passChangedHandler = (e) => {
        this.setState({pass: e.target.value});
    }

    enterPressedHandler = (event) => {
        if (event.key === "Enter") {
            this.loginClickedHandler();
        }
    }

    loginClickedHandler = () => {
        const email = this.state.email;
        const pass = this.state.pass;
        const auth = firebase.auth();
        // Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    }

    signupClickedHandler = () => {
        // TODO: check for real email
        const email = this.state.email;
        const pass = this.state.pass;
        const auth = firebase.auth();
        // Sign Up
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    }

    logoutClickedHandler = () => {
        firebase.auth().signOut();
    }

    render() {
        //auth.signInWithEmailAndPassword(email, pass);
        //auth.createUserWithEmailAndPassword(email, pass);
        //auth.onAuthStateChanged(firebaseUser => {});
        const loginPage = (
            <SignIn 
                emailChanged={this.emailChangedHandler}
                email={this.state.email}
                passChanged={this.passChangedHandler}
                pass={this.state.pass}
                enterPressed={this.enterPressedHandler}
                signupClicked={this.signupClickedHandler}
                loginClicked={this.loginClickedHandler}/>
        );

        let page = loginPage;

        // Add a realtime listener
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                console.log("show calendar");
                this.setState({userSignedIn: true})
                page = (
                    <Aux>
                        <Calendar />
                        <Logout logoutClicked={this.logoutClickedHandler} />
                    </Aux>
                );
            } else {
                console.log("not logged in");
                page = loginPage;
            }
        });

        return (
            <div className={classes.Wrapper}>
                {page}
            </div>
        );
    }
}

export default Layout;