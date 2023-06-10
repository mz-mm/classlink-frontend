import {useEffect, useState} from "react";
import apiClient from "../../../../services/api-client.tsx";

interface Student {
    id: number;
    full_name: string;

}

const Attendance = () => {

    document.title = "Отметить"

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const [students, setStudents] = useState<Student[]>([])
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        current_day: currentDate.toLocaleDateString(undefined, {weekday: 'long'}),
        current_lesson: 0,
        date: `${year}-${month}-${day}`
    })

    const [selectedButtons, setSelectedButtons] = useState<{ [key: number]: number | null }>({});

    const handleButtonClick = (studentId: number, buttonIndex: number) => {
        setSelectedButtons((prevSelectedButtons) => ({
            ...prevSelectedButtons,
            [studentId]: prevSelectedButtons[studentId] === buttonIndex ? null : buttonIndex,
        }));
    };


    useEffect(() => {
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();

        let newLesson = 0;

        if (currentHour === 8 && currentMinute >= 45) {
            newLesson = 1;
        } else if ((currentHour === 8 && currentMinute >= 50) || (currentHour === 9 && currentMinute < 35)) {
            newLesson = 2;
        } else if ((currentHour === 9 && currentMinute >= 40) || (currentHour === 10 && currentMinute < 25)) {
            newLesson = 3;
        } else if ((currentHour === 10 && currentMinute >= 35) || (currentHour === 11 && currentMinute < 20)) {
            newLesson = 4;
        } else if ((currentHour === 11 && currentMinute >= 25) || (currentHour === 12 && currentMinute < 10)) {
            newLesson = 5;
        } else if ((currentHour === 12 && currentMinute >= 15) || (currentHour === 12 && currentMinute <= 59)) {
            newLesson = 6;
        }

        if (newLesson !== formData.current_lesson) {
            setFormData((prevFormData) => ({...prevFormData, current_lesson: newLesson}));
            apiClient.post("/teacher/attendance", {...formData, current_lesson: newLesson})
                .then((response) => {
                    setStudents(response.data);
                })
                .catch((error) => {
                    setError(error.response.data.detail);
                });
        }
    }, [currentDate, formData.current_lesson, setFormData]);


    return (
        <div className="bg-secondary h-full pt-8 px-16 overflow-clip">
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
            {formData.current_lesson === 0 && (
                <div className="rounded py-4 text-center w-full bg-red-300 border border-red-400 text-red-800">
                    Lesson has not started yet
                </div>
            )}
            <div className="h-full overflow-scroll pb-10">
                {students.map((student) => (
                    <ul key={student.id}>
                        <div className="bg-gray-200 p-3 mb-3 rounded flex">
                            {student.full_name}
                            <div className="flex ml-auto">
                                <button
                                    className={`border-green-500 border-2 w-6 h-6 rounded-full sm:mr-[90px] mr-[20px] ${
                                        selectedButtons[student.id] === 1 && "bg-green-500"
                                    }`}
                                    onClick={() => handleButtonClick(student.id, 1)}
                                ></button>
                                <button
                                    className={`border-yellow-500 border-2 w-6 h-6 rounded-full sm:mr-[85px] mr-[20px] ${
                                        selectedButtons[student.id] === 2 && "bg-yellow-500"
                                    }`}
                                    onClick={() => handleButtonClick(student.id, 2)}
                                ></button>
                                <button
                                    className={`border-red-500 border-2 w-6 h-6 rounded-full sm:mr-[24px] mr-[20px] ${
                                        selectedButtons[student.id] === 3 && "bg-red-500"
                                    }`}
                                    onClick={() => handleButtonClick(student.id, 3)}
                                ></button>
                            </div>
                        </div>
                    </ul>
                ))}
            </div>
        </div>
    )
}

export default Attendance;