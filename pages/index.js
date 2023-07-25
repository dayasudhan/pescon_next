import { useContext } from 'react';
import { AuthContext } from './authContext';
import GoogleSignInButton from './GoogleSignInButton';
const Index = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.displayName}!</h1>
          <p>Email: {user.email}</p>
          <p>Profile Picture: <img src={user.photoURL} alt="Profile" /></p>
        </div>
      ) : (
        <div>
      <h1>Pescon</h1>
      <p>Please sign in using Google:</p>
      <GoogleSignInButton />
    </div>
      )}
    </div>
  );
}
  export default Index