import { useLocation } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const scanResults = location.state?.scanResults || "NO RESULTS FOUND";
  return (
    <>
      <div className="background-glow dark:bg-[#0D121C] w-full">
        <div className="max-w-7xl mx-auto flex flex-col min-h-screen">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white p-4 mt-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-left">
                {scanResults && JSON.stringify(scanResults, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
