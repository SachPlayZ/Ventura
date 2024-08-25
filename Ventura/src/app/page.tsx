"use client";
import React, { useEffect, useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { FlipWords } from "@/components/ui/flip-words";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import Statsection from "@/components/component/Statsection";
import Footer from "@/components/component/Footer";
import { useStateContext } from "@/context";
import Image from "next/image";

// Define the type for the campaign data
interface Campaign {
  name: string;
  description: string;
  image: string;
}

const Home: React.FC = () => {
  const { getCampaigns } = useStateContext();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const campaignData = await getCampaigns();
      setCampaigns(campaignData);
    };
    fetchCampaigns();
  }, [getCampaigns]);

  return (
    <div className="flex flex-col min-h-screen">
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

      <div className="flex flex-col flex-grow">
        <h1 className="text-6xl font-bold text-center mt-8 text-white">
          Recommended Startups
        </h1>
        <div className="flex flex-wrap gap-4 px-4 justify-center">
          {campaigns.slice(0, 4).map((campaign, index) => (
            <CardContainer key={index}>
              <CardBody className="bg-card rounded-lg shadow-lg p-4">
                <CardItem translateZ="100" className="w-full">
                  <Image
                    src={campaign.image}
                    alt={campaign.name}
                    width={500}
                    height={200}
                    className="object-cover rounded-lg aspect-video mb-4"
                  />
                </CardItem>
                <CardItem className="text-center" translateZ={100}>
                  <h1 className="text-2xl font-bold text-white mb-2">
                    {campaign.name}
                  </h1>
                  <p className="text-white text-center mb-4">
                    {campaign.description}
                  </p>
                </CardItem>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Home;
