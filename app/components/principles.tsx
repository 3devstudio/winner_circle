import { CheckIcon } from "@heroicons/react/20/solid";

const Principles = () => {
  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col w-full max-w-6xl mx-auto justify-start items-center gap-2 p-4">
        <div className="flex flex-col gap-4">
          <h1 className="flex justify-start text-secondary text-2xl md:text-4xl font-semibold uppercase">
            Our Principles
          </h1>
          <div className="w-full h-1 bg-primary" />
        </div>
        <span className="text-center text-stone-700">
          Our purpose is to bring your horse home with personalized service and
          the utmost safety. Whether it&apos;s Race or Ranch, Old Friend or New
          Ride, at Winner Circle Transport, we know that your horse represents
          the thrill of racing, the anticipation of competition, and the comfort
          of companionship! We love bringing your horse home!
        </span>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-around">
        <div className="relative flex flex-col gap-4 items-center bg-secondary w-full h-[16rem] py-6">
          <div className="absolute -top-5 inset-x-0 flex justify-center items-center">
            <h2 className="text-xl font-semibold uppercase text-secondary clip-parallelogram-md px-12 py-1 bg-primary">
              Professionalism
            </h2>
          </div>
          <div className="absolute inset-x-0 inset-y-0 flex justify-center items-center">
            <span className="text-center text-stone-300 w-full max-w-sm px-2 lg:px-4">
              We provide highly professional and personalized hauling service.
              We are DOT compliant and commercially insured. No deposit
              required. Payment on delivery.
            </span>
          </div>
        </div>
        <div className="relative flex flex-col gap-4 items-center bg-secondary/95 w-full h-[16rem] py-6">
          <div className="absolute -top-5 inset-x-0 flex justify-center items-center">
            <h2 className="text-xl font-semibold uppercase text-secondary clip-parallelogram-md px-12 py-1 bg-primary">
              Reliability
            </h2>
          </div>
          <div className="absolute inset-x-0 inset-y-0 flex justify-center items-center">
            <ul className="flex flex-col list-disc text-center text-stone-300 max-w-sm px-2 lg:px-4">
              <li className="flex gap-2">
                <CheckIcon className="h-6 w-6 text-primary stroke-2 my-auto" />
                <span>Constant feed and water on trailer</span>
              </li>
              <li className="flex gap-2">
                <CheckIcon className="h-6 w-6 text-primary stroke-2 my-auto" />
                <span>Camera monitoring en route</span>
              </li>
              <li className="flex gap-2">
                <CheckIcon className="h-6 w-6 text-primary stroke-2 my-auto" />
                <span>Overnights off the trailer</span>
              </li>
              <li className="flex gap-2">
                <CheckIcon className="h-6 w-6 text-primary stroke-2 my-auto" />
                <span>Twice-daily video/text updates</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="relative flex flex-col gap-4 items-center bg-secondary/90 w-full h-[16rem] py-6">
          <div className="absolute -top-5 inset-x-0 flex justify-center items-center">
            <h2 className="text-xl font-semibold uppercase text-secondary clip-parallelogram-md px-12 py-1 bg-primary opacity-100">
              Expertise
            </h2>
          </div>
          <div className="absolute inset-x-0 inset-y-0 flex justify-center items-center">
            <span className="text-center text-stone-300 w-full max-w-sm px-2 lg:px-4">
              With over 35 years of combined horse experience, you can trust us
              to handle your precious cargo with knowledge and skill.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Principles;
