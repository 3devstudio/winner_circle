import Slider from "react-slick";
import FadeInImage from "../../Animations/FadeInImage";

const OurEquipment = () => {
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
          rigs on the road to ensure greater availability of service. Our fleet
          includes a 2023 Ford F-450 with a 7-horse head-to-head trailer, box
          stalls available depending on your needs. Additionally, we operate an
          F-350 with a 6-horse slant load trailer.
        </span>
      </div>
    </div>
  );
};

export default OurEquipment;
