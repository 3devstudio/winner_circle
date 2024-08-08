import type { MetaFunction } from "@remix-run/node";
import React from "react";
import BackgroundImage from "~/components/Blocks/BackgroundImage";
import QuickQuoteBanner from "~/components/Pages/Frontend/Home/QuickQuoteBanner";
import Services from "~/components/Pages/Frontend/Home/Services";
import useSlideUp from "~/hooks/useSlideUp";

import AppLayout from "~/layouts/AppLayout";

export const meta: MetaFunction = () => [{ title: "Our Services" }];

const OurServices: React.FC = () => {
  const [titleRef, titleVisible] = useSlideUp<HTMLDivElement>();
  const [h1Ref, h1Visible] = useSlideUp<HTMLDivElement>();
  const [pRef, pVisible] = useSlideUp<HTMLDivElement>();

  return (
    <AppLayout>
      <BackgroundImage image="/assets/IMG_7389.jpg" size="sm">
        <div className="text-white text-center">
          <h1
            ref={titleRef}
            className={`text-4xl font-bold slide-up ${titleVisible ? "show" : ""}`}
          >
            Our Services
          </h1>
        </div>
      </BackgroundImage>
      <div>
        <div className="flex w-full md:max-w-7xl md:mx-auto pt-16 pb-12 px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 my-auto">
              <h2
                ref={h1Ref}
                className={`text-4xl font-semibold text-stone-800 w-full slide-up ${h1Visible ? "show" : ""}`}
              >
                <span className="text-primary">Stress-Free</span> Horse
                Transportation
              </h2>
            </div>
            <div className="w-full md:w-1/2 my-auto">
              <p
                ref={pRef}
                className={`text-stone-500 w-full slide-up ${pVisible ? "show" : ""}`}
              >
                Traveling the lower 48 states, we provide single hauls, large
                volume transports, Charters to shows, moving your farm - we
                specialize in meeting your needs! Whether you&apos;re needing a single
                stall for an experienced traveler, a box stall for a special
                traveler, or room for a mare and baby, we provide a variety of
                stall configurations to meet your needs. We provide:
              </p>
            </div>
          </div>
        </div>
        <div className="py-4">
          <Services />
        </div>
        <div className="pt-12">
          <QuickQuoteBanner />
        </div>
      </div>
    </AppLayout>
  );
};

export default OurServices;