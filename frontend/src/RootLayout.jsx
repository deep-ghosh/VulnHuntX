import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Suspense, useState, useEffect } from "react";
import Loading from "./components/Loading/Loading";

const RootLayout = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Show loading screen for at least 5 seconds
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1000); // 1 seconds

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      {showLoading && <Loading />}
      <Suspense
        fallback={<div>Loading...</div>} // Optional fallback for Suspense
      >
        <Outlet />
      </Suspense>
    </>
  );
};

export default RootLayout;
