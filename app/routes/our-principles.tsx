import type { MetaFunction } from "@remix-run/node";
import React from "react";
import BackgroundImage from "~/components/Blocks/BackgroundImage";
import Principles from "~/components/Pages/Frontend/Home/Principles";
import QuickQuoteBanner from "~/components/Pages/Frontend/Home/QuickQuoteBanner";
import useSlideUp from "~/hooks/useSlideUp";

export const meta: MetaFunction = () => [{ title: "Our Principles" }];

const OurPrinciples: React.FC = () => {
  const [h1Ref, h1Visible] = useSlideUp<HTMLDivElement>();
  const [h2Ref, h2Visible] = useSlideUp<HTMLDivElement>();
  const [pRef, pVisible] = useSlideUp<HTMLDivElement>();

  return (
    <div>
      <BackgroundImage image="/assets/truck_and_trailer.jpg" size="sm">
        <div className="text-white text-center">
          <h1
            ref={h1Ref}
            className={`text-4xl font-semibold slide-up ${h1Visible ? "show" : ""}`}
          >
            Our Principles
          </h1>
        </div>
      </BackgroundImage>
      <div>
        <div className="flex w-full md:max-w-7xl md:mx-auto pt-16 pb-12 px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 my-auto">
              <h2
                ref={h2Ref}
                className={`text-4xl font-semibold text-stone-800 w-full slide-up ${h2Visible ? "show" : ""}`}
              >
                Your Horse&apos;s <span className="text-primary font-semibold">Safe Passage</span>
              </h2>
            </div>
            <div className="w-full md:w-1/2 my-auto">
              <p
                ref={pRef}
                className={`text-stone-500 w-full slide-up ${pVisible ? "show" : ""}`}
              >
                Our purpose is to bring your horse home with personalized
                service and the utmost safety. Whether it&apos;s Race or Ranch, Old
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