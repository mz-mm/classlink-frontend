import HomeIcon from "../../assets/sidebar_icons/home.svg";
import MessagesIcon from "../../assets/sidebar_icons/messages.svg";
import GradingIcon from "../../assets/sidebar_icons/attendance.svg";
import AttendanceIcon from "../../assets/sidebar_icons/edit.svg";
import AnalyticsIcon from "../../assets/sidebar_icons/analytics.svg";

import Home from "./dashboard_components/HomeComponents/Home.tsx";
import Attendance from "./dashboard_components/AttendanceComponents/Attendance.tsx";
import Analytics from "./dashboard_components/AnalyticsComponents/Analytics.tsx";
import Messages from "./dashboard_components/MessageComponents/Message.tsx";
import Grading from "./dashboard_components/GradingComponents/Grading.tsx";
import Sidebar from "./dashboard_components/Sidebar.tsx";

import useAuth from "../../services/useAuth";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { authorized, verificationComplete, logout } = useAuth();
  const [activeItem, setActiveItem] = useState(1);
  const [userRole, setUserRole] = useState("");

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

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      setUserRole(role);
    }
  }, []);

  const sidebar = [
    { id: 1, icon: HomeIcon, allowedRoles: "all", name: "Расписание" },
    { id: 2, icon: MessagesIcon, allowedRoles: "all", name: "Сообщения" },
    { id: 3, icon: AttendanceIcon, allowedRoles: "teacher", name: "Отметить" },
    { id: 4, icon: GradingIcon, allowedRoles: "teacher", name: "Oценить" },
    { id: 5, icon: AnalyticsIcon, allowedRoles: "all", name: "Аналитика" },
  ];

  const renderComponent = () => {
    switch (activeItem) {
      case 1:
        return <Home />;
      case 2:
        return <Messages />;
      case 3:
        if (userRole === "teacher") {
          return <Attendance />;
        } else {
          return null;
        }
      case 4:
        if (userRole === "teacher") {
          return <Grading />;
        } else {
          return null;
        }
      case 5:
        return <Analytics />;
      default:
        return null;
    }
  };

  return (
    <>
      {authorized && (
        <div className="h-screen touch-none">
          <div className="w-creen flex h-screen w-full">
            <div className="min-w-fit pt-5">
              <Sidebar
                sidebar={sidebar}
                activeItem={activeItem}
                onItemClick={handleItemClick}
              />
            </div>
            <div className="w-full overflow-auto">{renderComponent()}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
