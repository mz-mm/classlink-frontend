import calenderIcon from "../../assets/sidebaricons/calender.svg";
import gradesIcon from "../../assets/sidebaricons/grades.svg";
import messagesIcon from "../../assets/sidebaricons/messages.svg";
import tasksIcon from "../../assets/sidebaricons/tasks.svg";
import {motion} from "framer-motion";
import {useState} from "react";
import {Img} from "@chakra-ui/react";

interface Props {
    sidebar: { id: number, icon: string }[];
    activeItem: number;
    onItemClick: (itemId: number) => void;
}


const Sidebar = (props: Props) => {
    const [activeItem, setActiveItem] = useState(1);

    return (
        <div className="flex h-screen bg-sidebar">
            <div className="m-auto">
                <ul className="flex flex-col gap-4">
                    {props.sidebar.map((item) => (
                        <li key={item.id}>
                            <button
                                className={`${activeItem === item.id ? "" : "hover:opacity-50"} relative rounded-md focus:outline-none p-3`}
                                onClick={() => {
                                    setActiveItem(item.id);
                                    props.onItemClick(item.id);
                                }}
                            >
                                {activeItem == item.id && (
                                    <motion.div
                                        layoutId='active-button'
                                        className="bg-blue-500 rounded-2xl  absolute inset-0"/>
                                )}
                                <img className="pointer-events-none relative z-10" src={item.icon}
                                     alt={`Icon ${item.id}`}/>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
