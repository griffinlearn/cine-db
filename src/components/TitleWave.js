import React from "react";

const TitleWave = ({ title }) => {
  return (
    <div className="titleWave">
      <div className="row">
        <div className="col-md-12">
          <h3>{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default TitleWave;
