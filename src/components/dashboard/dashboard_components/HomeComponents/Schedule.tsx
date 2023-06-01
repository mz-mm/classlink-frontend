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
                <div className="xl:px-16 lg:px-8 px-2 w-full items-center justify-center">
                    <div className="grid grid-cols-6 gap-3 xl:pt-8 lg:pt-3 text-center">
                        {days.map((day) => (
                            <div className="xl:pb-5 font-bold">{day}</div>
                        ))}
                        {schedule.map((lesson) => (
                            <div
                                className={`flex justify-center items-center 2xl:h-[100px] xl:h-[80px] lg:h-[60px] md:h-[50px] sm:h-[30px] rounded bg-blue-400`}
                                key={lesson.id}>{lesson.subject.name}</div>
                        ))}
                    </div>
                </div>
            )}
            {error && (<div><h1>{error}</h1></div>)}
        </>
    )
}


