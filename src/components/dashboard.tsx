import axios from "axios";
import {useEffect, useState} from "react";

const Dashboard = () => {
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setAuthorized(true);
    } else {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    if (authorized) {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("http://localhost:8000/api/user")
        .then((response) => setUser(response.data.full_name));
    }
  });

  return authorized ? (
    <>
      <div className="flex overflow-hidden" style={{touchAction: "none"}}>
        <div className=" h-screen bg-my-dark">
          <h1 className="text-white text-2xl text-center"></h1>
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
  ) : null;
};

export default Dashboard;
