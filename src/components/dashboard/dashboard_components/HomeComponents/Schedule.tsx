import {useEffect, useState} from "react";
import apiClient from "../../../../services/api-client.tsx";

interface Subject {
    id: number;
    name: string;
    color: string;

}

interface Lesson {
    id: number;
    class_id: number;
    day: number;
    lesson_num: number;
    teacher_id: string;
    subject: Subject;
}


export const Schedule = () => {
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
        <>
            {!error && (
                <div className="lg:px-10 px-2 w-full items-center justify-center">
                    <div className="grid grid-cols-6 gap-3 pt-3 text-center">
                        {days.map((day) => (
                            <div className="font-bold">{day}</div>
                        ))}
                        {schedule.map((lesson) => (
                            <div
                                className={`flex justify-center items-center lg:h-[100px] md:h-[50px] sm:h-[20px] rounded bg-blue-300 `}
                                key={lesson.id}>{lesson.subject.name}</div>
                        ))}
                    </div>
                </div>
            )}
            {error && (<div><h1>{error}</h1></div>)}
        </>
    )
}


