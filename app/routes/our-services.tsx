import type { MetaFunction } from "@remix-run/node";
import React from "react";
import { Link } from "@remix-run/react";

import BackgroundImage from "~/components/Blocks/BackgroundImage";
import QuickQuoteBanner from "~/components/Pages/Frontend/Home/QuickQuoteBanner";
import Services from "~/components/Pages/Frontend/Home/Services";
import Equipment from "~/components/Pages/Frontend/Home/Equipment";
import useIntersectionObserver from "~/hooks/useIntersectionObserver";
import ContactUsBanner from "~/components/Blocks/ContactUsBanner";
import SectionTitle from "~/components/Text/SectionTitle";

import AppLayout from "~/layouts/AppLayout";

export const meta: MetaFunction = () => [{ title: "Our Services" }];

const OurServices: React.FC = () => {
  const [titleRef, titleVisible] = useIntersectionObserver<HTMLDivElement>();
  const [h1Ref, h1Visible] = useIntersectionObserver<HTMLDivElement>();
  const [pRef, pVisible] = useIntersectionObserver<HTMLDivElement>();

  return (
    <AppLayout>
      <BackgroundImage image="/assets/img/IMG_7389.jpg" size="sm">
        <div className="text-white text-center">
          <h1
            ref={titleRef}
            className={`text-4xl font-bold slide-up ${
              titleVisible ? "show" : ""
            }`}
          >
            Our Services
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
              <span className="text-primary">Stress-Free</span> Horse
              Transportation
            </h2>
          </div>
          <div className="w-full md:w-1/2 my-auto py-12 px-4">
            <p
              ref={pRef}
              className={`text-stone-500 w-full slide-right text-center md:text-left ${
                pVisible ? "show" : ""
              }`}
            >
              Based in Tremonton, Utah, our family-owned and run business takes
              pride in bringing your horse home, wherever you live!
            </p>
          </div>
        </div>
        <Services type="list" />
        <ContactUsBanner />
        <div className="flex flex-col pt-8">
          <div className={`p-4`}>
            <SectionTitle
              title="Our Equipment"
              description={
                <>
                  At Winner Circle Trucking, we provide a variety of stalls to
                  choose from to meet the needs of your horse.{" "}
                  <Link to="/our-equipment" className="text-primary hover:text-bold transition">
                    Click Here
                  </Link>{" "}
                  to learn more about our equipment.
                </>
              }
            />
          </div>
          <Equipment cardLearnMoreButton />
        </div>
        <div className="pt-12">
          <QuickQuoteBanner />
        </div>
      </div>
    </AppLayout>
  );
};

export default OurServices;
