import React, { ReactNode } from "react";

interface containerProps {
  children: ReactNode;
  className: string;
}

function MainContainer({ children, className }: containerProps) {
  return (
    <div className=" z-10 sm:px-12 px-5">
      <div className={`max-w-330 mx-auto ${className}`}>{children}</div>
    </div>
  );
}

export default MainContainer;
