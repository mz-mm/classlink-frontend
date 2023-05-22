import HomeIcon from "../../assets/sidebar_icons/home.svg"
import MessagesIcon from "../../assets/sidebar_icons/messages.svg"
import AttendanceIcon from "../../assets/sidebar_icons/attendance.svg"
import EditIcon from "../../assets/sidebar_icons/edit.svg"
import AnalyticsIcon from "../../assets/sidebar_icons/analytics.svg"

import Home from "./dashboard_components/home.tsx";
import Attendance from "./dashboard_components/attendance.tsx";
import Analytics from "./dashboard_components/analytics.tsx";
import Messages from "./dashboard_components/message.tsx";
import Grading from "./dashboard_components/grading.tsx";
import Sidebar from "./dashboard_components/sidebar.tsx";

import useAuth from "../../services/useAuth";
import {useEffect, useState} from "react";


const Dashboard = () => {
    const {authorized, verificationComplete, logout} = useAuth();
    const [activeItem, setActiveItem] = useState(1);

    const handleItemClick = (itemId: number) => {
        setActiveItem(itemId);
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

    const sidebar = [
        {id: 1, icon: HomeIcon},
        {id: 2, icon: MessagesIcon},
        {id: 3, icon: AttendanceIcon},
        {id: 4, icon: EditIcon},
        {id: 5, icon: AnalyticsIcon}
    ];

    const renderComponent = () => {
        switch (activeItem) {
            case 1:
                return <Home/>;
            case 2:
                return <Messages/>;
            case 3:
                return <Attendance/>;
            case 4:
                return <Grading/>;
            case 5:
                return <Analytics/>;
            default:
                return null;
        }
    };

    return (
        <div className="h-screen touch-none">
            <div className="flex w-creen w-full h-screen">
                <div className="pl-3 pt-3 border-r-3 border-secondary pr-3 min-w-fit">
                    <Sidebar sidebar={sidebar} activeItem={activeItem} onItemClick={handleItemClick}/>
                </div>
                <div className="w-full h-full">
                    {renderComponent()}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;