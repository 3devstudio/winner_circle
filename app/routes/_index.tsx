import type { MetaFunction } from "@remix-run/node";
// Components
import Hero from "../components/Hero";
import Principles from "../components/principles";
import Services from "../components/services";
import OurEquipment from "~/components/OurEquipment";
import RegularRoutes from "../components/RegularRoutes";
import ContactUs from "../components/contactus";
// CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const meta: MetaFunction = () => [{ title: "Winner Circle" }];

export default function Index() {
  return (
    <div className="flex flex-col gap-12 md:gap-20 justify-center">
      <Hero />
      <Principles />
      <Services />
      <OurEquipment />
      <RegularRoutes />
      <ContactUs />
    </div>
  );
}
