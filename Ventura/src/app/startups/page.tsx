"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconBrandTabler, IconUserBolt } from "@tabler/icons-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useStateContext } from "@/context";
import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners"; // Import the spinner
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

interface Campaign {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: Date;
  amountCollected: string;
  image: string;
  video: string;
  donations: { funderAddress: string; amount: string }[];
  pId: number;
}

export default function SidebarDemo() {
  const { address, getCampaigns } = useStateContext(); // Extract getCampaigns from the context
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [open, setOpen] = useState(false);
  const [filterMyCampaigns, setFilterMyCampaigns] = useState(false); // New state for filtering campaigns
  const [loading, setLoading] = useState(true); // State for managing loading

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true); // Start loading
      const fetchedCampaigns: Campaign[] = await getCampaigns();
      if (filterMyCampaigns) {
        setCampaigns(
          fetchedCampaigns.filter((campaign) => campaign.owner === address)
        );
      } else {
        setCampaigns(fetchedCampaigns);
      }
      setLoading(false); // Stop loading
    };

    fetchCampaigns();
  }, [getCampaigns, filterMyCampaigns, address]); // Depend on filterMyCampaigns and address

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-[90vh]"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mt-8 flex flex-col gap-4">
              <button
                onClick={() => setFilterMyCampaigns(false)}
                className={cn(
                  "flex items-center gap-2 transition-all duration-200",
                  open ? "justify-start" : "justify-center",
                  filterMyCampaigns === false
                    ? "text-[#00d8ff] scale-105"
                    : "text-neutral-700 dark:text-neutral-200",
                  open ? "ms-4" : ""
                )}
              >
                <IconBrandTabler className=" h-5 w-5 flex-shrink-0" />
                <motion.span
                  animate={{
                    display: open ? "inline-block" : "none",
                    opacity: open ? 1 : 0,
                  }}
                  className=" text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
                >
                  All Startups
                </motion.span>
              </button>
              <button
                onClick={() => setFilterMyCampaigns(true)}
                className={cn(
                  "flex items-center gap-2 transition-all duration-200",
                  open ? "justify-start" : "justify-center",
                  filterMyCampaigns === true
                    ? "text-[#00d8ff] scale-105"
                    : "text-neutral-700 dark:text-neutral-200",
                  open ? "ms-4" : ""
                )}
              >
                <IconUserBolt className=" h-5 w-5 flex-shrink-0" />
                <motion.span
                  animate={{
                    display: open ? "inline-block" : "none",
                    opacity: open ? 1 : 0,
                  }}
                  className=" text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
                >
                  My Startups
                </motion.span>
              </button>
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: address.substring(0, 25) + "...",
                href: "#",
                icon: (
                  <Image
                    src="/metamask.webp"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard
        campaigns={campaigns}
        filterMyCampaigns={filterMyCampaigns}
        loading={loading}
      />
    </div>
  );
}

