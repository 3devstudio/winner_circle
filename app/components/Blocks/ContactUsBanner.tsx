import React from "react";

import Button from "~/components/Buttons/Button";

interface ContactUsBannerProps {
  //
}

const ContactUsBanner: React.FC<ContactUsBannerProps> = () => {
  return (
    <div className="w-full md:relative md:h-[16rem]">
      <div
        style={{ backgroundImage: "url(/assets/img/horses-running.jpg)" }}
        className="w-full md:w-1/2 md:absolute md:left-0 md:clip-angle-r-lg bg-top bg-no-repeat bg-cover h-[16rem] md:z-10"
      >
        <div className="relative h-full w-full flex justify-center items-center">
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </div>
      <div className="w-full md:w-3/5 md:absolute md:right-0 p-4 md:p-0 md:py-4 pr-4 flex justify-center items-center bg-secondary h-[16rem]">
        <div className="flex flex-col gap-4 pl-2 md:pl-24 lg:pl-32">
          <h2 className="text-white uppercase tracking-wide text-3xl">
            We <span className="font-semibold text-primary">specialize</span> in meeting your needs
          </h2>
          <p className="text-stone-100">
            Call or contact us anytime to inquire about customizing your haul!
          </p>
          <div className="w-1/2">
            <Button
                primary
                className="w-full"
                link="/quick-quote"
            >
                Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsBanner;
