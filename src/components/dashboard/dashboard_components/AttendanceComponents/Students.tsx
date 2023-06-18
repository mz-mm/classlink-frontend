import { useEffect, useState } from "react";
import apiClient from "../../../../services/api-client.tsx";

interface Student {
  id: number;
  full_name: string;
}

const Students = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    current_day: currentDate.toLocaleDateString(undefined, { weekday: "long" }),
    current_lesson: 0,
    date: `${year}-${month}-${day}`,
    year: year,
    month: month,
    day: day,
  });

  useEffect(() => {
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    let newLesson = 2;

    if (currentHour === 8 && currentMinute < 45) {
      newLesson = 1;
    } else if (
      (currentHour === 8 && currentMinute >= 50) ||
      (currentHour === 9 && currentMinute < 35)
    ) {
      newLesson = 2;
    } else if (
      (currentHour === 9 && currentMinute >= 40) ||
      (currentHour === 10 && currentMinute < 25)
    ) {
      newLesson = 3;
    } else if (
      (currentHour === 10 && currentMinute >= 35) ||
      (currentHour === 11 && currentMinute < 20)
    ) {
      newLesson = 4;
    } else if (
      (currentHour === 11 && currentMinute >= 25) ||
      (currentHour === 12 && currentMinute < 10)
    ) {
      newLesson = 5;
    } else if (
      (currentHour === 12 && currentMinute >= 15) ||
      (currentHour === 12 && currentMinute <= 59)
    ) {
      newLesson = 6;
    }

    // Add second period

    if (newLesson !== formData.current_lesson) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        current_lesson: newLesson,
      }));
      apiClient
        .post("/teacher/attendance", { ...formData, current_lesson: newLesson })
        .then((response) => {
          setStudents(response.data);
        })
        .catch((error) => {
          setError(error.response.data.detail);
        });
    }
  }, [currentDate, formData.current_lesson, setFormData]);

  const [selectedButtons, setSelectedButtons] = useState<{
    [key: number]: number;
  }>({});

  const handleButtonClick = (studentId: number, buttonIndex: number) => {
    setSelectedButtons((prevSelectedButtons) => {
      const isButtonSelected = prevSelectedButtons[studentId] === buttonIndex;

      if (isButtonSelected) {
        return prevSelectedButtons; // Return previous state without any changes
      }

      return {
        ...prevSelectedButtons,
        [studentId]: buttonIndex,
      };
    });

    if (buttonIndex === 1 && selectedButtons[studentId] !== 1) {
      console.log("here");
    } else if (buttonIndex === 2 && selectedButtons[studentId] !== 2) {
      console.log("late");
    } else if (buttonIndex === 3 && selectedButtons[studentId] !== 3) {
      console.log("not here");
    }
  };

  return (
    <div>
      {error && <div>{error}</div>}
      {formData.current_lesson === 0 && (
        <div className="w-full rounded border border-red-400 bg-red-300 py-4 text-center text-red-800">
          Урок не начался или уже закончился
        </div>
      )}
      {students.map((student) => (
        <ul key={student.id}>
          <div className="mb-3 flex rounded bg-gray-200 p-3">
            {student.full_name}
            <div className="ml-auto flex">
              <button
                className={`mr-[20px] h-6 w-6 rounded-full border-2 border-green-500 sm:mr-[90px] ${
                  selectedButtons[student.id] === 1 && "bg-green-500"
                }`}
                onClick={() => handleButtonClick(student.id, 1)}
              ></button>
              <button
                className={`mr-[20px] h-6 w-6 rounded-full border-2 border-yellow-500 sm:mr-[85px] ${
                  selectedButtons[student.id] === 2 && "bg-yellow-500"
                }`}
                onClick={() => handleButtonClick(student.id, 2)}
              ></button>
              <button
                className={`mr-[20px] h-6 w-6 rounded-full border-2 border-red-500 sm:mr-[24px] ${
                  (selectedButtons[student.id] === 3 ||
                    selectedButtons[student.id] == null) &&
                  "bg-red-500"
                }`}
                onClick={() => handleButtonClick(student.id, 3)}
              ></button>
            </div>
          </div>
        </ul>
      ))}
    </div>
  );
};

export default Students;
