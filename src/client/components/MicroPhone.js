
"use client";

// import { FaMicrophone } from "react-icons/fa";
import { IoMicOutline } from "react-icons/io5";

export const MicroPhone = ({ isSpeaking, color="border-red-500" }) => {
   return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Mic Icon */}
      <IoMicOutline className="text-gray-700 z-10" size={40} />

      {/* Wave circles */}
      <div
        className={`absolute rounded-full border-2 ${color} ${isSpeaking ? "w-20 h-20 animate-ping" : "w-0 h-0"} transition-all duration-300`}
      ></div>
      <div
        className={`absolute rounded-full border-2 ${color} ${isSpeaking ? "w-24 h-24 animate-ping delay-300" : "w-0 h-0"} transition-all duration-300`}
      ></div>
      <div
        className={`absolute rounded-full border-2 ${color} ${isSpeaking ? "w-28 h-28 animate-ping delay-600" : "w-0 h-0"} transition-all duration-300`}
      ></div>
    </div>
  );
}