import React from "react";
import type { MetaFunction } from "@remix-run/node";
import BackgroundImage from "~/components/Blocks/BackgroundImage";
import Principles from "~/components/Pages/Home/Principles";
import QuickQuoteBanner from "~/components/Pages/Home/QuickQuoteBanner";

export const meta: MetaFunction = () => [{ title: "Our Principles" }];

const OurPrinciples: React.FC = () => {
  return (
    <div>
      <BackgroundImage image="/assets/truck_and_trailer.jpg" size="sm">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold">Our Principles</h1>
        </div>
      </BackgroundImage>
      <div>
        <div className="flex w-full md:max-w-7xl md:mx-auto pt-16 pb-12 px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 my-auto">
              <h2 className="text-4xl font-semibold text-stone-800 w-full">
                Your Horse's Safe Passage
              </h2>
            </div>
            <div className="w-full md:w-1/2 my-auto">
              <p className="text-stone-500 w-full">
                Our purpose is to bring your horse home with personalized
                service and the utmost safety. Whether it's Race or Ranch, Old
                Friend or New Ride, at Winner Circle Transport, we know that
                your horse represents the thrill of racing, the anticipation of
                competition, and the comfort of companionship! We love bringing
                your horse home!
              </p>
            </div>
          </div>
        </div>
        <div className="py-12">
          <Principles />
        </div>
        <div className="pt-12">
          <QuickQuoteBanner />
        </div>
      </div>
    </div>
  );
};

export default OurPrinciples;
