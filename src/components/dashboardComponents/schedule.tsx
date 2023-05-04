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
        <div className="p-3"
             style={{display: "grid", gridTemplateColumns: `repeat(${days.length}, 1fr)`, gridGap: "16px"}}>
            {days.map((day, index) => (
                <div key={day}>
                    <p className="bg-indigo-600 p-2 mb-4 rounded text-center text-white font-bold">{day}</p>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gridGap: "16px"}}>
                        {error ? (
                            <h1>{error}</h1>
                        ) : (
                            schedule[index].subjects.map((subject, i) => (
                                <p key={i} className="bg-blue-500 rounded p-2 text-center text-white">{subject}</p>
                            ))
                        )}
                    </div>
                </div>
            ))}
        </div>);
};

export default Schedule;