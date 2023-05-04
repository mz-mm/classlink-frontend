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
        <div className="p-2" style={{display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gridGap: "16px"}}>
            {error ? (
                <h1>{error}</h1>
            ) : (
                schedule.map((lesson, index) => (
                    <>
                        {lesson.subjects.map((subject) => (
                            <p className="bg-gray-100 p-2 text-center">{subject}</p>
                        ))}
                    </>
                ))
            )}
        </div>

    );
};

export default Schedule;