import {useEffect, useState} from "react";
import apiClient from "../../../../services/api-client.tsx";

interface Student {
    id: number;
    full_name: string;
    status: boolean;
    late: number;
}


const Attendance = () => {
    const [students, setStudents] = useState<Student[]>([])
    const [error, setError] = useState("")


    useEffect(() => {
        apiClient
            .get<Student[]>("/teacher/attendance")
            .then((response) => {
                setStudents(response.data);
            })
            .catch((error) => {
                setError(error.response.data.detail);
            });
    }, []);

    return (
        <div>
            {error && (
                <div>{error}</div>
            )}
            {students.map((student) => (
                <div>
                    {student.full_name}
                    {student.status}
                    {student.late}
                </div>
            ))}
        </div>
    )
}

export default Attendance;