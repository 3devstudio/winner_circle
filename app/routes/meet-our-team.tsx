import type { MetaFunction } from "@remix-run/node";
import React from "react";
import ContactCard from "~/components/Blocks/ContactCard";
import BackgroundImage from "~/components/Blocks/BackgroundImage";
import ImageWithText from "~/components/Blocks/ImageWithText";
import QuickQuoteBanner from "~/components/Pages/Frontend/Home/QuickQuoteBanner";
import useSlideUp from "~/hooks/useSlideUp";

export const meta: MetaFunction = () => [{ title: "Meet Our Team" }];

const MeetOurTeam: React.FC = () => {
  const [titleRef, titleVisible] = useSlideUp<HTMLDivElement>();
  const [imgRef, imgVisible] = useSlideUp<HTMLDivElement>();
  const [card1Ref, card1Visible] = useSlideUp<HTMLDivElement>();
  const [card2Ref, card2Visible] = useSlideUp<HTMLDivElement>();

  return (
    <div>
      <BackgroundImage image="/assets/horse_in_woods.jpg" size="sm">
        <div className="flex flex-col gap-2 md:gap-4 justify-center items-center w-full h-full">
          <h1
            ref={titleRef}
            className={`text-2xl md:text-5xl text-white font-semibold slide-up ${
              titleVisible ? "show" : ""
            }`}
          >
            Meet Our Team
          </h1>
        </div>
      </BackgroundImage>
      <div
        ref={imgRef}
        className={`p-4 md:px-12 py-24 flex flex-col lg:flex-row justify-center slide-up ${
          imgVisible ? "show" : ""
        }`}
      >
        <ImageWithText
          imageUrl="/assets/chet_and_nanette.jpeg"
          altText="Chet Child"
          text="Chet and Nanette Child"
          description="Our team consists of Chet and Nanette Child. We maintain two rigs
            on the road to ensure greater availability of service. Our fleet
            includes a 2023 Ford F-450 with a 7-horse head-to-head trailer,
            box stalls available depending on your needs. Additionally, we
            operate an F-350 with a 6-horse slant load trailer. We are based in Utah and travel throughout the United States."
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-4 p-4 md:gap-8 md:p-8">
        <div
          ref={card1Ref}
          className={`h-[40rem] overflow-hidden lg:h-[50rem] w-full slide-up ${card1Visible ? "show" : ""}`}
        >
          <ContactCard
            imageUrl="/assets/IMG_7418.jpg"
            name="Chet Child"
            phone="(801) 668-9989"
            nameWidthClass="w-32 sm:w-40 md:w-52"
            namePaddingClass="pl-36 sm:pl-44 md:pl-56"
            hoverText="A brief description of Chet..."
          />
        </div>
        <div
          ref={card2Ref}
          className={`h-[40rem] overflow-hidden lg:h-[50rem] w-full slide-up ${card2Visible ? "show" : ""}`}
        >
          <ContactCard
            imageUrl="/assets/IMG_5253.jpg"
            name="Nanette Child"
            phone="(435) 552-0959"
            nameWidthClass="w-44 sm:w-52 md:w-64"
            namePaddingClass="pl-48 sm:pl-56 md:pl-[17rem]"
            hoverText="A brief description of Nanette..."
          />
        </div>
      </div>
      <QuickQuoteBanner />
    </div>
  );
};

export default MeetOurTeam;