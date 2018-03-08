import React, { Component } from 'react';
import firebase from './firebase';
import classes from './Layout.css';
import Calendar from './containers/Calendar/Calendar';
import SignIn from './components/UI/SignIn/SignIn';
import Logout from './components/UI/Logout/Logout';
import Aux from './hoc/Auxiliary/Auxiliary';
import Route from 'react-router-dom';

const INITIAL_STATE = {
    userSignedIn: false,
    userId: null,
    email: "",
    pass: ""
}

class Layout extends Component {
    state = {
        ...INITIAL_STATE
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
        // TODO: check for real email
        const email = this.state.email;
        const pass = this.state.pass;
        const auth = firebase.auth();
        // Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));

        console.log(promise);

        this.userAuthListener();
    }

    signupClickedHandler = () => {
        // TODO: check for real email
        const email = this.state.email;
        const pass = this.state.pass;
        const auth = firebase.auth();
        // Sign Up
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));

        this.userAuthListener();
    }

    logoutClickedHandler = () => {
        firebase.auth().signOut();
        this.userAuthListener();
        //this.setState({userSignedIn: false});
        console.log("signed out.");
    }

    userAuthListener = () => {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                const userId = firebase.auth().currentUser.uid;
                const rootRef = firebase.database().ref();
                const userRef = rootRef.child('users');
                console.log("USER ID:");
                console.log(userRef.child(userId));
                if (userRef.child(userId)) {
                    userRef.set({
                        [userId]: {
                            user: "overwritten",
                        }
                    });
                }
                console.log("userId: " + userId);
                this.setState({
                    userSignedIn: true,
                    userId: userId
                });
            } else {
                this.setState({...INITIAL_STATE})
            }
        });
    }

    googleSignInHandler = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(result => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = result.credential.accessToken;
            console.log("token: " + token);
            // The signed-in user info.
            const user = result.user;
            console.log("user: "+user);
        }).catch(error => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
        });

        this.userAuthListener();
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
                googleClicked={this.googleSignInHandler}
                loginClicked={this.loginClickedHandler}/>
        );

        let page = loginPage;

        if (this.state.userSignedIn) {
            page = (
                <Aux>
                    <Calendar userId={this.state.userId} />
                    <Logout logoutClicked={this.logoutClickedHandler} />
                </Aux>
            );
        }

        return (
            <div className={classes.Wrapper}>
                {page}
            </div>
        );
    }
}

export default Layout;