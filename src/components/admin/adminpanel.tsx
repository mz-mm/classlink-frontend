import axios from "axios";
import {useEffect, useState} from "react";
import useAuth from "../../services/useAuth";
import jwtDecode, {JwtPayload} from "jwt-decode";

interface DecodedToken extends JwtPayload {
    role: string;
}

const AdminPanel = () => {
    const {authorized, verificationComplete, logout} = useAuth();

    if (!verificationComplete) {
        return null; // Render a loading spinner or something similar
    }

    if (!authorized) {
        logout();
        return null; // Redirect to login page
    }

    const token: string | null = localStorage.getItem("token");
    const decodedToken: DecodedToken = jwtDecode(token!) as DecodedToken;
    const role: string = decodedToken.role;

    if (role !== "admin") {
        logout();
        return null;
    }

    return (
        <div>
            <h1>Admin Panel</h1>
        </div>
    );
};

export default AdminPanel;
