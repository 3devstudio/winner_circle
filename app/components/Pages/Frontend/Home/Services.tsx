import useIntersectionObserver from "~/hooks/useIntersectionObserver";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import Button from "~/components/Buttons/Button";

interface ServicesProps {
  type?: "banner" | "list"; // Added 'list' as an option
}

const Services: React.FC<ServicesProps> = ({ type = "banner" }) => {
  const [card1Ref, card1Visible] = useIntersectionObserver<HTMLDivElement>();
  const [card2Ref, card2Visible] = useIntersectionObserver<HTMLDivElement>();
  const [card3Ref, card3Visible] = useIntersectionObserver<HTMLDivElement>();
  const [card4Ref, card4Visible] = useIntersectionObserver<HTMLDivElement>();

  const listData = {
    title: "Our Services",
    description:
      "Based in Tremonton, Utah, our family-owned and run business takes pride in bringing your horse home, wherever you live!",
    listTitle: "Traveling the lower 48 states, we provide:",
    provisions: [
      "Single hauls",
      "Large volume transports",
      "Charters to shows",
      "Farm moves",
      "Minis",
      "Direct routes",
      "Daily video monitoring",
      "Twice-daily photo/text updates",
    ]
  };

  return (
    <>
      {type === "banner" ? (
        <div className="relative w-full h-full md:max-h-[25rem]">
          {/* Banner Layout */}
          <div className="absolute inset-0 bg-black opacity-75 z-20" />
          <img
            className="w-full object-cover z-10 h-full md:max-h-[25rem]"
            src="/assets/img/IMG_7303.jpg"
            alt="Single straight-load stall"
          />

          <div className="absolute inset-0 w-full h-full p-6 md:px-12 md:py-8 flex flex-col md:flex-row justify-between gap-8 z-30">
            <div className="w-full md:w-1/3 h-full flex flex-col gap-4 justify-center text-white">
              <h2 className="font-semibold text-2xl md:text-4xl text-left">
                Our <span className="text-primary">Services</span>
              </h2>
              <p className="text-base md:text-lg">
                Based in Tremonton, Utah, our family-owned and run business
                takes pride in bringing your horse home, wherever you live!
              </p>
              <div className="w-1/2">
                <Button
                  primary
                  textSize="hidden md:block md:text-md"
                  className="w-full"
                  link="/our-services"
                >
                  Learn More
                </Button>
                <Button
                  primary
                  textSize="md:hidden text-md"
                  className="w-full"
                  link="/our-services"
                >
                  View our Services
                </Button>
              </div>
            </div>
            <div className="hidden md:flex md:justify-center w-full md:w-2/3">
              <div className="grid grid-cols-1 md:grid-rows-5 md:grid-flow-col w-fit gap-4">
                {listData.provisions.map((provision, index) => (
                  <div key={index} className="flex gap-2 w-full max-w-64">
                    <CheckCircleIcon className="w-10 h-10 md:w-12 md:h-12 text-primary my-auto" />
                    <p className="text-lg text-white my-auto">{provision}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : type === "list" ? (
        <div className="py-12 md:py-20">
          {/* List Layout */}
          <h2 className="text-xl text-stone-800 mb-8 md:mb-12 text-center px-4">
            {listData.listTitle}
          </h2>
          <div className="px-4">
            <div className="gap-4 flex flex-col md:flex-none md:grid md:grid-rows-5 md:grid-flow-col md:w-fit md:max-w-6xl md:mx-auto md:gap-x-12 md:gap-y-8">
              {listData.provisions.map((provision, index) => (
                <div key={index} className="flex gap-2 md:gap-4 w-full">
                  <CheckCircleIcon className="w-12 h-12 md:h-16 md:w-16 text-primary" />
                  <p className="text-lg md:text-2xl text-stone-800 my-auto md:font-semibold">
                    {provision}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Services;
