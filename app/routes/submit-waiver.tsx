import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import BackgroundImage from "~/components/Blocks/BackgroundImage";

export const meta: MetaFunction = () => [{ title: "Winner Circle" }];

export default function Waiver() {
  const [numHorses, setNumHorses] = useState(1);

  const addHorse: () => void = () => {
    setNumHorses(prevNumHorses => prevNumHorses + 1);
  };

  return (
    <div className="flex flex-col gap-12">
      <BackgroundImage
        image="/assets/home_background.jpeg"
        size="md"
        children={
          <div className="text-white text-center">
            <h1 className="text-4xl md:text-6xl font-semibold">Submit Waiver</h1>
            <p className="text-lg md:text-2xl">Fill out the form below to submit a waiver</p>
          </div>
        }
      />
      <div className="flex justify-center items-center">
        <div className="bg-white rounded-lg borer border-stone-200 p-4 md:p-8">
          <form action="post">
            <div className="space-y-12">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold leading-7 text-gray-900">Onboarding Form Transport Waiver</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">Please fill out and read, then sign the waiver below</p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                    <div className="mt-2">
                      <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                    <div className="mt-2">
                      <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                    <div className="mt-2">
                      <input type="tel" id="phone" name="phone" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                    <div className="mt-2">
                      <input type="email" id="email" name="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="example@example.com" required />
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="pick-up" className="block text-sm font-medium leading-6 text-gray-900">Address of Pick Up {"("}include city and state{")"}</label>
                    <div className="mt-2">
                      <input type="text" id="pick-up" name="pick-up" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="pick-up-name" className="block text-sm font-medium leading-6 text-gray-900">Name of Contact at Pick Up</label>
                    <div className="mt-2">
                      <input type="text" id="pick-up-name" name="pick-up-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="pick-up-phone" className="block text-sm font-medium leading-6 text-gray-900">Phone Number of Contact at Pick Up</label>
                    <div className="mt-2">
                      <input type="tel" id="pick-up-phone" name="pick-up-phone" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required />
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="drop-off" className="block text-sm font-medium leading-6 text-gray-900">Address of Drop Off {"("}include city and state{")"}</label>
                    <div className="mt-2">
                      <input type="text" id="drop-off" name="drop-off" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="drop-off-name" className="block text-sm font-medium leading-6 text-gray-900">Name of Contact at Drop Off</label>
                    <div className="mt-2">
                      <input type="text" id="drop-off-name" name="drop-off-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="drop-off-phone" className="block text-sm font-medium leading-6 text-gray-900">Phone Number of Contact at Drop Off</label>
                    <div className="mt-2">
                      <input type="tel" id="drop-off-phone" name="drop-off-phone" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required />
                    </div>
                  </div>
                </div>

                {Array.from({ length: numHorses }).map((_, index) => (
                  <div key={index} className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor={`breed-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Breed</label>
                      <div className="mt-2">
                        <input type="text" id={`breed-${index}`} name="breed" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor={`gender-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Gender</label>
                      <div className="mt-2">
                        <input type="text" id={`gender-${index}`} name="gender" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor={`age-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Age</label>
                      <div className="mt-2">
                        <input type="number" id={`age-${index}`} name="age" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                      </div>
                    </div>

                    <div className="sm:col-span-1">
                      <label htmlFor={`height-${index}`} className="block text-sm font-medium leading-6 text-gray-900">Height</label>
                      <div className="mt-2">
                        <input type="text" id={`height-${index}`} name="height" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                      </div>
                    </div>
                  </div>
                ))}

                <button type="button" onClick={addHorse} className="mt-4 bg-dark-green text-white py-2 px-4 rounded hover:bg-winners-orange">Add Horse</button>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">Time Frame of Pick Up</label>
                    <div className="mt-2">
                      <input type="date" id="date" name="date" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                    </div>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="bid-amount" className="block text-sm font-medium leading-6 text-gray-900">Agreed Upon Bid Amount</label>
                    <div className="mt-2">
                      <input type="text" id="bid-amount" name="bid-amount" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                    </div>
                  </div>
                </div>

                <fieldset className="mt-10">
                  <legend className="block text-sm font-medium leading-6 text-gray-900">I acknowledge a current Coggins and Health Certificate will be completed before pickup.</legend>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-x-3">
                      <input type="radio" id="health-cert-yes" name="health-cert" className="h-4 w-4 border-gray-300 text-dark-green focus:ring-dark-green" />
                      <label htmlFor="health-cert-yes" className="block text-sm font-medium leading-6 text-gray-900">Yes</label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input type="radio" id="health-cert-no" name="health-cert" className="h-4 w-4 border-gray-300 text-dark-green focus:ring-dark-green" />
                      <label htmlFor="health-cert-no" className="block text-sm font-medium leading-6 text-gray-900">No</label>
                    </div>
                  </div>
                </fieldset>

                <div className="mt-10 col-span-full">
                  <label htmlFor="comments" className="block text-sm font-medium leading-6 text-gray-900">Comments</label>
                  <div className="mt-2">
                    <textarea id="comments" name="comments" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                  </div>
                </div>

                <button type="button" className="mt-4 bg-dark-green text-white py-2 px-4 rounded hover:bg-winners-orange">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}