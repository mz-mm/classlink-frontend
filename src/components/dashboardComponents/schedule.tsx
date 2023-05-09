import {useEffect, useState} from "react";
import apiClient from "../../services/api-client";

interface Lesson {
    id: number;
    class_id: number;
    day: number;
    subjects: string[];
}

const Schedule = () => {
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
        <div className="px-10 pb-10 pt-5 bg-secondary-bg rounded-2xl shadow-black shadow-xl m-4"
             style={{display: "grid", gridTemplateColumns: `repeat(${days.length}, 1fr)`, gridGap: "16px"}}>
            {days.map((day, index) => (
                <div key={day}>
                    <p className="mb-5 text-center text-white text-sm font-bold">{day}</p>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gridGap: "16px"}}>
                        {error ? (
                            <h1>{error}</h1>) : (schedule.length > index && schedule[index].subjects.map((subject, i) => (
                                <p key={i}
                                   className="bg-blue-500 py-10 px-2 text-center text-sm text-white">{subject}</p>
                            ))
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Schedule;
