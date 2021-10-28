import React, { useContext } from "react";

const Wrapper = ({
  children,
  style = "h-1/2",
  close,
}: {
  children: React.ReactNode;
  style?: string;
  close?: () => void;
}) => {
  return (
    <div
      className={`min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-40 outline-none focus:outline-none bg-no-repeat bg-center bg-cover ${style}`}
      id="modal-id"
    >
      <div
        onClick={close}
        className="absolute cursor-pointer inset-0 z-0"
      ></div>
      <div className="w-full  max-w-sm border-2 bg-gray-200  border-gray-500 relative mx-auto my-auto rounded-xl shadow-lg   ">
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