// Dashboard component to display the fetched campaigns
const Dashboard = ({
  campaigns,
  filterMyCampaigns,
  loading,
}: {
  campaigns: Campaign[];
  filterMyCampaigns: boolean;
  loading: boolean;
}) => {
  const { fundStartup, address, withdrawStartupFunds } = useStateContext();
  const [viewDetails, setViewDetails] = useState(false);
  const [fundAmount, setFundAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-1">
      <div className="p-2 md:pt-10 md:px-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-6 flex-1 w-full h-full">
        <div className="flex justify-between">
          <h2 className="dark:text-white text-5xl font-semibold">
            {filterMyCampaigns ? "My Startups" : "All Startups"}
          </h2>
          <Link href="/startups/create-startup">
            <Button className="bg-[#00d8ff] py-2 px-4 rounded-lg text-black">
              Create Startup
            </Button>
          </Link>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto noscroll"
          style={{ maxHeight: "90vh" }}
        >
          {isLoading ? ( // Show spinner when loading
            <div className="flex justify-center items-center w-full h-full">
              <ClipLoader size={50} color="#00d8ff" />
            </div>
          ) : campaigns.length > 0 ? (
            campaigns.map((campaign, idx) => {
              // State to track if the details view is open

              const videoId = campaign.video.split("=").pop();
              const embedUrl = `https://www.youtube.com/embed/${videoId}`;

              // Calculate days remaining
              const currentDate = new Date();
              const deadlineDate = new Date(campaign.deadline);
              const timeDifference =
                deadlineDate.getTime() - currentDate.getTime();
              const daysRemaining = Math.ceil(
                timeDifference / (1000 * 3600 * 24)
              );

              return (
                <Card key={idx}>
                  <Image
                    className="aspect-video object-cover rounded-t-lg"
                    src={campaign.image}
                    width={500}
                    height={500}
                    alt={`${idx}`}
                  />
                  {/* Progress bar*/}
                  <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-600">
                    <div
                      className="h-1 bg-green-600"
                      style={{
                        width: `${Math.min(
                          (1.25 / parseFloat(campaign.target)) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <CardHeader>
                    <CardTitle className="mb-1">{campaign.title}</CardTitle>
                    <CardDescription>{campaign.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Target: {campaign.target} ETH</p>
                    <p>Amount Collected: {campaign.amountCollected} ETH</p>
                    <p>
                      {viewDetails ? (
                        daysRemaining > 0 ? (
                          `Days Remaining: ${daysRemaining} days`
                        ) : (
                          <span className="text-red-500">Date Over</span>
                        )
                      ) : (
                        `Deadline: ${deadlineDate.toLocaleDateString()}`
                      )}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Dialog onOpenChange={(isOpen) => setViewDetails(isOpen)}>
                      <DialogTrigger asChild>
                        <Button className="w-32">View Details</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <iframe
                            src={embedUrl}
                            className="aspect-video rounded-lg mb-5"
                          />
                          <DialogTitle className="text-center font-sans">
                            <span className="text-2xl">{campaign.title}</span>
                            <p className="text-lg font-medium">
                              {campaign.description}
                            </p>
                          </DialogTitle>
                        </DialogHeader>
                        <DialogDescription className="space-y-4 text-left text-neutral-800 dark:text-neutral-300">
                          <div className="flex flex-col space-y-2">
                            {/* Amount Collected */}
                            <div className="flex flex-col items-start">
                              <p className="font-sans text-4xl font-bold">
                                {campaign.amountCollected} ETH
                              </p>
                              <p className="font-sans text-sm text-neutral-500 mb-1">
                                collected of {campaign.target} ETH goal
                              </p>
                            </div>

                            {/* Progress Bar */}
                            <div className="flex items-center">
                              <div className="flex-1 h-5 bg-neutral-200 dark:bg-neutral-600 rounded-md overflow-hidden">
                                <div
                                  className="h-5 bg-green-500"
                                  style={{
                                    width: `${Math.min(
                                      (1.25 / parseFloat(campaign.target)) *
                                        100,
                                      100
                                    )}%`,
                                  }}
                                ></div>
                              </div>
                            </div>

                            {/* Days Remaining */}
                            {daysRemaining > 0 ? (
                              <div className="flex flex-col items-start">
                                <p className="font-sans text-5xl font-bold mt-2">
                                  {daysRemaining}
                                </p>
                                <p className="font-sans text-sm text-neutral-500">
                                  days to go
                                </p>
                              </div>
                            ) : (
                              <p className="font-sans text-4xl font-bold text-red-500">
                                Date Over
                              </p>
                            )}
                          </div>
                        </DialogDescription>

                        <DialogFooter className="flex flex-col items-start space-y-4">
                          {campaign.owner === address ? (
                            <Button
                              className="w-32"
                              onClick={() => {
                                withdrawStartupFunds(campaign.pId);
                              }}
                            >
                              Withdraw Funds
                            </Button>
                          ) : (
                            <Popover>
                              <PopoverTrigger>
                                <Button className="w-32">Fund</Button>
                              </PopoverTrigger>
                              <PopoverContent>
                                <Label htmlFor="amount">
                                  Amount to fund (ETH)
                                </Label>
                                <Input
                                  id="amount"
                                  type="text"
                                  placeholder="Enter amount"
                                  className="mb-2"
                                  // Bind the input to the state
                                  onChange={(e) =>
                                    setFundAmount(e.target.value)
                                  }
                                />
                                <Button
                                  onClick={async () => {
                                    setIsLoading(true);
                                    try {
                                      await fundStartup(
                                        campaign.pId,
                                        fundAmount
                                      );
                                      alert("Loan funded successfully!");
                                    } catch (error) {
                                      console.error(
                                        "Failed to lend loan",
                                        error
                                      );
                                      alert("Failed to lend loan");
                                    } finally {
                                      setIsLoading(false);
                                    }
                                  }}
                                >
                                  {isLoading ? (
                                    <ClipLoader size={20} color="#fff" />
                                  ) : (
                                    "Proceed"
                                  )}
                                </Button>
                              </PopoverContent>
                            </Popover>
                          )}
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              );
            })
          ) : (
            <p className="dark:text-white text-center">No campaigns found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
