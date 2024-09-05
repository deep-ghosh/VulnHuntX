import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../assets/Animation/animation.json";
import animationData2 from "../assets/Animation/animation3.json";
import animationDataHigh from "../assets/Animation/animationHigh.json";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scanResults = location.state?.scanResults || null;

  // Redirect to the homepage after 1 minute
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/"); // Redirect to home page after 1 minute
    }, 60000); // 60 seconds

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  // Dummy data from the image
  const breachData = [
    {
      source: "Cutout.pro",
      username: "Soumyadeep Dutta",
      ip: "203.171.240.117",
      date: "2024-02",
    },
    {
      source: "Cutout.pro",
      username: "MINAL PAREEK",
      ip: "103.193.90.218",
      date: "2024-02",
    },
    {
      source: "Cutout.pro",
      username: "SATYAJIT SAMANTA",
      ip: "",
      date: "2024-02",
    },
    {
      source: "Cutout.pro",
      username: "MassComm Journalism",
      ip: "",
      date: "2024-02",
    },
    {
      source: "Cutout.pro",
      username: "Souvik Sur",
      ip: "203.171.240.117",
      date: "2024-02",
    },
    {
      source: "Cutout.pro",
      username: "Indranil Sarkar",
      ip: "152.58.181.235",
      date: "2024-02",
    },
    {
      source: "Unknown",
      username: "@Sartha***",
      ip: "",
      date: "",
    },
    {
      source: "Unknown",
      username: "1967@C***",
      ip: "",
      date: "",
    },
    {
      source: "Unknown",
      username: "Sayantan@****",
      ip: "",
      date: "",
    },
    {
      source: "Unknown",
      username: "@Seuni**",
      ip: "",
      date: "",
    },
    {
      source: "Unknown",
      username: "L2X257vCYb*****",
      ip: "",
      date: "",
    },
    {
      source: "Unknown",
      username: "201121800****",
      ip: "",
      date: "",
    },
    {
      source: "Unknown",
      username: "Rohit@***",
      ip: "",
      date: "",
    },
    {
      source: "Unknown",
      username: "Chessbas****",
      ip: "",
      date: "",
    },
  ];

  return (
    <div className="dark:bg-[#020300] w-full min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="mt-10 w-full flex gap-6">
          {/* Existing components */}
          <div className="w-full">
            {/* Critical Risks */}
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
                  {/* {scanResults ? scanResults.results.length : 0} */}7
                </p>
                <h1 className="dark:text-white font-light">
                  Total Vulnerabilities
                </h1>
              </div>
            </div>
          </div>

          <div className="w-full">
            {/* Medium Risks */}
            <h1 className="text-2xl font-mono font-light text-gray-800/80 dark:text-white/70 text-center duration-100 border-b-4 border-blue-800/80 p-4">
              {/* Medium Risks Endpoint */}
              Breach Details
            </h1>
            <div className="p-4 rounded-3xl w-full flex items-center justify-center">
              <Lottie
                loop
                animationData={animationData}
                style={{ width: "360px", height: "360px" }}
              />
              <div className="text-center absolute">
                <p className="text-gray-800 dark:text-white text-5xl">6</p>
                <h1 className="dark:text-white font-light">
                  Total Breach Details
                </h1>
              </div>
            </div>
          </div>

          <div className="w-full">
            {/* Low Risks */}
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

          {/* Fuzzing Details */}
          <div className="w-full h-fit relative flex flex-col">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white/70 text-right">
              Fuzzing Details
            </h1>
            <div className="p-10 rounded-3xl bg-gray-100/60 dark:bg-gray-800/50 w-full h-96 bg-cover bg-center flex items-center justify-center">
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

            {/* Table added to the bottom-right of the page */}
            <div className="relative bottom-0 right-0 mb-10 mr-10 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold dark:text-white mb-4">
                Breach Details
              </h2>
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-white uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Source</th>
                    <th className="py-3 px-6 text-left">Username</th>
                    <th className="py-3 px-6 text-left">IP</th>
                    <th className="py-3 px-6 text-left">Date</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-200 text-sm">
                  {breachData.map((data, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <td className="py-3 px-6 text-left">{data.source}</td>
                      <td className="py-3 px-6 text-left">{data.username}</td>
                      <td className="py-3 px-6 text-left">{data.ip}</td>
                      <td className="py-3 px-6 text-left">{data.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
