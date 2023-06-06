import axios from "axios";
import {useState, useEffect} from "react";

const useAuth = () => {
    const [authorized, setAuthorized] = useState(false);
    const [verificationComplete, setVerificationComplete] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get("http://localhost:8000/api/verifytoken", {
                    headers: {Authorization: `Bearer ${token}`},
                })
                .then((response) => {
                    if (response.status === 200) {
                        setAuthorized(true);
                    } else {
                        localStorage.removeItem("token");
                        setAuthorized(false);
                    }
                    setVerificationComplete(true);
                })
                .catch(() => {
                    localStorage.removeItem("token");
                    setAuthorized(false);
                    setVerificationComplete(true);
                    window.location.href = "/";
                });
        } else {
            setAuthorized(false);
            localStorage.removeItem("token");
            setVerificationComplete(true);
            window.location.href = "/";
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("role")
        setAuthorized(false);
        window.location.href = "/";
    };

    return {authorized, verificationComplete, logout};
};

export default useAuth;