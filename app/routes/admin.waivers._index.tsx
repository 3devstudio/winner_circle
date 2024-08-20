import { useState } from "react";
import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllWaivers } from "~/models/waiver.server";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import AdminLayout from "../layouts/AdminLayout";
import WaiversTable from "../components/Pages/Backend/Waivers/WaiversTable";
import Button from "../components/Buttons/Button";
import Search from "../components/Inputs/Search";
import NoResultsFoundError from "../components/Blocks/Messaging/NoResultsFoundError";

interface Waiver {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isUserContact: boolean;
  pickUpContact: string;
  dropOffContact: string;
  pickUpDate: string;
  pickUpAddress: string;
  pickUpCity: string;
  pickUpState: string;
  pickUpZip: string;
  dropOffAddress: string;
  dropOffCity: string;
  dropOffState: string;
  dropOffZip: string;
  agreedBidAmount: string;
  cogginsHealthCert: boolean;
  terms: boolean;
  comments: string;
  createdAt: string;
  updatedAt: string;
  horses: {
    id: string;
    name: string;
    breed: string;
    gender: string;
    age: string;
    height: string;
    createdAt: string;
    updatedAt: string;
    waiverId: string;
    tripId: string;
  }[];
}

interface Horse {
  id: string;
  name: string;
  breed: string;
  gender: string;
  age: string;
  height: string;
  createdAt: string;
  updatedAt: string;
  waiverId: string;
  tripId: string;
}

export const meta: MetaFunction = () => [{ title: "Waivers | Admin Portal" }];

export const loader: LoaderFunction = async ({ request }) => {
  const waivers = await getAllWaivers();
  const transformedWaivers = waivers.map((waiver) => ({
    ...waiver,
    createdAt: new Date(waiver.createdAt).toLocaleString(),
    updatedAt: new Date(waiver.updatedAt).toLocaleString(),
    horses: waiver.horses.map((horse) => ({
      ...horse,
      createdAt: new Date(horse.createdAt).toLocaleString(),
      updatedAt: new Date(horse.updatedAt).toLocaleString(),
    })),
  }));

  return { waivers: transformedWaivers };
};

export default function AdminWaivers() {
  const { waivers } = useLoaderData<typeof loader>();
  const [filteredWaivers, setFilteredWaivers] = useState(waivers);

  return (
    <AdminLayout
      titleActions={
        <div className="flex gap-2 md:gap-4">
          <Search
            data={waivers}
            onFilter={setFilteredWaivers}
            className="w-96"
          />
          <Button
            primary
            link="/submit-waiver"
            openInNewTab
            text="Add a waiver"
            icon={PlusCircleIcon}
            className="w-36"
          />
        </div>
      }
    >
      <div className="p-4 md:p-8 h-full w-full">
        <div className="flex flex-col gap-8">
          {filteredWaivers.length > 0 ? (
            <WaiversTable waivers={filteredWaivers} />
          ) : (
            <NoResultsFoundError error="Looks like there aren't any waivers yet. When a waiver has been submitted, it will show here. Or, you can create one!" />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
