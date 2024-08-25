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
  title: string;
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
              words={["AVAX", "Safe", "Secure"]}
            />
          </div>
        </div>
      </AuroraBackground>

      <Statsection />

      <div className="flex flex-col flex-grow">
        <h1 className="text-6xl font-bold text-center mt-8 mb-10 text-white">
          Recommended Startups
        </h1>
        <div className="flex flex-wrap gap-4 px-4 justify-center">
          {campaigns
            .filter((_, index) => index !== 2) // Hide index 2
            .slice(0, 4) // Show till index 5
            .map((campaign, index) => (
              <CardContainer key={index} className="inter-var">
                <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-zinc-800 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-600 dark:text-white"
                  >
                    {campaign.title}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    {campaign.description.substring(0, 50)}...
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <Image
                      src={campaign.image}
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
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
