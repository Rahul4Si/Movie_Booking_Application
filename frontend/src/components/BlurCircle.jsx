import React from "react";

const BlurCircle = ({ top, left, right, bottom }) => {
  const positionStyle = {
    top: top || "auto",
    left: left || "auto",
    right: right || "auto",
    bottom: bottom || "auto",
  };

  return (
    <div
      className="absolute -z-50 h-58 w-58  aspect-square rounded-full bg-pink-800/50 blur-3xl"
      style={positionStyle}
    ></div>
  );
};

export default BlurCircle;
