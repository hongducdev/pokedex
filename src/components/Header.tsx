import useDarkMode from "../hooks/useDarkMode";
import { Link, NavLink } from "react-router-dom";
import { RiMoonClearFill, RiSunFill, RiGithubLine } from "react-icons/ri";

const Header = () => {
  const [darkMode, setDarkMode] = useDarkMode();

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="dark:bg-black max-w-[1000px] w-full mx-auto rounded-full bg-opacity-70 shadow-sdprimary absolute top-10 left-0 right-0">
      <div className="flex justify-between items-center pl-4 pr-8 py-2">
        <div className="">
          <Link to="/">
            <img
              src="/Poké_Ball_icon.svg.png"
              alt="pokemon_ball"
              className="w-16 h-16"
            />
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? "text-xl font-medium text-transparent bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text relative after:absolute after:h-[2px] after:w-10 after:bg-gradient-to-r after:rounded-sm after:bottom-0 after:left-0"
                : "text-xl font-medium text-transparent bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text"
            }
          >
            Favorites
          </NavLink>
          {/* darkmode button */}
          <div className="cursor-pointer" onClick={handleDarkMode}>
            {darkMode ? (
              <RiMoonClearFill className="text-white text-2xl" />
            ) : (
              <RiSunFill className="text-yellow-500 text-2xl" />
            )}
          </div>
          <div className="h-full w-full rounded-md bg-gradient-to-r from-primary to-secondary p-1">
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
