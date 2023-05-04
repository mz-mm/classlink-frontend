import { useEffect, useState } from "react";
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
        <div>
            {error ? (
                <h1>{error}</h1>
            ) : (
                schedule.map((lesson, index) => (
                    <h1>
                        <p>{lesson.subjects}</p>
                    </h1>
                ))
            )}
        </div>
    );
};

export default Schedule;