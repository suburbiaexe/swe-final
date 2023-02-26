import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// @ts-ignore
const PrivateRoute: JSX.Element = ({children}: JSX.Element) => {
    console.log(children);
    const navigate = useNavigate();

    useEffect(() => {
        // if a user isn't logged in -> redirect to the login page
        if (localStorage.getItem('loggedIn') === null) {
            return navigate("/login");
        }
    }, [navigate]);

    return <>{children}</>;
};

export default PrivateRoute;