import { useState } from "react";
import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllQuotes } from "~/models/quote.server";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import AdminLayout from "../layouts/AdminLayout";
import QuotesTable from "../components/Pages/Backend/Quotes/QuotesTable";
import Button from "../components/Buttons/Button";
import Search from "../components/Inputs/Search";
import NoResultsFoundError from "../components/Blocks/Messaging/NoResultsFoundError";

interface Quote {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string; // Ensure this field is included
  pickUpLocation: string;
  dropOffLocation: string;
  timeFramePickUp: string;
  healthCert: boolean;
  comments: string;
  createdAt: string;
  updatedAt: string;
  openedAt: string;
  horses: {
    id: string;
    name: string;
    breed: string;
    gender: string;
    age: number;
    height: string;
    createdAt: Date;
    updatedAt: Date;
    quoteId: string;
    tripId: string;
  }[];
}

export const meta: MetaFunction = () => [{ title: "Quotes | Admin Portal" }];

export const loader: LoaderFunction = async ({ request }) => {
  const quotes = await getAllQuotes();
  const transformedQuotes = quotes.map((quote) => ({
    ...quote,
    timeFramePickUp: new Date(quote.timeFramePickUp).toLocaleString(),
    createdAt: new Date(quote.createdAt).toLocaleString(),
    updatedAt: new Date(quote.updatedAt).toLocaleString(),
    openedAt: new Date(quote.openedAt).toLocaleString(),
    horses: quote.horses.map((horse) => ({
      ...horse,
      createdAt: new Date(horse.createdAt).toLocaleString(),
      updatedAt: new Date(horse.updatedAt).toLocaleString(),
    })),
  }));
  return { quotes: transformedQuotes };
};

export default function AdminQuotes() {
  const { quotes } = useLoaderData<typeof loader>();
  const [filteredQuotes, setFilteredQuotes] = useState(quotes);

  return (
    <AdminLayout
      titleActions={
        <div className="flex gap-2 md:gap-4">
          <Search data={quotes} onFilter={setFilteredQuotes} className="w-96" />
          <Button
            primary
            link="/quick-quote"
            openInNewTab
            text="Add a quote"
            icon={PlusCircleIcon}
            className="w-36"
          />
        </div>
      }
    >
      <div className="p-4 md:p-8 h-full w-full">
        <div className="flex flex-col gap-8">
          {filteredQuotes.length > 0 ? (
            <QuotesTable quotes={filteredQuotes} />
          ) : (
            <NoResultsFoundError error="Looks like there aren't any quotes yet. When a quote has been submitted, it will show here. Or, you can create one!" />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}