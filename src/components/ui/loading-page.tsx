import React from "react";
import { useLottie } from "lottie-react";
import loadingAnimation from "@/animations/loading-page.json";

export default function LoadingPage(){
  const options = {
    animationData: loadingAnimation,
    loop: true
  };

  const { View } = useLottie(options);

  return <div className={`
        fixed 
        w-[100vw] 
        h-[100vh] 
        bg-[rgba(241,245,249,0.5)] 
        backdrop-blur-sm
        flex 
        items-center 
        justify-center
        z-[999]
    `}>
        <div className="w-[200px]">
            { View }
        </div>
  </div>;
};