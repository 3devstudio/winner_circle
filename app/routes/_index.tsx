import type { MetaFunction } from "@remix-run/node";
import Slider from "react-slick";
import Button from "../components/Button";
import FadeInImage from "../components/fadeInImage";
// Components
import QuickQuoteForm from "../components/QuickQuoteForm";
import Principles from "../components/principles";
import Services from "../components/services";
import OurEquipment from "~/components/OurEquipment";
import RegularRoutes from "../components/RegularRoutes";
import Hero from "../components/Hero";
// CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const meta: MetaFunction = () => [{ title: "Winner Circle" }];

export default function Index() {
  return (
    <div className="flex flex-col gap-12 md:gap-20 justify-center">
      <QuickQuoteForm />
      <Principles />
      <Services />
      {/* <OurEquipment /> */}
      <RegularRoutes />
      <Hero />
    </div>
  );
}
