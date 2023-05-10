import {useEffect, useState} from "react";
import useAuth from "../../services/useAuth";
import Schedule from "./dashboardComponents/schedule";
import Homeworks from "./dashboardComponents/homeworks";
import Messages from "./dashboardComponents/messages";
import Summary from "./dashboardComponents/summary";
import Sidebar from "./sidebar";
import {Grid, GridItem, Img, Show} from "@chakra-ui/react";
import Navbar from "./navbar";
import calenderIcon from "../../assets/sidebaricons/calender.svg";
import tasksIcon from "../../assets/sidebaricons/tasks.svg";
import messagesIcon from "../../assets/sidebaricons/messages.svg";
import gradesIcon from "../../assets/sidebaricons/grades.svg";


const Dashboard = () => {
    const {authorized, verificationComplete, logout} = useAuth();
    const [activeItem, setActiveItem] = useState(1);

    const handleItemClick = (itemId: number) => {
        setActiveItem(itemId);
    };

    const sidebar = [
        {id: 1, icon: calenderIcon},
        {id: 2, icon: tasksIcon},
        {id: 3, icon: messagesIcon},
        {id: 4, icon: gradesIcon},
    ]

    const renderComponent = () => {
        switch (activeItem) {
            case 1:
                return <Schedule/>;
            case 2:
                return <Homeworks/>;
            case 3:
                return <Messages/>;
            case 4:
                return <Summary/>;
            default:
                return null;
        }
    };

    useEffect(() => {
        if (!verificationComplete) {
            return;
        }

        if (!authorized) {
            logout();
            return;
        }

    }, [authorized, verificationComplete, logout]);

    return (
        <>
            <Grid
                templateAreas={{
                    base: `"main"`,
                    lg: `"aside main"`,
                }}
                templateColumns={{
                    base: "1fr",
                    lg: "137px 1fr",
                }}>

                <Show above="lg">
                    <GridItem area="aside">
                        <Sidebar sidebar={sidebar} activeItem={activeItem} onItemClick={handleItemClick}/>
                    </GridItem>
                </Show>

                <GridItem area="main">
                    <div className="h-full flex flex-col">
                        <Navbar/>
                        <div className="lg:hidden ">
                            <div className="">
                                {renderComponent()}
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
                                }}>
                                {renderComponent()}
                            </div>
                        </div>
                    </div>
                </GridItem>
            </Grid>
        </>
    );
};
export default Dashboard;
