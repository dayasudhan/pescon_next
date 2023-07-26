import React from 'react';
import firebase from './firebaseConfig';
import 'semantic-ui-css/semantic.css';
import { Button } from 'semantic-ui-react'
const GoogleSignInButton = () => {
  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      console.log("GoogleSignInButton")
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <Button primary onClick={handleSignIn}>
      Sign in with Google
    </Button>
  );
};

export default GoogleSignInButton;