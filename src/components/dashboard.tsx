import {useEffect, useState} from "react";
import useAuth from "./useAuth";
import Schedule from "./dashboardComponents/schedule";
import logoutIcon from "../assets/logout.svg";
import calenderIcon from "../assets/sidebaricons/calender.svg";
import gradesIcon from "../assets/sidebaricons/grades.svg";
import messagesIcon from "../assets/sidebaricons/messages.svg";
import tasksIcon from "../assets/sidebaricons/tasks.svg";
import {Grid, GridItem, Img, Show} from "@chakra-ui/react";
import apiClient from "../services/api-client";

let sidebar = [
    {id: "1", icon: calenderIcon},
    {id: "2", icon: tasksIcon},
    {id: "3", icon: messagesIcon},
    {id: "4", icon: gradesIcon},
]

const Dashboard = () => {
    const {authorized, verificationComplete, logout} = useAuth();
    const [name, setName] = useState("");

    function logoutButton() {
        logout();
        window.location.reload();
    }

    useEffect(() => {
        if (!verificationComplete) {
            return;
        }

        if (!authorized) {
            logout();
            return;
        }

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
    }, [authorized, verificationComplete, logout]);

    return (
        <Grid
            className="touch-none"
            templateAreas={{
                base: `"main"`,
                lg: `"aside main"`,
            }}
            templateColumns={{
                base: "1fr",
                lg: "137px 1fr",
            }}
        >
            <Show above="lg">
                <GridItem area="aside" className="h-screen bg-sidebar">
                    <div className="text-white flex-row">
                        <ul>
                            <li>
                                <button><Img src={calenderIcon} alt="Calender Icon"/></button>
                            </li>
                            <li>
                                <button><Img src={tasksIcon} alt="Calender Icon"/></button>
                            </li>
                            <li>
                                <button><Img src={messagesIcon} alt="Calender Icon"/></button>

                            </li>
                            <li>
                                <button><Img src={gradesIcon} alt="Calender Icon"/></button>
                            </li>
                        </ul>
                    </div>
                </GridItem>
            </Show>

            <GridItem area="main">
                <div className="h-full flex flex-col">
                    <div className="m-5 flex text-white">
                        <p className="font-bold text-2xl">Привет {name} 👋</p>
                        <button onClick={logoutButton}
                                className="p-2 rounded bg-secondary-bg shadow-md shadow-black ml-auto">
                            <Img src={logoutIcon} alt="logout"/>
                        </button>
                    </div>
                    <div className="lg:hidden">
                        <div
                            style={{
                                position: "fixed",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: "0.5rem",
                            }}
                        >
                            <Schedule/>
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <div
                            style={{
                                position: "fixed",
                                bottom: 0,
                                left: "137px",
                                right: 0,
                                padding: "0.5rem",
                            }}
                        >
                            <Schedule/>
                        </div>
                    </div>
                </div>
            </GridItem>
        </Grid>


    );
};
export default Dashboard;
