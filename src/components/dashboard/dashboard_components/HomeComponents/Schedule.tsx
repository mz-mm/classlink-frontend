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

    console.log(schedule[0].subject);

    return (
        <div className="lg:px-10 w-full items-center justify-center">
            <table className="">
                <thead>
                <tr>
                    {days.map((day, index) => (
                        <th key={index}>
                            {day}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                <td>
                    {schedule.slice(0, 6).map((item, index) => (
                        <tr key={index}>{item.subject.name}</tr>
                    ))}
                </td>
                </tbody>
            </table>
        </div>
    )
}


