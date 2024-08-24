import React from "react";
import { Stats } from "@/components/component/stats";

const Statsection = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-6xl font-bold mt-8 dark:text-white mb-10">
        Ventura Stats
      </h1>
      <Stats />
    </div>
  );
};

export default Statsection;
