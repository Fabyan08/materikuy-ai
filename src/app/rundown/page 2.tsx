"use client";

import Ripple from "@/components/ripple";

export default function GenerateMateri() {
  return (
    <div className="relative flex px-4 md:px-0 w-full overflow-hidden text-white">
      <div className="flex justify-center items-center h-[70vh]">
        <Ripple />
      </div>
      <div className="flex items-center justify-center w-full mt-10 h-screen">
        <div className="bg-white/20 backdrop-blur-sm md:w-[90vw] w-[100vw] h-[600px] md:h-[80vh] flex justify-center items-center">
          <div className="bg-white backdrop-blur-sm md:w-[85vw] w-[90vw] h-[500px] md:h-[75vh]">
            
          </div>
        </div>
      </div>
    </div>
  );
}
