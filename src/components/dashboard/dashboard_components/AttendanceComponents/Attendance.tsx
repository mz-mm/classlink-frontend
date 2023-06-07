import {useEffect, useState} from "react";
import apiClient from "../../../../services/api-client.tsx";

interface Student {
    id: number;
    full_name: string;

}


const Attendance = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const [students, setStudents] = useState<Student[]>([])
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        current_day: currentDate.toLocaleDateString(undefined, {weekday: 'long'}),
        current_lesson: 1,
        date: `${year}-${month}-${day}`
    })


    const currentHour = currentDate.getDate()
    const currentMinute = currentDate.getMinutes()


    if (currentHour > 8 && currentHour < 9 && currentMinute < 45) {
        setFormData({...formData, current_lesson: 1});
    } else if (currentHour > 8 && ((currentHour > 9 && currentMinute < 35) || currentMinute > 50)) {
        setFormData({...formData, current_lesson: 1});
    }


    useEffect(() => {
        apiClient.post("/teacher/attendance", formData)
            .then((response) => {
                setStudents(response.data)
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
                <div key={student.id}>
                    {student.full_name}
                </div>
            ))}
        </div>
    )
}

export default Attendance;