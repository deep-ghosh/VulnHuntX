import { Button } from "flowbite-react";

const Home = () => {
  return (
    <>
      <div className="dark:bg-[#0D121C] w-full ">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center min-h-screen">
          <div className="p-10 bg-gray-100 dark:bg-gray-700 rounded-lg space-y-4 mt-10">
            <h2 className="md:text-5xl text-2xl dark:text-white">
              Welcome to Vuln
              <span className="text-orange-500 font-semibold tracking-widest">
                Hunt
              </span>
            </h2>
            <h2 className="text-md md:text-2xl text-gray-500 dark:text-white">
              Scan for vulnerability by entering your website url
            </h2>
            <div className=" flex p-4 bg-neutral-600 rounded-lg">
              <input
                type="text"
                name="domain"
                placeholder="Enter the url"
                className="w-full h-10 rounded-lg outline-none px-3 py-4"
                required
              />
              <Button color="warning">Scan</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
