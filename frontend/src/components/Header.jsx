import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "flowbite-react";

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
    <header className="p-4 font-poppins bg-transparent duration-300">
      <div className="max-w-full mx-auto flex items-center justify-between relative">
        {/* logo */}
        <NavLink to="/">
          <div className="w-[100px] text-2xl md:text-6xl font-bold">
            <span className="dark:text-white">Vuln</span>
            <span className="text-orange-500">HuntX</span>
          </div>
        </NavLink>

        <div className="flex items-center gap-x-5">
          <ul className="gap-x-6 lg:flex flex-row hidden">
            {navList.map((navItem, index) => (
              <NavLink to={navItem.path} key={index}>
                <li className="flex items-center gap-x-1 duration-150 hover:text-orange-500 list-none cursor-pointer text-2xl font-medium text-[#343C3F] dark:text-white dark:hover:text-orange-500">
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

          <NavLink to="/signin">
            <Button
              outline
              gradientDuoTone="pinkToOrange"
              className="whitespace-nowrap"
              size="md"
            >
              Login
            </Button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
