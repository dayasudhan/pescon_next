import React from 'react';
import firebase from './firebaseConfig';

const GoogleSignInButton = () => {
  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <button onClick={handleSignIn}>
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;