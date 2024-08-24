import React from "react";
import Link from "next/link";

const About: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white px-6 py-12"
      style={{
        backgroundImage:
          "linear-gradient(rgba(26, 26, 26, 0.7), rgba(26, 26, 26, 0.7)), url('bg-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      <h1 className="text-4xl font-bold mb-4 text-center">About Venturâ</h1>
      <p className="text-lg max-w-3xl text-center mb-8">
        Venturâ is an innovative platform aimed at empowering startups and
        entrepreneurs. We believe in creating opportunities for ideas to turn
        into reality by providing access to loans, resources, and a supportive
        community. Whether you're a startup founder looking for funding, or a
        lender ready to support groundbreaking ventures, Venturâ is here to
        connect you with the right opportunities.
      </p>

      <p className="text-lg max-w-3xl text-center mb-8">
        Our platform is designed to offer seamless navigation, transparent
        information, and an inclusive approach to entrepreneurship. Join us on
        this exciting journey of innovation and growth.
      </p>

      <Link href="/" prefetch={false}>
        <button className="bg-[#00d8ff] text-[#1a1a1a] font-medium px-6 py-3 rounded-md hover:bg-[#00b8e6] transition-colors">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default About;
