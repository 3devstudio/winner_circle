import { CheckIcon } from "@heroicons/react/20/solid";
import SectionTitle from "./SectionTitle";

const Principles = () => {
  return (
    <div className="flex flex-col gap-14 fade-in">
      <SectionTitle
        title="Our Principles"
        description="Our purpose is to bring your horse home with personalized service and
        the utmost safety. Whether it's Race or Ranch, Old Friend or New Ride,
        at Winner Circle Transport, we know that your horse represents the
        thrill of racing, the anticipation of competition, and the comfort of
        companionship! We love bringing your horse home!"
      />
      <div className="flex flex-col lg:flex-row lg:justify-around">
        <div className="relative flex flex-col gap-4 items-center bg-secondary w-full h-[20rem] py-6">
          <div className="absolute -top-5 inset-x-0 flex justify-center items-center">
            <h2 className="text-xl font-semibold uppercase text-secondary clip-parallelogram-md px-12 py-1 bg-primary">
              Professionalism
            </h2>
          </div>
          <div className="absolute inset-x-0 inset-y-0 flex flex-col gap-4 justify-center items-center">
            <span className="font-semibold text-center text-stone-300 w-full max-w-md px-2 lg:px-4">
              We provide a highly professional and personalized hauling
              experience.
            </span>
            <ul className="flex flex-col gap-2 list-disc text-center text-stone-300 max-w-md px-2 lg:px-4">
              <li className="flex gap-2">
                <CheckIcon className="h-6 w-6 text-primary stroke-2 my-auto" />
                <span className="text-start">CDL certified drivers</span>
              </li>
              <li className="flex gap-2">
                <CheckIcon className="h-6 w-6 text-primary stroke-2 my-auto" />
                <span className="text-start">DOT compliant</span>
              </li>
              <li className="flex gap-2">
                <CheckIcon className="h-6 w-6 text-primary stroke-2 my-auto" />
                <span className="text-start">Commercially Insured</span>
              </li>
              <li className="flex gap-2">
                <CheckIcon className="h-6 w-6 text-primary stroke-2 my-auto" />
                <span className="text-start">No deposit required to book</span>
              </li>
              <li className="flex gap-2">
                <CheckIcon className="h-6 w-6 text-primary stroke-2 my-auto" />
                <span className="text-start">Payment due on delivery </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="relative flex flex-col gap-4 items-center bg-secondary/95 w-full h-[20rem] py-6">
          <div className="absolute -top-5 inset-x-0 flex justify-center items-center">
            <h2 className="text-xl font-semibold uppercase text-secondary clip-parallelogram-md px-12 py-1 bg-primary">
              Reliability
            </h2>
          </div>
          <div className="absolute inset-x-0 inset-y-0 flex flex-col gap-4 justify-center items-center">
            <span className="font-semibold text-center text-stone-300 w-full max-w-md px-2 lg:px-4">
              Our aim is to provide you and your horse with a personalized
              transportation experience.
            </span>
            <ul className="flex flex-col gap-2 list-disc text-center text-stone-300 max-w-md px-2 lg:px-4">
              <li className="flex gap-2">
                <CheckIcon className="h-6 w-6 text-primary stroke-2 my-auto" />
                <span className="text-start">
                  Constant hay and water on the trailer
                </span>
              </li>
              <li className="flex gap-2">
                <CheckIcon className="h-6 w-6 text-primary stroke-2 my-auto" />
                <span className="text-start">
                  Twice-daily text/photo updates
                </span>
              </li>
              <li className="flex gap-2">
                <CheckIcon className="h-6 w-6 text-primary stroke-2 my-auto" />
                <span className="text-start">
                  Camera monitoring on the trailer
                </span>
              </li>
              <li className="flex gap-2">
                <CheckIcon className="h-6 w-6 text-primary stroke-2 my-auto" />
                <span className="text-start">
                  Overnights off the trailer in reputable overnight facilities.
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="relative flex flex-col gap-4 items-center bg-secondary/90 w-full h-[20rem] py-6">
          <div className="absolute -top-5 inset-x-0 flex justify-center items-center">
            <h2 className="text-xl font-semibold uppercase text-secondary clip-parallelogram-md px-12 py-1 bg-primary opacity-100">
              Expertise
            </h2>
          </div>
          <div className="absolute inset-x-0 inset-y-0 flex justify-center items-center">
            <span className="text-center text-stone-300 w-full max-w-md px-2 lg:px-4">
              We are a Utah-based, family-owned and operated business with over
              50 years of combined horse experience. You can trust us to handle
              your precious cargo as if it were our own; with patience,
              knowledge and skill.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Principles;
