import axios from "axios";
import {useEffect, useState} from "react";
import useAuth from "./useAuth";

const Dashboard = () => {
  const {authorized, verificationComplete, logout} = useAuth();
  const [user, setUser] = useState("Name");

  if (!verificationComplete) {
    return null; // Render a loading spinner or something similar
  }

  if (!authorized) {
    logout();
    return null; // Redirect to login page
  }

  return (
    <>
      <div className="flex overflow-hidden" style={{touchAction: "none"}}>
        <div className=" h-screen bg-my-dark">
          <h1 className="text-white text-2xl text-center">{user}</h1>
          <ul className="flex flex-col h-screen justify-center px-3 items-center">
            <button>
              <li className=" text-white text-2xl mb-4">Home</li>
            </button>
            <li className=" text-white text-2xl">Settings</li>
          </ul>
        </div>
        <div className="flex-1"></div>
      </div>
    </>
  );
};

export default Dashboard;
