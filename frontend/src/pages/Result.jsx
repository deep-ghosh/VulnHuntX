import { useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/Animation/animation.json";
import animationData2 from "../assets/Animation/animation3.json";
import animationDataHigh from "../assets/Animation/animationHigh.json";

const Result = () => {
  const location = useLocation();
  const scanResults = location.state?.scanResults || null;

  return (
    <div className="dark:bg-[#020300] w-full min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="mt-10 w-full flex gap-6">
          {/* 1st box with scan results*/}
          <div className="w-full">
            <h1 className="text-2xl font-mono font-light text-gray-800/80 dark:text-white/70 text-center duration-100 border-l-4 hover:border-r-4 border-orange-800/80 p-4">
              Critical Risks Endpoint
            </h1>
            <div className="p-4 rounded-3xl w-full flex items-center justify-center">
              <Lottie
                loop
                animationData={animationDataHigh}
                style={{ width: "360px", height: "360px" }} // Adjust size as needed
              />
              <div className="text-center absolute">
                <p className="text-gray-800 dark:text-white text-5xl">
                  {scanResults ? scanResults.results.length : 0}
                </p>
                <h1 className="dark:text-white font-light">
                  Total Vulnerabilities
                </h1>
              </div>
            </div>
          </div>
          {/* 2nd box with scan results*/}
          <div className="w-full">
            <h1 className="text-2xl font-mono font-light text-gray-800/80 dark:text-white/70 text-center duration-100 border-b-4 border-blue-800/80 p-4">
              Medium Risks Endpoint
            </h1>
            <div className="p-4 rounded-3xl w-full flex items-center justify-center">
              <Lottie
                loop
                animationData={animationData}
                style={{ width: "360px", height: "360px" }}
              />
              <div className="text-center absolute">
                <p className="text-gray-800 dark:text-white text-5xl">
                  wordlist.txt
                </p>
                <h1 className="dark:text-white font-light">Wordlist Used</h1>
              </div>
            </div>
          </div>

          {/* 3rd box with scan results*/}
          <div className="w-full">
            <h1 className="text-2xl font-mono font-light text-gray-800/80 dark:text-white/70 text-center duration-100 border-r-4 hover:border-l-4 border-emerald-800/80 p-4">
              Low Risks Endpoint
            </h1>
            <div className="p-4 rounded-3xl w-full flex items-center justify-center">
              <Lottie
                loop
                animationData={animationData2}
                style={{ width: "360px", height: "360px" }}
              />
              <div className="text-center absolute">
                <p className="text-gray-800 dark:text-white text-5xl">
                  {scanResults ? scanResults.results.length : 0}
                </p>
                <h1 className="dark:text-white font-light">
                  Total Vulnerabilities
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Section */}
        <div className="flex gap-6 w-full mt-10">
          {/* Scanning High Vulnerability Points */}
          <div>
            <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white/70">
              Scan Results Dashboard
            </h1>
            <div className="p-6 rounded-3xl shadow-md bg-gray-100 dark:bg-gray-800/40 w-full">
              <h2 className="text-xl font-bold mb-4 dark:text-white">
                Scanned High Vulnerability Points
              </h2>
              {scanResults &&
              scanResults.results &&
              scanResults.results.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-300 dark:border-gray-700 dark:text-white">
                      <th className="p-4">URL</th>
                      <th className="p-4">Response Code</th>
                      <th className="p-4">Content Length</th>
                      <th className="p-4">Words</th>
                      <th className="p-4">Lines</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scanResults.results.map((result, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 dark:border-gray-700 dark:text-white"
                      >
                        <td className="p-4">{result.url}</td>
                        <td className="p-4">{result.status}</td>
                        <td className="p-4">{result.length}</td>
                        <td className="p-4">{result.words}</td>
                        <td className="p-4">{result.lines}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-800 dark:text-white">
                  No vulnerabilities found.
                </p>
              )}
            </div>
          </div>

          {/* Wordlists and Fuzzing Details */}
          {/* <div className="w-full h-fit">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white/70 text-right">
              Fuzzing Details
            </h1>
            <div className="p-10 rounded-3xl bg-gray-100/60 dark:bg-gray-800/50 w-full h-96 bg-cover bg-center flex items-center justify-center">
              <Lottie
                loop
                animationData={animationData}
                style={{ width: "300px", height: "300px" }}
              />
              <div className="text-center">
                <p className="text-gray-800 dark:text-white">
                  <strong>Wordlist Used:</strong> wordlist.txt
                </p>
                <p className="text-gray-800 dark:text-white">
                  <strong>Total Requests:</strong>{" "}
                  {scanResults ? scanResults.results.length : 0}
                </p>
                <p className="text-gray-800 dark:text-white">
                  <strong>Total Vulnerabilities:</strong>{" "}
                  {scanResults ? scanResults.results.length : 0}
                </p>
              </div>
            </div>
          </div> */}

          <div className="w-full h-fit">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white/70 text-right">
              Fuzzing Details
            </h1>
            <div
              // style={{
              //   backgroundImage:
              //     "url('https://i.pinimg.com/originals/f8/77/a3/f877a37a56f155dccc060330c17e1851.gif')",
              // }}
              className="p-10 rounded-3xl bg-gray-100/60 dark:bg-gray-800/50 w-full h-96 bg-cover bg-center flex items-center justify-center"
            >
              <div className="text-center">
                {/* <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                  Fuzzing Details
                </h2> */}
                <p className="text-gray-800 dark:text-white">
                  <strong>Wordlist Used:</strong> wordlist.txt
                </p>
                <p className="text-gray-800 dark:text-white">
                  <strong>Total Requests:</strong>{" "}
                  {scanResults ? scanResults.results.length : 0}
                </p>
                <p className="text-gray-800 dark:text-white">
                  <strong>Total Vulnerabilities:</strong>{" "}
                  {scanResults ? scanResults.results.length : 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
