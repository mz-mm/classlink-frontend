import axios from "axios";
import {useEffect, useState} from "react";
import useAuth from "./useAuth";
import calenderlines from "../assets/sidebaricons/calendar-lines.svg";
import notes from "../assets/sidebaricons/note.svg";

interface LessonData {
  id: number;
  class_id: string;
  day: number;
  subject_1_id: {
    id: number;
    name: string;
    color: string;
  };
  subject_2_id: {
    id: number;
    name: string;
    color: string;
  };
  subject_3_id: {
    id: number;
    name: string;
    color: string;
  };
  subject_4_id: {
    id: number;
    name: string;
    color: string;
  };
  subject_5_id: {
    id: number;
    name: string;
    color: string;
  };
  subject_6_id: {
    id: number;
    name: string;
    color: string;
  };
  teacher_id: string;
}

const Dashboard = () => {
  const {authorized, verificationComplete, logout} = useAuth();
  const [schedule, setSchedule] = useState<LessonData[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (authorized) {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:8000/api/lessons", {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then((res) => {
          setSchedule(res.data);
        });
    }
  }, [authorized]);

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
        <div className=" h-screen bg-sidebar">
          <ul className="flex flex-col h-screen justify-center px-5 items-center">
            <button>
              <li className="py-3">
                <img width="50px" src={calenderlines} alt="calender" />
              </li>
            </button>
            <button>
              <li className="py-3">
                <img width="50px" src={notes} alt="calender" />
              </li>
            </button>
            <button>
              <li className="py-3">
                <img width="50px" src={calenderlines} alt="calender" />
              </li>
            </button>
            <button>
              <li className="py-3">
                <img width="50px" src={calenderlines} alt="calender" />
              </li>
            </button>
            <button>
              <li className="py-3">
                <img width="50px" src={calenderlines} alt="calender" />
              </li>
            </button>
          </ul>
        </div>
        <div className="flex items-center w-screen justify-center content-center h-screen bg-main-bg">
          <div className="flex bg-secondary-bg px-5 items-center justify-center">
            <div>
              {schedule.map((item) => (
                <div className={`text-white w-full text-center rounded border-2 p-5 my-5`} key={item.id}>
                  <h1>{item.day}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
