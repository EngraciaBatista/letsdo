import React from "react";
import "./TickIcon.css"; // Ensure to import your CSS for styling

const TickIcon = () => {
  return (
    <svg
      className="tick"
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 512 512"
    >
      <title>Tick Icon</title>
      <circle
        cx="256"
        cy="256"
        r="208"
        fill="none"
        stroke="#000"
        strokeWidth="32"
      />
      <path
        d="M369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0l111-111z"
        fill="none"
        stroke="#000"
        strokeMiterlimit="10"
        strokeWidth="32"
      />
    </svg>
  );
};

export default TickIcon;
