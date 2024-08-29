import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [url, setUrl] = useState("");
  const [scanResults, setScanResults] = useState("");

  const handleScan = async () => {
    if (url.trim()) {
      setErrorMessage("");
      setSuccessMessage("");
      setScanResults("");

      console.log("Sending URL to backend:", url);

      try {
        const response = await fetch(`http://localhost:3000/search`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: url.trim() }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Network response was not ok: ${errorData.message}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        console.log("Scan result:", data.result);
        setScanResults(data.result);
        setSuccessMessage("Scan completed successfully! Results are displayed below.");

        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);

        setUrl("");
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setErrorMessage(error.message || "An error occurred while scanning the URL. Please try again.");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    } else {
      setErrorMessage("URL cannot be empty");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const handleChange = (event) => {
    setUrl(event.target.value);
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="background-glow dark:bg-[#0D121C] w-full">
      <div className="max-w-7xl mx-auto flex min-h-screen">
        <div className="flex items-center h-fit mt-10 gap-6">
          <div className="p-8 md:p-10 space-y-8 duration-200 w-1/2 h-fit">
            <div className="text-center">
              <h2 className="text-md md:text-5xl font-light dark:text-white header-glow">
                Is Your Data Truly Safe?
              </h2>
              <h2 className="text-5xl md:text-6xl font-bold dark:text-white">
                Expose Weak Spots and Uncover Risks in 12 Seconds!
              </h2>
            </div>
            <div className="flex flex-col md:flex-row justify-between dark:bg-gray-800 bg-orange-400 rounded-lg space-y-4 md:space-y-0 p-4">
              <input
                type="text"
                name="domain"
                value={url}
                onChange={handleChange}
                placeholder="Enter website URL"
                className={`w-full rounded-s-md outline-none bg-white placeholder:text-gray-400 placeholder:text-2xl border-none p-4 ${
                  errorMessage ? "border-red-500 border-2 text-red-500" : ""
                }`}
                required
              />
              <button
                type="submit"
                onClick={handleScan}
                className="bg-yellow-300 dark:bg-orange-400 rounded-e-md p-4 text-xl font-medium flex items-center gap-4"
              >
                <IoSearch className="w-6 h-6" />
                Scan
              </button>
            </div>
            {successMessage && (
              <div className="text-green-500 font-semibold text-center mt-4">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="text-red-500 font-semibold text-center mt-4">
                {errorMessage}
              </div>
            )}
            {scanResults && (
              <div className="bg-gray-200 dark:bg-gray-800 p-4 mt-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-left">
                  {JSON.stringify(scanResults, null, 2)}
                </pre>
              </div>
            )}
          </div>
          <div className="w-1/2 bg-gray-200 dark:bg-gray-800 p-6 rounded-xl">
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
