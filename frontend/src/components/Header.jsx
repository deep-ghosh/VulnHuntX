import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const navList = [
  {
    name: "HOME",
    path: "/",
  },
  {
    name: "ABOUT",
    path: "/about",
  },
  {
    name: "HELP",
    path: "/help",
  },
];

const Header = () => {
  const [toggleMode, setToggleMode] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (toggleMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [toggleMode]);

  const handleToggleMode = () => {
    setToggleMode((prevMode) => !prevMode);
  };

  return (
    <header
      className={`p-4 font-poppins duration-300  
    ${
      location.pathname === "/"
        ? "bg-transparent"
        : "bg-white dark:bg-[#020300]"
    }
    `}
    >
      <div className="max-w-full mx-auto flex items-center justify-between relative">
        {/* logo */}
        <NavLink to="/">
          <div className="w-[100px] text-2xl md:text-6xl font-bold">
            <span
              className={`
            ${location.pathname === "/" ? "text-white" : ""}
            dark:text-white`}
            >
              Vuln
            </span>
            <span className="text-orange-500">HuntX</span>
          </div>
        </NavLink>

        <div className="flex items-center gap-x-5">
          <ul className="gap-x-6 lg:flex flex-row hidden">
            {navList.map((navItem, index) => (
              <NavLink to={navItem.path} key={index}>
                <li
                  className={`flex items-center gap-x-1 duration-150 hover:text-orange-500 list-none cursor-pointer text-2xl font-medium text-[#343C3F] dark:text-white dark:hover:text-orange-500 ${
                    location.pathname === "/" ? "text-white" : ""
                  }`}
                >
                  {navItem.name}
                </li>
              </NavLink>
            ))}
          </ul>
          {/* Mode Toggle */}
          <div className="lg:border-l-2 lg:border-gray-300 dark:border-gray-600 lg:pl-4">
            {toggleMode ? (
              <MdOutlineLightMode
                className="text-2xl cursor-pointer dark:text-white dark:hover:text-orange-500"
                onClick={handleToggleMode}
                aria-label="Toggle to dark mode"
              />
            ) : (
              <MdOutlineDarkMode
                className="text-2xl cursor-pointer text-gray-400 hover:text-orange-500"
                onClick={handleToggleMode}
                aria-label="Toggle to light mode"
              />
            )}
          </div>

          <NavLink
            to="/signin"
            className="p-[2px] bg-gradient-to-tr from-orange-400 to-pink-500 rounded-md"
          >
            <button
              className={`${
                location.pathname === "/"
                  ? "bg-[#020300]/90 text-white"
                  : "bg-white"
              } whitespace-nowrap duration-200 dark:bg-[#020300] hover:bg-gradient-to-bl dark:from-orange-400 dark:to-pink-500 from-orange-400 to-pink-500 px-4 py-2 rounded-md dark:text-white hover:text-white font-medium`}
            >
              Login
            </button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
