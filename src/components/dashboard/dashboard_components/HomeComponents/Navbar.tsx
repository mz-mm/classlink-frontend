import NavBarIcon from '../../../../assets/navbarIcon.svg';
import {decodeToken} from "../../../../services/decode-token.tsx";

interface Props {
    setMenu: () => void;
}

export const Navbar = ({setMenu}: Props) => {
    const token = localStorage.getItem("token");
    if (token) {
        const decoded = decodeToken(token);
        console.log(decoded?.role)
    }


    return (
        <div className="bg-primary border-l-2 border-secondary p-3 flex">
            <h1 className="p-2 font-semibold lg:text-2xl">Привет Muhammed 👋</h1>
            <div className="ml-auto">
                <button onClick={() => setMenu()}>
                    <img className="pointer-events-none p-2 lg:w-[48px] w-[38px]" src={NavBarIcon} alt="NavBarIcon"/>
                </button>
            </div>
        </div>
    )
}