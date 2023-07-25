import { useContext } from 'react';
import { AuthContext } from './authContext';
import GoogleSignInButton from './GoogleSignInButton';
//import { Image } from 'semantic-ui-react'
import Image from 'next/image';
import Home from './home.tsx';
const Index = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Pescon</h1>
      <Image
        src="/images/logo1.png"
        alt="Your Image"
        width={100}
        height={100}
      />
      {user ? (
        <div>
          <h1>Welcome, {user.displayName}!</h1>
         
         
      {/* <Segment> */}
        
        <Home />
        {/* <Footer /> */}
      {/* </Segment> */}


        </div>
      ) : (
        <div>

      <p>Please sign in using Google:</p>
      <GoogleSignInButton />
    </div>
      )}
    </div>
  );
}
  export default Index