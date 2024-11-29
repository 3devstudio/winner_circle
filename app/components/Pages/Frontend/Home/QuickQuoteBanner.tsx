import Button from "../../../Buttons/Button";

const Hero = () => {
  return (
    <div
      style={{ backgroundImage: "url('/assets/img/hero/unnamed-5.jpg')" }}
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
          companionship. Get a quick quote today!
        </p>
        <div className="flex justify-center text-sm w-full">
          <div className="w-fit mt-4">
            <Button
              primary
              text="Quick Quote"
              link="/quick-quote"
              className="px-16 py-4 text-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
