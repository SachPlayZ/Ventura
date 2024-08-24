import { AuroraBackground } from "@/components/ui/aurora-background";
import React from "react";
import { FlipWords } from "@/components/ui/flip-words";
import { CardContainer } from "@/components/ui/3d-card";
import Statsection from "@/components/component/Statsection";

const startups = [
  {
    name: "Tech Innovators",
    description: "Revolutionizing technology with cutting-edge solutions.",
    highlight: "AI & Machine Learning",
  },
  {
    name: "Green Future",
    description: "Sustainable energy solutions for a cleaner tomorrow.",
    highlight: "Renewable Energy",
  },
  {
    name: "Health Plus",
    description: "Improving healthcare with innovative technology.",
    highlight: "HealthTech",
  },
  {
    name: "EduNext",
    description: "Transforming education with digital platforms.",
    highlight: "EdTech",
  },
];

const Home = () => {
  return (
    <div className="flex flex-col">
      <AuroraBackground>
        <div className="container mx-auto flex flex-col justify-center items-center">
          <h1 className="text-6xl md:text-8xl font-bold text-center mb-4 dark:text-white">
            Ventur<span className="text-[#00d8ff]">â</span>
          </h1>
          <div className="flex items-center">
            <h2 className="text-2xl font-medium text-center dark:text-white">
              Invest{" "}
            </h2>
            <FlipWords
              className="text-2xl text-center"
              words={["ETH", "Safe", "Secure"]}
            />
          </div>
        </div>
      </AuroraBackground>
      <Statsection />

      <div className="flex flex-col">
        <h1 className="text-6xl font-bold text-center mt-8 text-white">
          Recommended Startups
        </h1>
        <div className="flex flex-wrap gap-4 px-4 justify-center">
          {startups.map((startup, index) => (
            <CardContainer key={index}>
              <div className="h-96 w-72 bg-card rounded-lg shadow-lg flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold text-white mb-2">
                  {startup.name}
                </h1>
                <p className="text-white text-center mb-4">
                  {startup.description}
                </p>
                <span className="text-[#00d8ff] font-medium">
                  {startup.highlight}
                </span>
              </div>
            </CardContainer>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
