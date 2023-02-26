import React, { useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../firebase";

function Dashboard() {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        // if a user signs out -> go to the home page
        if (!user) return navigate("/");
    }, [user, loading]);

    return (
        <div className="dashboard">
            <Typography variant="h4" mt={5}>Logged in as {user?.email}</Typography>
            <Button variant="contained" color="primary" sx={[{ mt: 5 }, { mb: 5}]} onClick={logout}>
                Log out
            </Button>
        </div>
    );
}

export default Dashboard;