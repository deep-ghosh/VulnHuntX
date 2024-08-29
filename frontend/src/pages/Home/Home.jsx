import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import "./Home.css"; // Import the CSS file for styling

const Home = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [url, setUrl] = useState("");
  const [scanResults, setScanResults] = useState(""); // New state to store scan results

  const isValidUrl = (url) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(url);
  };

  const handleScan = async () => {
    if (url && isValidUrl(url)) {
      setErrorMessage(""); // Clear any previous error message
      setSuccessMessage(""); // Clear any previous success message
      setScanResults(""); // Clear previous scan results

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

        // Handle the response data and show FFuf results
        console.log("Scan result:", data.result);
        setScanResults(data.result); // Save FFuf results
        setSuccessMessage(
          "Scan completed successfully! Results are displayed below."
        );

        // Automatically hide the success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000); // 5000 milliseconds = 5 seconds

        setUrl(""); // Clear the input field
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setErrorMessage(
          "An error occurred while scanning the URL. Please try again."
        );
      }
    } else {
      setErrorMessage("Invalid URL");
      setTimeout(() => {
        setErrorMessage(""); // Clear the error message after 5 seconds
      }, 5000); // 5000 milliseconds = 5 seconds
    }
  };

  const handleChange = (event) => {
    setUrl(event.target.value);
    setErrorMessage(""); // Clear the error message when user types a new URL
    setSuccessMessage(""); // Clear the success message when user types a new URL
  };

  return (
    <>
      <div className="background-glow dark:bg-[#0D121C] w-full">
        <div className="max-w-7xl mx-auto flex min-h-screen ">
          <div className="flex flex-col lg:flex-row items-center h-fit mt-10 lg:gap-6 ">
            <div className=" p-6 md:p-10 space-y-8 duration-200 w-full lg:w-1/2 h-fit">
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-light dark:text-white header-glow">
                  Your Website Truly Safe?
                </h2>
                <h2 className="text-5xl md:text-6xl font-bold text-neutral-900 dark:text-white">
                  Expose Weak Spots and Uncover Risks Within Seconds!
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
              {successMessage && (
                <div className="text-green-500 font-semibold text-center mt-4">
                  {successMessage}``
                </div>
              )}
              {errorMessage && (
                <div className="text-red-500 font-semibold text-center mt-4">
                  {errorMessage}
                </div>
              )}
              {/* Display scan results here */}
              {scanResults && (
                <div className="bg-gray-200 dark:bg-gray-800 p-4 mt-4 rounded-lg">
                  <pre className="whitespace-pre-wrap text-left">
                    {scanResults}
                  </pre>
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
    </>
  );
};

export default Home;
