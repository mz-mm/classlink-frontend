import {useEffect, useState} from "react";
import useAuth from "./useAuth";
import Schedule from "./dashboardComponents/schedule";
import {Grid, GridItem, Show} from "@chakra-ui/react";

const Dashboard = () => {
    const {authorized, verificationComplete, logout} = useAuth();

    if (!verificationComplete) {
        return null;
    }

    if (!authorized) {
        logout();
        return null;
    }

    return (
        <Grid templateAreas={{
            base: `"main"`,
            lg: `"aside main"`
        }}>
            <Show above="lg">
                <GridItem area="aside" className="bg-sidebar">
                    <div className="text-white">
                        aside
                    </div>
                </GridItem>
            </Show>
            <GridItem area="main" className="bg-main-bg">
                <Schedule/>
            </GridItem>
        </Grid>
    );
};
export default Dashboard;
