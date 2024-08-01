import type { MetaFunction } from "@remix-run/node";
import SectionTitle from "../components/Text/SectionTitle";
// Components
import QuickQuoteForm from "../components/Forms/QuickQuoteForm";
import Principles from "../components/Pages/Home/Principles";
import Services from "../components/Pages/Home/Services";
import OurEquipment from "~/components/Pages/Home/OurEquipment";
import RegularRoutes from "../components/Pages/Home/RegularRoutes";
import QuickQuoteBanner from "../components/Pages/Home/QuickQuoteBanner";
// CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const meta: MetaFunction = () => [{ title: "Winner Circle" }];

export default function Index() {
  return (
    <div className="flex flex-col gap-12 md:gap-20 justify-center">
      <QuickQuoteForm />
      <div className="flex flex-col gap-8">
        <div className="p-4">
          <SectionTitle
            title="Our Principles"
            description="Our purpose is to bring your horse home with personalized service and the utmost safety. Whether it's Race or Ranch, Old Friend or New Ride, at Winner Circle Transport, we know that your horse represents the thrill of racing, the anticipation of competition, and the comfort of companionship! We love bringing your horse home!"
          />
        </div>
        <Principles />
      </div>
      <div className="flex flex-col gap-8">
        <div className="p-4">
          <SectionTitle
            title="Our Services"
            description="Traveling the lower 48 states, we provide single hauls, large volume transports, Charters to shows, moving your farm - we specialize in meeting your needs! Whether you're needing a single stall for an experienced traveler, a
          box stall for a special traveler, or room for a mare and baby, we
          provide a variety of stall configurations to meet your needs. We
          provide:"
          />
        </div>
        <Services />
      </div>
      {/* <OurEquipment /> */}
      <RegularRoutes />
      <QuickQuoteBanner />
    </div>
  );
}
