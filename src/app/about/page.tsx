import React from "react";
import Link from "next/link";

const About: React.FC = () => {
  return (
    <div className="relative">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-[-1]"
      >
        <source src="bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* First Section */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-white px-6 py-12">
        {/* Overlay to darken the video */}
        <div className="absolute inset-0 bg-opacity-50"></div>

        {/* Main Content Box */}
        <div className="relative bg-opacity-80 p-10 rounded-lg  max-w-3xl text-center">
          <h1 className="text-4xl font-bold mb-4">About Ventur<span className="text-[#00d8ff]">â</span></h1>
          <p className="text-lg mb-6">
            Venturâ is an innovative platform aimed at empowering startups and
            entrepreneurs.
          </p>

          <p className="text-lg mb-8">
            Our platform is designed to offer seamless navigation, transparent
            information, and an inclusive approach to entrepreneurship. Join us
            on this exciting journey of innovation and growth.
          </p>

          {/* <Link href="/" prefetch={false}>
            <button className="bg-[#00d8ff] text-[#1a1a1a] font-medium px-6 py-3 rounded-md hover:bg-[#00b8e6] transition-colors">
              Back to Home
            </button>
          </Link> */}
        </div>
      </div>

      {/* Second Section */}
      <div className="relative z-10 min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-transparent to-black text-white">
        <div className="relative p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">More About Ventur<span className="text-[#00d8ff]">â</span></h2>
          <p className="text-lg max-w-xl mx-auto">
            Venturâ continues to evolve and innovate in the world of startups.
            We are dedicated to helping entrepreneurs realize their dreams by
            providing them with the resources they need.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
