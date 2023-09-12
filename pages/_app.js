import { AuthProvider } from './authContext';
// import '../styles/globals.css'; // Example: importing global CSS
import firebase from './firebaseConfig';
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;