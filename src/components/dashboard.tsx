import {useEffect, useState} from "react";
import useAuth from "./useAuth";
import calenderLines from "../assets/sidebaricons/calendar-lines.svg";
import notes from "../assets/sidebaricons/note.svg";
import Schedule from "./dashboardComponents/schedule";

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
    <div>
      <Schedule />
    </div>
  );
};
export default Dashboard;
