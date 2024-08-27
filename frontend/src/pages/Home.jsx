import { IoSearch } from "react-icons/io5";
const Home = () => {
  const handleScan = async () => {
    const urlInput = document.querySelector('input[name="domain"]');
    const url = urlInput.value.trim();

    if (url) {
      try {
        const response = await fetch(`http://localhost:3000/search`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });

        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }

        const data = await response.json();

        // Handle the response data here
        console.log("Scan result:", data);
        alert(`Scan completed: ${JSON.stringify(data)}`);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        alert("An error occurred while scanning the URL. Please try again.");
      }
    } else {
      alert("Please enter a valid URL");
    }
  };
  return (
    <>
      <div className="dark:bg-[#0D121C] w-full ">
        <div className="max-w-7xl mx-auto flex min-h-screen">
          {/* <div className="w-full h-screen bg-gray-200 dark:bg-gray-800 p-6 rounded-xl">
            <img
              src="https://media1.giphy.com/media/xULW8l2gXuRPmsQe8U/giphy.gif?cid=6c09b952btek6zdsffay77y02r0nk8apohw3h9m7190u87vs&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
              alt=""
            />
          </div> */}
          <div className="flex items-center h-fit mt-10 gap-6">
            <div className="p-8 md:p-10 space-y-8 duration-200 w-1/2 h-fit">
              <div className="text-center">
                <h2 className=" text-md md:text-5xl font-light dark:text-white">
                  Is Your Data Saved?
                </h2>
                <h2 className=" text-5xl md:text-6xl font-bold dark:text-white">
                  Scan for vulnerable endpoints
                </h2>
              </div>
              <div className="flex flex-col md:flex-row justify-between dark:bg-gray-800 bg-orange-400 rounded-lg space-y-4 md:space-y-0 p-4">
                <input
                  type="text"
                  name="domain"
                  placeholder="Enter website url"
                  className="w-full rounded-s-md outline-none bg-white placeholder:text-gray-400 placeholder:text-2xl border-none"
                  required
                />
                <button
                  type="submit"
                  onClick={handleScan}
                  className="bg-yellow-300 dark:bg-orange-400 rounded-e-md p-4 text-xl font-meduim flex items-center gap-4"
                >
                  <IoSearch className="w-6 h-6" />
                  Scan
                </button>
              </div>
            </div>
            <div className="w-1/2 bg-gray-200 dark:bg-gray-800 p-6 rounded-xl">
              <img
                src="https://user-images.githubusercontent.com/40064496/120735130-6c9e2300-c4c0-11eb-8346-94429163466a.gif"
                alt=""
              />
              {/* <video playsInline muted loop preload="auto">
                <source
                  src="https://mylivewallpapers.com/wp-content/uploads/Movies/PREVIEW-Matrix.mp4"
                  type="video/mp4"
                  sizes="720"
                ></source>
              </video> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
