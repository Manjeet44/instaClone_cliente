import React, {useState, useEffect, useMemo} from "react";
import { ApolloProvider } from "@apollo/client";
import {ToastContainer} from 'react-toastify';
import { decodeToken } from "./utils/token";
import client from "./config/apollo";
import Auth from "./pages/Auth";
import AuthContext from "./context/AuthContext";
import Navigation from "./routes/Navigation";

export default function App() {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token) {
      setAuth(null)
    } else {
      setAuth(decodeToken(token))
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(null);
  }

  const setUser = (user) => {
    setAuth(user)
  }

  const authData = useMemo(
    () => ( {
      auth,
      logout,
      setUser
    }),
    [auth]
  );

  if(auth === undefined) return null; //Para evitar el flash Login
  
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
        {!auth ? <Auth /> : <Navigation/>}
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}
