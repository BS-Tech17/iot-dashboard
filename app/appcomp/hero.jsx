"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Cpu } from "lucide-react";
import Chatbot from "@/components/ui/chatbot";

const Hero = () => {
  const imageRef = useRef(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement?.classList.add("scrolled");
      } else {
        imageElement?.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleImageClick = (e) => {
    e.preventDefault();
    setIsChatbotOpen(true);
  };

  return (
    <div className="pb-6 px-2">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-4 mt-0">
        {/* Left side: Summary card + Carousel */}
        <div className="w-full md:w-3/4 space-y-4">
          {/* Card above carousel with less margin and taller height */}
          <div className="w-full">
            <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white border border-blue-700 shadow-xl px-6 pt-1 pb-8 mt-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl md:text-3xl font-bold">
                  Welcome to the IoT Data Simulator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-100 text-sm md:text-base">
                  Configure virtual IoT sensors, stream real-time data, and export it for analysis. Get started by exploring key features below.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Carousel Section with matching width */}
          <div className="relative w-full p-6 bg-white border border-white rounded-xl shadow-xl">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem>
                  <div className="p-6 bg-white border border-white rounded-xl shadow-xl">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Start Now</h2>
                    <p className="text-gray-600 mb-4">
                      Quickly set up sensors and visualize their data in real time. Swipe to know more.
                    </p>
                    <Link href="/sign-up">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-lg">
                        <Cpu className="mr-2 w-5 h-5" />
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-xl">
                    <h2 className="text-2xl font-bold mb-2 text-gray-900">Sensor Simulation</h2>
                    <p className="text-gray-600">
                      Simulate various sensors such as temperature, humidity, pressure, and more. Customize each sensor's behavior by defining realistic data ranges, output frequency, and the number of devices to emulate. This enables you to create complex, real-time sensor environments without needing any physical hardware.
                    </p>
                  </div>
                </CarouselItem>

                <CarouselItem>
                  <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-xl">
                    <h2 className="text-2xl font-bold mb-2 text-gray-900">Export Options</h2>
                    <p className="text-gray-600">
                      Export data via real-time REST/WebSocket APIs or periodic CSV/JSON downloads.
                    </p>
                  </div>
                </CarouselItem>
              </CarouselContent>

              {/* Carousel arrows on both sides */}
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
          </div>
        </div>

        {/* Right side: Image */}
        <div ref={imageRef} className="w-full md:w-1/2 flex justify-center mt-2">
          <div onClick={handleImageClick} className="cursor-pointer">
            <Image
              src="/image.png"
              width={600}
              height={700}
              alt="IoT Platform Preview"
              priority
              className="rounded-xl transform scale-100 hover:scale-105 transition duration-500 ease-in-out"
            />
          </div>
        </div>
      </div>

      {/* Chatbot Component */}
      <Chatbot 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />
    </div>
  );
};

export default Hero;
