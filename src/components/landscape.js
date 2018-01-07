import React from "react";

const Landscape = ({ collection }) => {
  if (!Array.isArray(collection) || collection.length === 0)
    return <div>No image</div>;
  const images = collection.map((image, index) => (
    <img src={image} key={index} />
  ));
  return <div className="video-list media">{images}</div>;
};

export default Landscape;
