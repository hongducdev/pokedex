import { Outlet } from "react-router-dom";
import Header from "../Header";

const Layout = () => {
  return (
    <div className="dark:ctp-macchiato bg-gradient-to-b from-ctp-base to-ctp-crust relative max-w-screen min-h-screen flex">
      <div className="w-[10vw]">
        <Header />
      </div>
      <div className="w-[90vw]">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
