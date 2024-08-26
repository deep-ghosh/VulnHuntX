import { Outlet } from "react-router-dom";
import Header from "./components/Header";
// import FooterSection from "./components/FooterSection";
import { Suspense } from "react";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      {/* <FooterSection /> */}
    </>
  );
};

export default RootLayout;
