import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import "./Home.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  // Enhanced URL validation function
  const isValidUrl = (inputUrl) => {
    try {
      // Prepend 'https://' if no protocol is provided
      const formattedUrl =
        inputUrl.startsWith("http://") || inputUrl.startsWith("https://")
          ? inputUrl
          : `https://${inputUrl}`;

      // Try creating a new URL object to validate the URL
      new URL(formattedUrl);
      return true;
    } catch {
      return false;
    }
  };

  const handleScan = async () => {
    if (!url || !isValidUrl(url)) {
      setErrorMessage("Invalid URL");
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }

    // Prepend 'https://' if the URL does not start with a protocol
    const formattedUrl =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;

    console.log("Sending URL to backend:", formattedUrl);

    try {
      const response = await fetch(`http://localhost:3000/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: formattedUrl.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      console.log("Scan result:", data.result);

      // Directly navigate with data.result
      navigate("/result", { state: { scanResults: data.result } });

      setUrl(""); // Clear URL input after navigation
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setErrorMessage(
        error.message ||
          "An error occurred while scanning the URL. Please try again."
      );
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  const handleChange = (event) => {
    setUrl(event.target.value);
    setErrorMessage("");
  };

  return (
    <div className="background-glow dark:bg-[#0D121C] w-full">
      <div className="max-w-7xl mx-auto flex flex-col min-h-screen">
        <div className="flex flex-col lg:flex-row items-center h-fit mt-10 lg:gap-6">
          <div className="p-6 md:p-10 space-y-8 duration-200 w-full lg:w-1/2 h-fit">
            <div className="text-center">
              <h2 className="text-3xl md:text-5xl font-light dark:text-white header-glow">
                Is Your Data Truly Safe?
              </h2>
              <h2 className="text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white">
                Expose Weak Spots and Uncover Risks in 12 Seconds!
              </h2>
            </div>
            <div className="flex flex-col lg:flex-row justify-between dark:bg-gray-800 bg-orange-400 rounded-lg space-y-4 lg:space-y-0 p-4">
              <input
                type="text"
                name="domain"
                value={url}
                onChange={handleChange}
                placeholder="Enter website URL"
                className={`w-full rounded-md lg:rounded-s-md lg:rounded-e-none outline-none bg-white placeholder:text-gray-400 placeholder:text-2xl border-none p-4 ${
                  errorMessage ? "border-red-500 border-2 text-red-500" : ""
                }`}
                required
              />
              <button
                type="submit"
                onClick={handleScan}
                className="bg-yellow-300 dark:bg-orange-400 rounded-md lg:rounded-e-md lg:rounded-s-none p-4 text-xl font-medium flex items-center gap-4 justify-center active:scale-95 duration-200"
              >
                <IoSearch className="w-6 h-6" />
                Scan
              </button>
            </div>
            {errorMessage && (
              <div className="text-red-500 font-semibold text-center mt-4">
                {errorMessage}
              </div>
            )}
          </div>
          <div className="lg:w-1/2 bg-gray-100 dark:bg-gray-800 p-6 m-4 rounded-xl">
            <img
              src="https://user-images.githubusercontent.com/40064496/120735130-6c9e2300-c4c0-11eb-8346-94429163466a.gif"
              alt="Data scanning illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
