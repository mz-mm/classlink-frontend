import {useState} from "react";

import {Navbar} from "./Navbar.tsx";
import {Setting} from "./Setting.tsx";
import {Schedule} from "./Schedule.tsx";

const Home = () => {
    const [menu, setMenu] = useState(false);

    document.title = "Расписание"

    const _SetMenu = () => {
        setMenu(!menu)
    }

    return (
        <div className="relative h-screen bg-secondary">
            <Navbar setMenu={_SetMenu}/>
            <Schedule/>
            <Setting menu={menu} setMenu={_SetMenu}/>
        </div>
    )
}

export default Home;