import React from "react";

const Landscape = ({ collection, city }) => {
  if (!Array.isArray(collection) || collection.length === 0) return <div />;
  const images = collection.map((image, index) => (
    <img src={image} key={index} alt={"Locate in " + city} />
  ));
  return <div className="video-list media">{images}</div>;
};

export default Landscape;
