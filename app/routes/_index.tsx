import type { MetaFunction } from "@remix-run/node";

// Components
import QuickQuoteForm from "~/components/Forms/QuickQuoteForm";
import Equipment from "../components/Pages/Frontend/Home/Equipment";
import RegularRoutes from "../components/Pages/Frontend/Home/RegularRoutes";
import QuickQuoteBanner from "../components/Pages/Frontend/Home/QuickQuoteBanner";
import Principles from "../components/Pages/Frontend/Home/Principles";
import Services from "../components/Pages/Frontend/Home/Services";
import SectionTitle from "../components/Text/SectionTitle";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import AppLayout from "~/layouts/AppLayout";

// CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const meta: MetaFunction = () => [{ title: "Winner Circle" }];

export default function Index() {
  const [principlesTitleRef, principlesTitleVisible] =
    useIntersectionObserver<HTMLDivElement>();
  const [principlesRef, principlesVisible] =
    useIntersectionObserver<HTMLDivElement>();
  const [servicesRef, servicesVisible] =
    useIntersectionObserver<HTMLDivElement>();
  const [equipmentTitleRef, equipmentTitleVisible] =
    useIntersectionObserver<HTMLDivElement>();
  const [equipmentRef, equipmentVisible] =
    useIntersectionObserver<HTMLDivElement>();
  const [regularRoutesRef, regularRoutesVisible] =
    useIntersectionObserver<HTMLDivElement>();
  const [quickQuoteRef, quickQuoteVisible] =
    useIntersectionObserver<HTMLDivElement>();

  return (
    <AppLayout>
      <div className="flex flex-col gap-12 md:gap-20 justify-center">
        <QuickQuoteForm title="Reliable Equine Transport, Every Mile of the Way." />
        <div className="flex flex-col gap-8">
          <div
            ref={principlesTitleRef}
            className={`p-4 slide-up ${principlesTitleVisible ? "show" : ""}`}
          >
            <SectionTitle
              title="Our Principles"
              description="Our purpose is to bring your horse home with personalized service and the utmost safety. Whether it's Race or Ranch, Old Friend or New Ride, at Winner Circle Transport, we know that your horse represents the thrill of racing, the anticipation of competition, and the comfort of companionship! We love bringing your horse home!"
            />
          </div>
          <div
            ref={principlesRef}
            className={`slide-up ${principlesVisible ? "show" : ""}`}
          >
            <Principles />
          </div>
        </div>
        <div>
          <div
            ref={servicesRef}
            className={`slide-up ${servicesVisible ? "show" : ""}`}
          >
            <Services />
          </div>
        </div>
        <div className="flex flex-col">
          <div
            ref={equipmentTitleRef}
            className={`p-4 slide-up ${equipmentTitleVisible ? "show" : ""}`}
          >
            <SectionTitle
              title="Our Equipment"
              description="At Winner Circle Trucking, we provide a variety of stalls to choose from to meet the needs of your horse: single straight stalls, stalls and a half, box stalls or slant stalls."
            />
          </div>
          <div
            ref={equipmentRef}
            className={`slide-up ${equipmentVisible ? "show" : ""}`}
          >
            <Equipment cardLearnMoreButton />
          </div>
        </div>
        <div
          ref={regularRoutesRef}
          className={`slide-up ${regularRoutesVisible ? "show" : ""}`}
        >
          <RegularRoutes />
        </div>
        <div
          ref={quickQuoteRef}
          className={`slide-up ${quickQuoteVisible ? "show" : ""}`}
        >
          <QuickQuoteBanner />
        </div>
      </div>
    </AppLayout>
  );
}
