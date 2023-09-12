import { createContext, useEffect, useState } from 'react';
import firebase from './firebaseConfig';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      
      console.log("user",user)
      setUser(user);
      if(user){
        user.getIdToken().then((tkn)=>{
          // set access token in session storage
          console.log("tkn",tkn)
          setToken(tkn)
          // sessionStorage.setItem("accessToken", tkn);
          // setAuthorizedUser(true);
        })
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user,token }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };