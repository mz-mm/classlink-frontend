import Students from "./Students.tsx";

const Attendance = () => {
  document.title = "Отметить";

  return (
    <div className="ml-3 h-full overflow-scroll bg-secondary px-16 pt-8">
      <div className="mb-4 flex">
        <p>Студенты</p>
        <div className="ml-auto flex space-x-8">
          <p>Присутствует</p>
          <p>Опоздал</p>
          <p>Отсутствует</p>
        </div>
      </div>
      <Students />
    </div>
  );
};

export default Attendance;
