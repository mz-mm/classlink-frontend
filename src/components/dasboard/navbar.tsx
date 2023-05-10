import logoutIcon from "../../assets/logout.svg";
import useAuth from "../../services/useAuth";
import {useEffect, useState} from "react";
import apiClient from "../../services/api-client";
import {Img} from "@chakra-ui/react";


const Navbar = () => {
    const {logout} = useAuth();
    const [name, setName] = useState("");

    function logoutButton() {
        logout();
        window.location.reload();
    }

    useEffect(() => {
        const storedName = localStorage.getItem("name");

        if (storedName) {
            setName(storedName);
        } else {
            apiClient
                .get("/user")
                .then((response) => {
                    const name = response.data.full_name;
                    setName(name);
                    localStorage.setItem("name", name);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [logout]);


    return (
        <div className="m-5 flex text-white">
            <p className="font-bold text-2xl">Привет {name} 👋</p>
            <button onClick={logoutButton}
                    className="p-2 rounded bg-secondary-bg shadow-md shadow-black ml-auto">
                <Img src={logoutIcon} alt="logout"/>
            </button>
        </div>

    )
}

export default Navbar;