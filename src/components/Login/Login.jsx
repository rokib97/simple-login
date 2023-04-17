import {
  FacebookAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useState } from "react";
import app from "../../firebase/firebase.init";
const Login = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const facebookProvider = new FacebookAuthProvider();

  const handleFacebookSignIn = () => {
    console.log(auth, facebookProvider);
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setUser(loggedInUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleFacebooklogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("inside logout");
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(user);
  return (
    <div>
      {user?.displayName ? (
        <>
          <button onClick={handleFacebooklogOut}>Facebook LogOut</button>
        </>
      ) : (
        <>
          <button onClick={handleFacebookSignIn}>Facebook Login</button>
        </>
      )}
      {user && <h1>{user?.displayName}</h1>}
    </div>
  );
};

export default Login;
