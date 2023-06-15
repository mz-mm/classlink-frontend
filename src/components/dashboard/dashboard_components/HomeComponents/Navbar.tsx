import NavBarIcon from "../../../../assets/navbarIcon.svg";
import { decodeToken } from "../../../../services/decode-token.tsx";
import { useEffect, useState } from "react";

interface Props {
  setMenu: () => void;
}

export const Navbar = ({ setMenu }: Props) => {
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      setName(decoded?.name);
    }
  }, []);

  return (
    <div className="flex bg-primary p-3">
      <h1 className="p-2 font-semibold lg:text-2xl">Привет {name} 👋</h1>
      <div className="ml-auto">
        <button onClick={() => setMenu()}>
          <img
            className="pointer-events-none w-[38px] lg:w-[48px]"
            src={NavBarIcon}
            alt="NavBarIcon"
          />
        </button>
      </div>
    </div>
  );
};
