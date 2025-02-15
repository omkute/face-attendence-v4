import React from "react";

function AverageAttendence({ year, percentage, handleYearClick }) {
    
  return (
    <section
      onClick={handleYearClick}
      className={`cursor-pointer lg:min-w-[4rem] min-w-[4rem] lg:max-w-[23%] h-[200px] bg-secondary border-2 border-primary shadow-xl p-3 rounded-lg  flex flex-col`}
    >
      <div className="">
        <p className="text-2xl font-thin break-words">
          <span className="text-red-300 ">{year}</span> Year <br /> Class
          Attendance
        </p>
      </div>
      <div className="flex items-center justify-center h-[50%]">
        <p className={`text-5xl font-extrabold ${percentage <= 50 ? "text-red-300" : "text-primary"}`}>{Math.floor(percentage)}%</p>
      </div>
    </section>
  );
}

export default AverageAttendence;
