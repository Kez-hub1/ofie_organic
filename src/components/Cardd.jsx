import React from "react";

export function Cardd({ children, className }) {
  return (
    <div className={`bg-white shadow-md rounded-2xl ${className}`}>
      {children}
    </div>
  );
};
