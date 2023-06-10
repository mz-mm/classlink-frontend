import Logo from "../../../assets/logo.svg";
import {motion} from "framer-motion";
import {useState, useEffect} from "react";

interface Props {
    sidebar: { id: number, icon: string, allowedRoles: string, name: string }[];
    activeItem: number;
    onItemClick: (itemId: number) => void;
}


const Sidebar = (props: Props) => {
    const [activeItem, setActiveItem] = useState(1);
    const [role, setRole] = useState("");

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role) {
            setRole(role);
        }
    }, []);


    return (
        <div className="flex">
            <ul className="flex flex-col gap-4">
                <div className="flex mb-8 items-center">
                    <img className="pointer-events-none  w-[40px] h-[40px]" src={Logo} alt="logo"/>
                    <p className="font-bold text-lg pb-2 pl-1 hidden md:block">Classlink</p>
                </div>
                {props.sidebar
                    .filter((item) => item.allowedRoles === "all" || item.allowedRoles.includes(role))
                    .map((item) => (
                        <li key={item.id}>
                            <button
                                className={`${activeItem === item.id ? "" : "hover:opacity-50"} relative rounded-md focus:outline-none p-3`}
                                onClick={() => {
                                    setActiveItem(item.id);
                                    props.onItemClick(item.id);
                                }}
                            >
                                {activeItem === item.id && (
                                    <motion.div
                                        layoutId="active-button"
                                        className="bg-tertiary rounded-2xl absolute inset-0 md:w-[155px]"
                                    />
                                )}
                                <div className="flex space-x-3 relative z-10">
                                    <img
                                        className="lg:w-[28px] lg:h-[28px] w-[18px] h-[18px] pointer-events-none relative z-10"
                                        src={item.icon}
                                        alt={`Icon ${item.id}`}
                                    />
                                    <div className="hidden md:block pt-1">
                                        <p>{item.name}</p>
                                    </div>
                                </div>
                            </button>
                        </li>
                    ))}
            </ul>
        </div>

    );
};

export default Sidebar;