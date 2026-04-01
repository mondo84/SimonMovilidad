import React from "react";
import HeaderPage from "../components/HeaderPage/HeaderPage";

const LayoutApp = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <HeaderPage />
      <div className="bg-black/40 p-2 h-[calc(100vh-56px)] overflow-auto">
        {children}
      </div>
    </>
  );
};

export default LayoutApp;
