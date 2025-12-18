import React from "react";
import slider1 from "../../assets/slider1.JPG"; // your image
import slider2 from "../../assets/slider2.JPG";
import slider3 from "../../assets/slider3.JPG";
import slider4 from "../../assets/slider4.JPG";
import slider5 from "../../assets/slider5.JPG";
import slider6 from "../../assets/slider6.JPG";
import slider7 from "../../assets/slider7.JPG";

export default function LogoSlider() {
  const logos = [slider1, slider2, slider3, slider4, slider5, slider6, slider7];

  return (
    <div className="w-full py-10 overflow-hidden bg-white">
      <div className="mb-20 text-center">
        <p className="text-gray-900 mb-10 leading-snug font-bold text-3xl md:text-4xl">
          Trusted by 1000+ CA firms and enterprise finance teams {" "}
          <br className="hidden md:block" />
           for high-volume processing.
        </p>
      </div>
      <div className="slider-track">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`logo-${index}`}
            className="h-24 w-auto object-contain mx-10 inline-block"
          />
        ))}

        {/* Duplicate for smooth infinite loop */}
        {logos.map((logo, index) => (
          <img
            key={`dup-${index}`}
            src={logo}
            alt={`logo-duplicate-${index}`}
            className="h-24 w-auto object-contain mx-10 inline-block"
          />
        ))}
      </div>
    </div>
  );
}
