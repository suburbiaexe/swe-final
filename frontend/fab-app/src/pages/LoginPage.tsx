import React, { useEffect } from 'react';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Login() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (user) {
            // set the loggedIn cookie to my personal log-in value when a user exists
            localStorage.setItem('loggedIn', user.uid);
            navigate("/dashboard");
        }
    }, [user, loading]);

    return (
      <div className={"login"}>
          <Button variant="contained" color="primary" sx={[{ mt: 5 }, { mb: 5 }]} onClick={signInWithGoogle}>
              Sign in Here
          </Button>
      </div>
    );
}

export default Login;