"use client"
import Navbar from "@/components/Navbar";
import React from "react";
import { userinfo } from "@/lib/user";
import { Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import AverageAttendence from "@/components/dashboard/AverageAttendence";
import { useAvgClassAttendance } from "@/hooks/faceAttendence";


function Overview() {
  // console.log("user", userinfo);
  const { avgAttendance, loading, error } = useAvgClassAttendance();


  const getCurrentDate = () => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date().toLocaleDateString("en-US", options);
  };
  

  return (
    <section className=" w-full p-5">
      <div className="w-full bg-secondary rounded-lg p-4  m-0 min-h-[85vh]">
        <div className=" flex gap-2 items-center p-3 justify-center">
          <span className=" text-xl font-semibold font-mono py-6 ">
            {getCurrentDate()}
          </span>
          <Calendar />
        </div>
        <div className=" flex flex-col gap-4 justify-center items-center ">
          <p className=" text-3xl font-thin">Department of</p>
          <p className=" md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-primary ">
            Computer Science & Engineering
          </p>
        </div>
        <hr className=" h-3 mt-5" />
        <section className=" h-[50vh] w-full my-auto mx-auto ">
          <div className=" flex flex-wrap gap-4 mt-9 justify-center items-center h-[100%]">
            <AverageAttendence year="First" percentage={32} />
            <AverageAttendence year="Second" percentage={78} />
            {loading && <p>Loading...</p>}
            {error && <p>Error loading data</p>}
            {avgAttendance !== null && (
              <AverageAttendence year="Third" percentage={avgAttendance} />
            )}
            <AverageAttendence year="Fourth" percentage={49} />
          </div>
        </section>
      </div>
    </section>
  );
}

export default Overview;
