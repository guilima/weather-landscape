import React from "react";

const Landscape = ({ collection, city }) => {
  if (!Array.isArray(collection) || collection.length === 0) return <div />;
  const images = collection.map((image, index) => (
    <img src={image} key={index} alt={"Locate in " + city} />
  ));
  return (
    <div className="media-slide">
      <div className="media-slide-arrow arrow-left">
        <button className="btn-arrow" />
      </div>
      <div className="slider">{images}</div>
      <div className="media-slide-arrow arrow-right">
        <button className="btn-arrow" />
      </div>
    </div>
  );
};

export default Landscape;
