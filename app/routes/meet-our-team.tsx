import React from "react";
import type { MetaFunction } from "@remix-run/node";

import QuickQuoteBanner from "~/components/Pages/Home/QuickQuoteBanner";

export const meta: MetaFunction = () => [{ title: "Our Principles" }];

const MeetOurTeam: React.FC = () => {
  return (
    <div>
      <div className="px-4 md:px-8 pt-32 flex justify-center">
        <div className="flex flex-col gap-8">
          <h1 className="font-semibold text-center text-stone-800 text-2xl md:text-4xl">
            Meet the team
          </h1>
          <div className="flex gap-8 w-full">
            <div
              style={{ backgroundImage: "url('/assets/IMG_7418.jpg')" }}
              className="h-96 w-96"
            />
            <div
              style={{ backgroundImage: "url('/assets/IMG_7418.jpg')" }}
              className="h-96 w-96"
            />
          </div>
        </div>
      </div>
      <div className="pt-12">
        <QuickQuoteBanner />
      </div>
    </div>
  );
};

export default MeetOurTeam;
