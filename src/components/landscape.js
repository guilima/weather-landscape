import React from "react";

const Landscape = ({ collection }) => {
  if (!collection && collection.length === 0) return <div>No image</div>;
  const images = collection.map((image, index) => {
    return <img src={image} key={index} />;
  });
  return <div className="video-list media">{images}</div>;
};

export default Landscape;
