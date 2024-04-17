import type { MetaFunction } from "@remix-run/node";
import Slider from "react-slick";

import FadeInImage from "../components/fadeInImage";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const meta: MetaFunction = () => [{ title: "Winner Circle" }];

export default function Index() {
  const sliderSettings = {
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    fade: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false
  }

  return (
    <div className="flex flex-col justify-center" style={{ minHeight: "calc(100vh - 100px)" }}>
      <div className="mx-auto w-full min-h-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/home_background.jpeg')", minHeight: "calc(100vh - 100px)" }}>
        <h1 className="text-white text-4xl font-bold text-center pt-4">Welcome to Winner Circle Trucking</h1>
      </div>
      <div className="w-full h-[90vh] flex">
        <div className="w-[50%]">
          <FadeInImage className="mx-auto h-full py-4" src="/assets/couple.jpg" alt="Chet and Nanette" />
        </div>
        <div className="w-[50%] flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-8 mx-8">First of All</h1>
          <span className="text-xl mx-8">
            Discover Winner Circle, a highly professional and personalized hauler based in 
            northern Utah, travelling the nation. With over 50 years of combined horse experience,
            our Husband/Wife team, along with our son, Logan Child, take great pride in bringing
            your horse home.
          </span>
        </div>
      </div>
      <div className="w-full h-[90vh] flex">
        <div className="w-[50%] flex flex-col justify-center">
          <span className="text-lg uppercase mb-8 mx-8">Not to Mention</span>
          <h1 className="text-3xl font-bold mb-8 mx-8">Our Professional Team</h1>
          <span className="text-xl mx-8">
            Meet our highly professional and personalized hauler team based in northern Utah,
            With over 50 years of combined horse experience, we take great pride in bringing
            your horse home.
          </span>
        </div>
        <div className="w-[50%]">
          <Slider
            className="h-full"
            {...sliderSettings}
          >
            <div className="h-[90vh]">
              <FadeInImage
                className="h-full mx-auto"
                src="/assets/man_and_horse.jpg"
                alt="Chet with horse"
              />
            </div>
            <div className="h-[90vh]">
              <FadeInImage
                className="h-full mx-auto"
                src="/assets/woman_and_horse.jpg"
                alt="Nanette with horse"
              />
            </div>
          </Slider>
        </div>
      </div>
      <div className="w-full h-[70vh] flex">
        <div className="w-[50%]">
          <Slider
            className="h-full ml-4"
            {...sliderSettings}
          >
            <div className="h-[70vh]">
              <FadeInImage
                className="w-full mt-20"
                src="/assets/chet_and_logan.jpeg"
                alt="Chet and Logan"
              />
            </div>
            <div className="h-[70vh]">
              <FadeInImage
                className="w-full mt-20"
                src="/assets/red_truck.jpeg"
                alt="Red truck with trailer"
              />
            </div>
          </Slider>
        </div>
        <div className="w-[50%] flex flex-col justify-center">
          <span className="text-lg uppercase mb-8 mx-8">And Let&apos;s Not Forget</span>
          <h1 className="text-3xl font-bold mb-8 mx-8">Our Equipment</h1>
          <span className="text-xl mx-8">
            Our Team consists of Chet, Nanette and Logan Child. We maintain two rigs
            on the road to ensure greater availability of service. Our fleet includes
            a 2023 Ford F-450 with a 7-horse head-to-head trailer, box stalls available
            depending on your needs. Additionally, we operate an F-350 with a 6-horse
            slant load trailer.
          </span>
        </div>
      </div>
    </div>
  );
}
