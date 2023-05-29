import useAuth from "../../../../services/useAuth.tsx";
import CloseIcon from '../../../../assets/settingsIcon/closeIcon.svg'
import LogoutIcon from '../../../../assets/settingsIcon/logoutIcon.svg'

interface Props {
    menu: boolean;
    setMenu: () => void;
}


export const Setting = ({menu, setMenu}: Props) => {
    const {logout} = useAuth();
    return (
        <>
            {menu && (
                <div className="bg-gray-700 bg-opacity-50 fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-[#ACB5C9]  rounded shadow-xl shadow-gray-700">
                        <div className="m-8">
                            <div className="flex pb-4">
                                <p className="pr-5 m-2">Настройки</p>
                                <button onClick={() => setMenu()}
                                        className="ml-auto">
                                    <img className="pointer-events-none" src={CloseIcon} alt="closeIcon"/>
                                </button>
                            </div>
                            <div className="flex">
                                <h1 className="m-2 pr-2">Выйти</h1>
                                <button onClick={() => {
                                    logout()
                                }} className="ml-auto rounded p-2 text-white flex bg-[#3C3333]">
                                    <img className="pointer-events-none" src={LogoutIcon} alt="downIcon"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
