import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [{ title: "Winner Circle" }];

export default function About() {
  return (
    <div className="flex flex-col justify-center" style={{ minHeight: "calc(100vh - 100px)" }}>
      <div className="mx-auto w-full min-h-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/img/horses.jpeg')", minHeight: "calc(100vh - 100px)" }}>
        <h1 className="text-white text-4xl font-bold text-center pt-4">About Winner Circle</h1>
      </div>
      <div className="w-full h-[90vh] flex">
        <div className="w-[50%] flex items-center">
          <span className="text-xl mx-8">
            Winner Circle is a husband/wife team, along with our son Logan Child, providing 
            exceptional horse hauling services. We keep two rigs on the road for greater 
            availability and offer a range of box stall sizes to meet your needs. Trust us to 
            bring your horse home safely and with care.
          </span>
        </div>
        <div className="w-[50%]">
          <img src="https://drive.google.com/file/d/1nUA7zBZQZHhlq4OKLRUJaWWxoKdey9zc/view?usp=sharing" alt="Video of road" />
        </div>
      </div>
      <div className="w-full h-[80vh] flex flex-col items-center">
        <h1 className="text-4xl font-semibold my-4">Our Principles</h1>
        <div className="w-full h-full flex justify-around">
          <div className="w-[30%] h-[70%] flex flex-col justify-center items-center bg-winners-orange rounded drop-shadow-lg">
            <div className="w-full h-[20%] flex justify-center items-center">
              <h2 className="text-2xl font-semibold uppercase border-b-2 border-black">Professionalism</h2>
            </div>
            <div className="w-[90%] h-[80%] flex pt-4">
              <span className="text-xl">
                We provide highly professional and personalized hauling service. We are DOT compliant
                and commercially insured. No deposit required. Payment on delivery.
              </span>
            </div>
          </div>
          <div className="w-[30%] h-[70%] flex flex-col justify-center items-center bg-winners-orange rounded drop-shadow-lg">
            <div className="w-full h-[20%] flex justify-center items-center">
              <h2 className="text-2xl font-semibold uppercase border-b-2 border-black">Reliability</h2>
            </div>
            <div className="h-[80%] flex flex-col pt-4">
              <div className="w-[90%]">
                <span className="text-xl underline">Transportation Includes:</span>
                <ul className="flex flex-col text-xl list-disc">
                  <li>Constant feed and water on trailer</li>
                  <li>Camera monitoring en route</li>
                  <li>Overnights off the trailer</li>
                  <li>Twice-daily video/text updates</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-[30%] h-[70%] flex flex-col justify-center items-center bg-winners-orange rounded drop-shadow-lg">
            <div className="w-full h-[20%] flex justify-center items-center">
              <h2 className="text-2xl font-semibold uppercase border-b-2 border-black">Expertise</h2> 
            </div>
            <div className="w-[90%] h-[80%] flex pt-4">
              <span className="text-xl">
              With over 35 years of combined horse experience, you can trust us to 
              handle your precious cargo with knowledge and skill.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[90vh] flex flex-col">
        <div className="w-full h-[10%] flex justify-center items-center">
          <h1 className="text-4xl">Meet the best team ever!</h1>
        </div>
        <div className="w-full h-[90%] flex justify-center">
          <div className="h-full bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('/assets/img/couple.jpg')", width: "30vw" }}>
            <div className="w-full h-full px-4 flex flex-col justify-center items-center text-white text-xl opacity-0 transition-all duration-300 ease-in-out hover:opacity-100 bg-black bg-opacity-0 hover:bg-opacity-50">
              <span className="mb-2">
                Meet Chet & Nanette
              </span>
              <span>
                Partner Founders and Owners of Winners Circle
              </span>
            </div>
          </div>
          <div className="h-full w-[10%]" />
          <div className="h-full bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('/assets/img/logan.jpeg')", width: "30vw" }}>
            <div className="w-full h-full px-4 flex flex-col justify-center items-center text-white text-xl opacity-0 transition-all duration-300 ease-in-out hover:opacity-100 bg-black bg-opacity-0 hover:bg-opacity-50">
              <span className="mb-2">
                Meet Logan
              </span>
              <span className="mb-2">
                Winner Circle Trucking is proud to have our driver Logan Child on the road, providing
                a reliable and professional hand in bringing your horse home!
              </span>
              <span>
                Logan brings a wealth of horsemanship to the table and our clients are thrilled with his 
                patience and skill.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}