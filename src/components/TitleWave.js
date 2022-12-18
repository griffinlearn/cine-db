import React from "react";

const TitleWave = ({ title }) => {
  return (
    <div className="titleWave">
      <div class="row">
        <div class="col-md-12 text-center">
          <h3 class="animate-charcter">{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default TitleWave;
