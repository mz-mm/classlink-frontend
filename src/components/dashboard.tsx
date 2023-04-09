import axios from "axios";
import {useEffect, useState} from "react";
import useAuth from "./useAuth";

interface LessonData {
  id: number;
  lesson_num: number;
  teacher_id: string;
  subject: string;
  class_id: number;
  day: number;
  color: string;
  // Use relation() in database.py file to get the teacher name through id as well as possibly implemeting same feautre subject with subject_id
}

const Dashboard = () => {
  const {authorized, verificationComplete, logout} = useAuth();
  const [shedule, setShedule] = useState<LessonData[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (!verificationComplete) {
    return null; // Render a loading spinner or something similar
  }

  if (!authorized) {
    logout();
    return null; // Redirect to login page
  }

  if (authorized) {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8000/api/lessons", {headers: {Authorization: `Bearer ${token}`}})
      .then((res) => {
        setShedule(res.data);
      });
  }

  return (
    <>
      <div className="flex overflow-hidden" style={{touchAction: "none"}}>
        <div className=" h-screen bg-sidebar">
          <ul className="flex flex-col h-screen justify-center px-3 items-center">
            <button>
              <li className=" text-white text-2xl mb-4">Home</li>
            </button>
            <li className=" text-white text-2xl">Settings</li>
          </ul>
        </div>
        <div className="flex items-center w-screen justify-center content-center h-screen bg-main-bg">
          <div className=" bg-secondary-bg p-48 items-center justify-center m-5">
            {shedule.map((item) => (
              <h1 className=" text-white w-full" key={item.id}>
                {item.subject}
              </h1>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
