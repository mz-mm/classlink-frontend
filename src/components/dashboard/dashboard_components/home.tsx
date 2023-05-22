import NavBarIcon from "../../../assets/navbarIcon.svg";
import CloseIcon from "../../../assets/settingsIcon/closeIcon.svg";
import logoutIcon from "../../../assets/settingsIcon/logoutIcon.svg";
import {useEffect, useState} from "react";
import apiClient from "../../../services/api-client";
import useAuth from "../../../services/useAuth.tsx";

interface Lesson {
    id: number;
    class_id: number;
    day: number;
    subjects: string[];
}

const Home = () => {
    const {logout} = useAuth();
    const [schedule, setSchedule] = useState<Lesson[]>([]);
    const [error, setError] = useState("");
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [menu, setMenu] = useState(false);

    useEffect(() => {
        apiClient
            .get<Lesson[]>("/schedule")
            .then((response) => {
                setSchedule(response.data);
            })
            .catch((error) => {
                setError(error.response.data.detail);
            });
    }, []);


    return (
        <div className="relative h-screen bg-secondary">
            <div className="bg-primary p-3 flex">
                <h1 className="p-2 font-semibold lg:text-2xl">Привет Muhammed 👋</h1>
                <button onClick={() => {
                    setMenu(!menu)
                }} className="ml-auto">
                    <img className="pointer-events-none p-2" src={NavBarIcon} alt="NavBarIcon"/>
                </button>
            </div>
            <div className="lg:px-10 w-full items-center justify-center">
                <div
                    style={{display: "grid", gridTemplateColumns: `repeat(${days.length}, 1fr)`, gridGap: "20px"}}>
                    {days.map((day, index) => (
                        <div key={day}>
                            <p className="lg:my-10 my-2 text-center text-black text-sm font-bold">{day}</p>
                            <div style={{display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gridGap: "20px"}}>
                                {error ? (
                                    <h1>{error}</h1>) : (schedule.length > index && schedule[index].subjects.map((subject, i) => (
                                        <p key={i}
                                           className="bg-blue-500 lg:py-10 lg:px-2 text-center text-sm rounded text-white">{subject}</p>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                {menu && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-[#ACB5C9]  rounded shadow-xl shadow-gray-700">
                            <div className="m-8">
                                <div className="flex pb-4">
                                    <p className="pr-5 m-2">Настройки</p>
                                    <button onClick={() => {
                                        setMenu(!menu)
                                    }} className="ml-auto">
                                        <img className="pointer-events-none" src={CloseIcon} alt="closeIcon"/>
                                    </button>
                                </div>
                                <div className="flex">
                                    <h1 className="m-2 pr-2">Выйти</h1>
                                    <button onClick={() => {
                                        logout()
                                        window.location.reload();
                                    }} className="ml-auto rounded p-2 text-white flex bg-[#3C3333]">
                                        <img className="pointer-events-none" src={logoutIcon} alt="downIcon"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </div>
    )
}

export default Home;