import React from "react";
import { useFetcher } from "@remix-run/react";
import BasicTable from "~/components/Blocks/Tables/BasicTable";

interface Horse {
  id: string;
  name: string;
  breed: string;
  gender: string;
  age: string;
  height: string;
  createdAt: string;
  updatedAt: string;
  quoteId: string;
  tripId: string;
}

interface Quote {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  pickUpLocation: string;
  dropOffLocation: string;
  timeFramePickUp: string;
  healthCert: boolean;
  comments: string;
  createdAt: string;
  updatedAt: string;
  openedAt: string;
  horses: Horse[];
}

interface TransformedQuote extends Omit<Quote, 'horses'> {
  horses: string;
}

interface QuotesTableProps {
  quotes: Quote[];
}

const QuotesTable: React.FC<QuotesTableProps> = ({ quotes }) => {
  const transformedQuotes: TransformedQuote[] = quotes.map(quote => ({
    ...quote,
    horses: quote.horses.map(horse => horse.name).join(', '),
  }));

  const fetcher = useFetcher();

  const handleDeleteQuote = async (quote: TransformedQuote) => {
    await fetcher.submit(
      { quoteId: quote.id },
      {
        method: "post",
        action: "/api/delete-quote",
      },
    );
  }

  const handleRestoreQuote = async (quote: TransformedQuote) => {
    await fetcher.submit(
      { quoteId: quote.id },
      {
        method: "post",
        action: "/api/restore-quote",
      },
    );
  };

  const columns = [
    { header: "First Name", rows: "firstName" },
    { header: "Last Name", rows: "lastName" },
    { header: "Phone Number", rows: "phoneNumber" },
    { header: "Email", rows: "email" },
    { header: "Pick Up Location", rows: "pickUpLocation" },
    { header: "Drop Off Location", rows: "dropOffLocation" },
    { header: "Time Frame Pick Up", rows: "timeFramePickUp" },
    { header: "Health Cert", rows: "healthCert" },
    { header: "Comments", rows: "comments" },
    { header: "Created At", rows: "createdAt" },
    { header: "Updated At", rows: "updatedAt" },
    { header: "Opened At", rows: "openedAt" },
    { header: "Horses", rows: "horses" },
  ];

  return (
    <div>
      <BasicTable 
        columns={columns}
        data={transformedQuotes}
        onDelete={handleDeleteQuote}
        onRestore={handleRestoreQuote}
      />
    </div>
  );
};

export default QuotesTable;