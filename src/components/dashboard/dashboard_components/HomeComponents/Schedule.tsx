import { useEffect, useState } from "react";
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
  const days = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

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
        <div className="w-full items-center justify-center px-2 lg:px-8 xl:px-16">
          <div className="grid grid-cols-6 gap-3 text-center lg:pt-3 xl:pt-8">
            {days.map((day) => (
              <div key={day} className="font-bold xl:pb-5">
                {day}
              </div>
            ))}
            {schedule.map((lesson) => (
              <div
                className={`flex items-center justify-center rounded bg-blue-400 sm:h-[30px] md:h-[50px] lg:h-[60px] xl:h-[80px] 2xl:h-[100px]`}
                key={lesson.id}
              >
                {lesson.subject.name}
              </div>
            ))}
          </div>
        </div>
      )}
      {error && (
        <div>
          <h1>{error}</h1>
        </div>
      )}
    </>
  );
};
