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
        current_lesson: 2,
        date: `${year}-${month}-${day}`
    })


    const currentHour = currentDate.getDate()
    const currentMinute = currentDate.getMinutes()


    // Finish the lesson_num finding function
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
        <div className="bg-secondary h-full pt-8 px-16 overflow-scroll">
            <div className="mb-4 flex">
                <p>Студенты</p>
                <div className="ml-auto flex space-x-8">
                    <p>Присутствует</p>
                    <p>Опоздал</p>
                    <p>Отсутствует</p>
                </div>
            </div>
            {error && (
                <div>{error}</div>
            )}
            {students.map((student) => (
                <ul key={student.id}>
                    <div className="bg-gray-200 p-3 mb-3 rounded flex">
                        {student.full_name}
                        <div className="flex ml-auto">
                            <button
                                className="border-green-500 border-2 w-6 h-6 rounded-full sm:mr-[90px] mr-[20px]"></button>
                            <button
                                className="border-yellow-500 border-2 w-6 h-6 rounded-full sm:mr-[85px] mr-[20px]"></button>
                            <button
                                className="border-red-500 border-2 w-6 h-6 rounded-full sm:mr-[24px] mr-[20px]"></button>
                        </div>
                    </div>
                </ul>
            ))}
        </div>
    )
}

export default Attendance;