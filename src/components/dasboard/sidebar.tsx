import calenderIcon from "../../assets/sidebaricons/calender.svg";
import gradesIcon from "../../assets/sidebaricons/grades.svg";
import messagesIcon from "../../assets/sidebaricons/messages.svg";
import tasksIcon from "../../assets/sidebaricons/tasks.svg";
import {Img} from "@chakra-ui/react";

let sidebar = [
    {id: "1", icon: calenderIcon},
    {id: "2", icon: tasksIcon},
    {id: "3", icon: messagesIcon},
    {id: "4", icon: gradesIcon},
]

const Sidebar = () => {
    return (
        <div className="flex h-screen bg-sidebar">
            <div className="m-auto">
                <ul className="flex flex-col gap-4">
                    {sidebar.map((item) => (
                        <li key={item.id}>
                            <button>
                                <img src={item.icon} alt={`Icon ${item.id}`}/>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;