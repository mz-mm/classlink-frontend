import {useEffect, useState} from "react";
import useAuth from "../../services/useAuth";
import Schedule from "./dashboardComponents/schedule";
import Sidebar from "./sidebar";
import {Grid, GridItem, Img, Show} from "@chakra-ui/react";
import Navbar from "./navbar";


const Dashboard = () => {
    const {authorized, verificationComplete, logout} = useAuth();

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
                <GridItem area="aside">
                    <Sidebar/>
                </GridItem>
            </Show>

            <GridItem area="main">
                <div className="h-full flex flex-col">
                    <Navbar/>
                    <div className="lg:hidden">
                        <div
                            style={{
                                position: "fixed",
                                bottom: 0,
                                left: 0,
                                right: 0,
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
