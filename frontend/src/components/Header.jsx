import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "flowbite-react";

const navList = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const Header = () => {
  const [toggleMode, setToggleMode] = useState(true);

  useEffect(() => {
    if (toggleMode === true) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [toggleMode]);
  const handleToggleMode = () => {
    setToggleMode(!toggleMode);
  };

  return (
    <header className="border-b dark:border-gray-800 p-4 font-poppins bg-white dark:bg-[#0D121C] duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* logo */}
        <NavLink to="/">
          <div className="w-[100px] text-2xl md:text-4xl font-bold">
            <span className="dark:text-white">Vuln</span>
            <span className="text-orange-500">HuntX</span>
          </div>
        </NavLink>

        {/* search bar */}

        {/* <div className="hidden md:flex items-center">
          <form className="max-w-md mx-auto">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <input
                type="search"
                id="default-search"
                className="block w-full p-3 pe-12 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#2c3437] dark:border-gray-600 dark:placeholder-[#929fa5] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search here..."
                required
              />
              <div className="absolute inset-y-0 end-0 flex items-center pe-3">
                <button
                  type="submit"
                  className=" cursor-pointer hover:bg-gray-100 focus:bg-gray-200 dark:hover:bg-gray-800 dark:focus:bg-gray-700 w-10 h-10 flex justify-center items-center rounded-full"
                >
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div> */}
        {/* navigation */}
        <div className="flex items-center gap-x-5">
          {/* <div className="flex md:hidden items-center">
            <button
              type="submit"
              className=" cursor-pointer hover:bg-gray-100 focus:bg-gray-200 dark:focus:bg-slate-800 w-10 h-10 flex justify-center items-center rounded-full"
            >
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </div> */}

          <ul className="gap-x-6 lg:flex flex-row hidden">
            {navList.map((navItem, index) => (
              <Link to={navItem.path} key={index}>
                <li
                  className=" flex items-center gap-x-1 duration-150 hover:text-orange-500 list-none cursor-pointer text-xl font-medium text-[#343C3F] dark:text-white dark:hover:text-orange-500"
                  key={index}
                >
                  {navItem.name}
                </li>
              </Link>
            ))}
          </ul>
          {/* Mode Toggle */}
          <div className="lg:border-l-2 lg:border-gray-300 dark:border-gray-600 lg:pl-4">
            {toggleMode ? (
              <MdOutlineLightMode
                className="text-2xl cursor-pointer dark:text-white dark:hover:text-orange-500 "
                onClick={handleToggleMode}
              />
            ) : (
              <MdOutlineDarkMode
                className="text-2xl cursor-pointer text-gray-400 hover:text-orange-500 "
                onClick={handleToggleMode}
              />
            )}
          </div>

          <NavLink to={"/signin"}>
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
