import Logo from "../../../assets/logo.svg";
import { useEffect, useState } from "react";

interface Props {
  sidebar: { id: number; icon: string; allowedRoles: string; name: string }[];
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
    <div className="flex ">
      <ul className="flex flex-col">
        <div className="items-cente mb-8 flex">
          <img
            className="pointer-events-none ml-5 h-[40px] w-[40px]"
            src={Logo}
            alt="logo"
          />
          <p className="hidden pb-2 pl-1 text-lg font-bold md:block">
            Classlink
          </p>
        </div>
        <div>
          {props.sidebar
            .filter(
              (item) =>
                item.allowedRoles === "all" || item.allowedRoles.includes(role)
            )
            .map((item) => (
              <li key={item.id}>
                <button
                  className={`${
                    activeItem === item.id
                      ? "w-full rounded-r border-l-4 border-black bg-secondary"
                      : "w-full border-l-4 border-white hover:border-secondary hover:bg-secondary"
                  } relative p-3 focus:outline-none md:px-7 md:py-3`}
                  onClick={() => {
                    setActiveItem(item.id);
                    props.onItemClick(item.id);
                  }}
                >
                  <div className="relative z-10 flex space-x-3">
                    <img
                      className="pointer-events-none relative z-10 h-[18px] w-[18px] md:mt-1.5 lg:mt-0 lg:h-[28px] lg:w-[28px]"
                      src={item.icon}
                      alt={`Icon ${item.id}`}
                    />
                    <div className="hidden pt-1 md:block">
                      <p className="pb-1">{item.name}</p>
                    </div>
                  </div>
                </button>
              </li>
            ))}
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
