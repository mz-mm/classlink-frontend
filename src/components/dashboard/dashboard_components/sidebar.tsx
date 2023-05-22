import Logo from "../../../assets/logo.svg";
import {motion} from "framer-motion";
import {useState} from "react";

interface Props {
    sidebar: { id: number, icon: string }[];
    activeItem: number;
    onItemClick: (itemId: number) => void;
}


const Sidebar = (props: Props) => {
    const [activeItem, setActiveItem] = useState(1);

    return (
        <div className="flex">
            <div className="">
                <ul className="flex flex-col gap-4">
                    <img className="pointer-events-none mb-8" src={Logo}/>
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
                                <img
                                    className="lg:w-[34px] lg:h-[34px] w-[18px] h-[18px]  pointer-events-none relative z-10"
                                    src={item.icon}
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