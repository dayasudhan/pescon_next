import { useContext } from 'react';
import { AuthContext } from './authContext';
import GoogleSignInButton from './GoogleSignInButton';
import { Button } from 'semantic-ui-react'
import Image from 'next/image';
import { useRouter } from 'next/router';
import 'semantic-ui-css/semantic.css';
const Index = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("i am inside")
    router.push('/list');

  };
  return (
    <div className="login-container">
    
      <Image
        src="/images/logo1.png"
        alt="Your Image"
        width={100}
        height={100}
      />
      {user ? (
        <div>
          <h1>Welcome, {user.displayName}!</h1>
          <div className="center-button">
          <Button primary type="submit"  onClick={handleLogin}>Home</Button>
        </div>
          
         
        </div>
      ) : (
        <div>
            <p>Please sign in using Google:</p>
            <GoogleSignInButton />
        </div>
      )}
      {/* Your login styles */}
      <style jsx>{`
        .login-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 50vh;
        }

        .center-button {
          display: flex;
          justify-content: center;
          margin-top: 16px;
        }
      `}</style>
    </div>
  );
}
  export default Index