import useDarkMode from "../hooks/useDarkMode";
import { Link, NavLink } from "react-router-dom";
import { RiMoonClearFill, RiSunFill, RiGithubLine } from "react-icons/ri";
import { TiStarFullOutline } from "react-icons/ti";

const Header = () => {
  const [darkMode, setDarkMode] = useDarkMode();

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="fixed left-10 top-1/2 -translate-y-1/2 z-10">
      <div className="flex justify-between items-center flex-col gap-10">
        <div className="w-16 h-16 p-2 rounded-xl bg-ctp-overlay0/50">
          <Link to="/">
            <img
              src="/Poké_Ball_icon.svg.png"
              alt="pokemon_ball"
              className=""
            />
          </Link>
        </div>

        <div className="flex items-center justify-end gap-6 flex-col bg-ctp-overlay0/50 w-16 p-4 h-[50vh] rounded-xl">
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? "text-3xl text-ctp-yellow hover:text-yellow-400 transition-all ease-in-out duration-300"
                : "text-3xl text-ctp-yellow hover:text-yellow-400 transition-all ease-in-out duration-300"
            }
          >
            <TiStarFullOutline />
          </NavLink>
          <div className="cursor-pointer" onClick={handleDarkMode}>
            {darkMode ? (
              <RiMoonClearFill className="text-white text-2xl" />
            ) : (
              <RiSunFill className="text-ctp-yellow text-2xl" />
            )}
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-md bg-gradient-to-r from-ctp-pink to-ctp-mauve">
            <Link to="https://github.com/hongduccodedao/pokedex">
              <RiGithubLine className="text-white text-2xl" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
