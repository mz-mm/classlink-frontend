import { useState } from "react";

import { Navbar } from "./Navbar.tsx";
import { Setting } from "./Setting.tsx";
import { Schedule } from "./Schedule.tsx";

const Home = () => {
  const [menu, setMenu] = useState(false);

  document.title = "Расписание";

  const _SetMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="relative h-full overflow-hidden ">
      <Navbar setMenu={_SetMenu} />
      <div className="h-full">
        <div className="mx-3 mb-5 mt-3.5 h-full rounded bg-secondary">
          <Schedule />
        </div>
      </div>
      <Setting menu={menu} setMenu={_SetMenu} />
    </div>
  );
};

export default Home;
