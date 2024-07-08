import type { MetaFunction } from "@remix-run/node";
import Slider from "react-slick";
import Principles from "../components/principles";
import FadeInImage from "../components/fadeInImage";
import Button from "../components/button";
import RegularRoutes from "../components/RegularRoutes";
import ContactUs from "../components/contactus";

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
    waitForAnimate: false,
  };

  return (
    <div className="flex flex-col gap-12 md:gap-20 justify-center bg-tertiary">
      <div
        style={{ backgroundImage: "url('/assets/home_background.jpeg')" }}
        className="relative w-full h-[70vh] md:h-[50vh] bg-no-repeat bg-cover bg-center flex justify-center items-center"
      >
        <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
        <div className="z-20 flex flex-col gap-4">
          <h1 className="relative text-white text-lg sm:text-2xl md:text-4xl font-bold text-center pt-4">
            Come Join the Winner Circle!
          </h1>
          <p className="relative text-white text-sm md:text-lg text-center pt-4 w-full max-w-[80%] md:max-w-[50%] mx-auto">
            Whether it’s Race or Ranch, Old Friend or New Ride, at Winner Circle
            Horse Transport, we know that your horse represents the thrill of
            racing, the anticipation of competition and the comfort of
            companionship!
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4 justify-center text-sm w-full">
            <div className="my-auto">
              <Button secondary>Quick Quote</Button>
            </div>
            <div className="my-auto">
              <Button primary>Book Now</Button>
            </div>
          </div>
        </div>
      </div>

      <Principles />

      <div className="w-full p-4 flex flex-col md:flex-row gap-6">
        <Slider className="h-full w-full md:w-1/2" {...sliderSettings}>
          <div className="">
            <FadeInImage
              className="w-full"
              src="/assets/chet_and_logan.jpeg"
              alt="Chet and Logan"
            />
          </div>
          <div className="">
            <FadeInImage
              className="w-full"
              src="/assets/red_truck.jpeg"
              alt="Red truck with trailer"
            />
          </div>
        </Slider>
        <div className="h-full w-full md:w-1/2 flex flex-col gap-4 md:gap-6 justify-center">
          <div className="flex flex-col gap-4 md:gap-6 justify-center items-center md:justify-start md:items-start">
            <h1 className="text-center md:text-start text-secondary text-2xl md:text-4xl font-semibold uppercase">
              Our Equipment
            </h1>
            <div className="w-1/2 h-1 bg-primary" />
          </div>
          <span className="text-center md:text-start text-stone-700">
            Our Team consists of Chet, Nanette and Logan Child. We maintain two
            rigs on the road to ensure greater availability of service. Our
            fleet includes a 2023 Ford F-450 with a 7-horse head-to-head
            trailer, box stalls available depending on your needs. Additionally,
            we operate an F-350 with a 6-horse slant load trailer.
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="h-full w-full flex flex-col gap-4 md:gap-6 justify-center p-4">
          <div className="flex flex-col gap-4 md:gap-6 justify-center items-center md:justify-start md:items-start">
            <h1 className="text-center md:text-start text-secondary text-2xl md:text-4xl font-semibold uppercase">
              Our Regular Routes
            </h1>
            <div className="w-1/2 h-1 bg-primary" />
          </div>
          <span className="text-center md:text-start text-stone-700">
            With 16 routine routes, Winner Circle is able to provide a reliable
            and consistent service to all of our customers. We are always
            looking to add new routes to our schedule, so if you don’t see your
            location listed, please reach out to us and we will do our best to
            accommodate your needs.
          </span>
        </div>
        <RegularRoutes />
      </div>
      <ContactUs />
    </div>
  );
}

{
  /* <div className="w-full h-[70vh] flex">
  <div className="w-[50%]">
    <Slider className="h-full ml-4" {...sliderSettings}>
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
    <span className="text-lg uppercase mb-8 mx-8">
      And Let&apos;s Not Forget
    </span>
    <h1 className="text-3xl font-bold mb-8 mx-8">Our Equipment</h1>
    <span className="text-xl mx-8">
      Our Team consists of Chet, Nanette and Logan Child. We maintain two rigs
      on the road to ensure greater availability of service. Our fleet includes
      a 2023 Ford F-450 with a 7-horse head-to-head trailer, box stalls
      available depending on your needs. Additionally, we operate an F-350 with
      a 6-horse slant load trailer.
    </span>
  </div>
</div> */
}
{
  /* <div className="w-full h-[90vh] flex">
        <div className="w-[50%]">
          <FadeInImage
            className="mx-auto h-full py-4"
            src="/assets/chet_and_nanette.jpeg"
            alt="Chet and Nanette"
          />
        </div>
        <div className="w-[50%] flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-8 mx-8">First of All</h1>
          <span className="text-xl mx-8">
            Discover Winner Circle, a highly professional and personalized
            hauler based in northern Utah, travelling the nation. With over 50
            years of combined horse experience, our Husband/Wife team, along
            with our son, Logan Child, take great pride in bringing your horse
            home.
          </span>
        </div>
      </div> */
}
{
  /* <div className="mx-auto w-full min-h-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/home_background.jpeg')", minHeight: "calc(100vh - 100px)" }}>
  <h1 className="text-white text-4xl font-bold text-center pt-4">Come Join the Winner Circle!</h1>
  <p className="text-white text-2xl font-bold text-center pt-4 px-8">
    Whether it&apos;s Race or Ranch, Old Friend or New Ride, at Winner Circle Transport, we know that your
    horse represents the thrill of racing, the anticipation of competition and the comfort of companionship!
  </p>
  <p className="text-white text-2xl font-bold text-center pt-4 px-8">
    Our purpose is to bring your horse home with personalized service and the utmost safety.
  </p>
  <p className="text-white text-2xl font-bold text-center pt-4 px-8">
    We love bringing your horse home!
  </p>
  <p className="text-white text-2xl font-bold text-center pt-4 px-8">
    As always, please submit your requests for ANY HAUL. We have routes in the making and are glad to 
    consider yours! We respond quickly!
  </p>
</div> */
}
