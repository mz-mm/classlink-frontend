import NavBarIcon from "../../../assets/navbarIcon.svg";
import {useEffect, useState} from "react";
import apiClient from "../../../services/api-client";

interface Lesson {
    id: number;
    class_id: number;
    day: number;
    subjects: string[];
}

const Home = () => {
    const [schedule, setSchedule] = useState<Lesson[]>([]);
    const [error, setError] = useState("");
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
                <button className="ml-auto">
                    <img className="p-2" src={NavBarIcon} alt="NavBarIcon"/>
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
        </div>
    )
}

export default Home;