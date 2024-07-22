import Slider from "react-slick";
import FadeInImage from "./fadeInImage";

const Services = () => {
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
    <div className="flex flex-col md:flex-row gap-8 p-4 w-full max-w-[90rem] mx-auto">
      {/* Image */}
      <Slider
        className="flex flex-col justify-center items-center w-full md:w-1/2 overflow-hidden"
        {...sliderSettings}
      >
        <FadeInImage
          src="/assets/IMG_7418.jpg"
          alt="Chet and Horse"
          className="rotate-90 object-contain w-full max-h-full"
        />
        <FadeInImage
          src="/assets/IMG_7418.jpg"
          alt="Chet and Horse"
          className="rotate-90 object-contain w-full max-h-full"
        />
      </Slider>
      {/* Header */}
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl flex text-secondary font-semibold uppercase">
            Our Services
          </h1>
          <div className="w-full h-1 bg-primary" />
        </div>
        <span className="text-stone-700">
          Whether you're needing a single stall for an experienced traveler, a
          box stall for a special traveler, or room for a mare and baby, we
          provide a variety of stall configurations to meet your needs. We
          provide:
        </span>
      </div>
    </div>
  );
};

export default Services;
