import NavBarIcon from '../../../../assets/navbarIcon.svg'

interface Props {
    setMenu: () => void;
}

export const Navbar = ({setMenu}: Props) => {
    return (
        <div className="bg-primary p-3 flex">
            <h1 className="p-2 font-semibold lg:text-2xl">Привет Muhammed 👋</h1>
            <div className="ml-auto">
                <button onClick={() => setMenu()}>
                    <img className="pointer-events-none p-2 lg:w-[48px] w-[38px]" src={NavBarIcon} alt="NavBarIcon"/>
                </button>
            </div>
        </div>
    )
}