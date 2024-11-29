import type { MetaFunction } from "@remix-run/node";
import React from "react";
import BackgroundImage from "~/components/Blocks/BackgroundImage";
import Equipment from "~/components/Pages/Frontend/Home/Equipment";
import QuickQuoteBanner from "~/components/Pages/Frontend/Home/QuickQuoteBanner";
import useIntersectionObserver from "~/hooks/useIntersectionObserver";

import AppLayout from "~/layouts/AppLayout";

export const meta: MetaFunction = () => [{ title: "Our Equipment" }];

const OurEquipment: React.FC = () => {
  const [h1Ref, h1Visible] = useIntersectionObserver<HTMLDivElement>();
  const [h2Ref, h2Visible] = useIntersectionObserver<HTMLDivElement>();
  const [pRef, pVisible] = useIntersectionObserver<HTMLDivElement>();

  return (
    <AppLayout>
      <BackgroundImage image="/assets/img/hero/unnamed-3.jpg" size="sm">
        <div className="text-white text-center">
          <h1
            ref={h1Ref}
            className={`text-4xl font-semibold slide-up ${
              h1Visible ? "show" : ""
            }`}
          >
            Our Equipment
          </h1>
        </div>
      </BackgroundImage>
      <div>
        <div className="bg-white flex flex-col md:flex-row w-full">
          <div className="w-full md:w-1/2 bg-secondary md:clip-angle-r-sm py-8 md:py-12 px-4">
            <h2
              ref={h1Ref}
              className={`text-2xl md:text-4xl font-semibold text-stone-100 w-full slide-left md:ml-8 text-center md:text-left ${
                h1Visible ? "show" : ""
              }`}
            >
              Your Horse&apos;s{" "}
              <span className="text-primary font-semibold">Safe Passage</span>
            </h2>
          </div>
          <div className="w-full md:w-1/2 my-auto py-12 px-4">
            <p
              ref={pRef}
              className={`text-stone-500 w-full slide-right text-center md:text-left ${
                pVisible ? "show" : ""
              }`}
            >
              At Winner Circle Trucking, we provide a variety of stalls to
              choose from to meet the needs of your horse: single straight
              stalls, stalls and a half, box stalls or slant stalls.
            </p>
          </div>
        </div>
        <div className="py-12">
          <Equipment type="list" />
        </div>
        <div className="pt-12">
          <QuickQuoteBanner />
        </div>
      </div>
    </AppLayout>
  );
};

export default OurEquipment;
