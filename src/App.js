import {getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut} from 'firebase/auth';
import { useState } from 'react';
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();


function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();
  const handleGoogleSignIn = () => {

    
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const {displayName,email, photoUrl} = result.user;
      const loggedInUser= {
        name : displayName,
        email : email,
        photo : photoUrl
      };
      setUser(loggedInUser);
    })
    .catch(error => {
      console.log(error.message);
    })
  }
  const handleGithubSignIn = () => {
    signInWithPopup(auth,gitHubProvider)
    .then(result => {
      const {displayName, photoUrl, email} = result.user;
      const loggedInUser = {
        name :displayName,
        email :email,
        photoUrl :photoUrl
      }
      setUser(loggedInUser);
    })


  }
  const handleSignOut = () => {
    signOut(auth)
    .then( ( ) => {
      setUser({})
    })

  }
  return (
    <div className="App">

      { !user.name?
        <div>
        <button onClick={handleGoogleSignIn}>Google Sign in</button>
        <button onClick={handleGithubSignIn}>Github Sign In</button>
      </div> :
      <button onClick={handleSignOut}> Sign Out</button>}
      <br />
      {
        user.name && <div>
          <img src={user.photo} alt="" />
          <h2>Welcome {user.name}</h2>
          <p>I know your Email address: {user.email}</p>
          
        </div>
      }
      
    </div>
  );
}

export default App;
