import React from "react";

const Section = ({ children, btn1, btn2 }) => {
  return (
    <div className="section">
      <section className="py-[5px]">
        <div className="flex items-center gap-5">
          <div className="btnContainer">
            {btn1}
            {btn2}
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="inline-flex">{children}</div>
        </div>
      </section>
    </div>
  );
};

export default Section;
