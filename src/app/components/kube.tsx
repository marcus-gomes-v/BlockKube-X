import React from "react";
import { Meteors } from "./ui/meteors";
import { CubeIcon } from "@heroicons/react/20/solid";

export function Kube({title, description}: {title: string, description: string}) {
  return (
    <div className="w-full relative max-w-xs">
      <div className="relative shadow-xl 
        bg-gray-300  border-gray-300
        dark:bg-gray-900 dark:border-gray-800
         border px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">

        <h1 className="flex font-bold text-xl text-gray-500 dark:text-white mb-4 relative z-50 middl gap-2">
          <div className="h-6 w-6 rounded-full border-2 flex items-center justify-center mb-4 border-gray-500">
            <CubeIcon className="h-4 w-4 text-gray-500" />
          </div> 
          <span>
            {title}
          </span>
        </h1>

        <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
          {description}
        </p>

        {/* <button className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">
          Explore
        </button> */}

        {/* Meaty part - Meteor effect */}
        <Meteors number={20} />
      </div>
    </div>
  );
}
