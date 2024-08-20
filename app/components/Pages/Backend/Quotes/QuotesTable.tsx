import React, { useState, useEffect } from "react";
import { useFetcher, useOutletContext } from "@remix-run/react";
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

interface Column {
  header: string;
  accessor: string;
  dataType?:
    | "text"
    | "tel"
    | "select"
    | "radio"
    | "checkbox"
    | "longText"
    | "date";
}

interface TransformedQuote extends Omit<Quote, "horses"> {
  horses: string;
}

interface QuotesTableProps {
  quotes: Quote[];
}

interface FetcherData {
  error?: string;
  updatedQuote?: TransformedQuote;
}

const QuotesTable: React.FC<QuotesTableProps> = ({ quotes }) => {
  const [data, setData] = useState<TransformedQuote[]>(
    quotes.map((quote) => ({
      ...quote,
      horses: quote.horses.map((horse) => horse.name).join(", "),
    })),
  );

  const fetcher = useFetcher<FetcherData>();
  const { showBanner } = useOutletContext<{ showBanner: (message: string, type: "success" | "error") => void }>();

  const handleEditQuote = (id: string, accessor: string, value: any) => {
    const updatedData = data.map((quote) =>
      quote.id === id ? { ...quote, [accessor]: value } : quote
    );
    setData(updatedData);
  };

  const handleUpdateQuote = (id: string, updatedQuote: TransformedQuote) => {
    fetcher.submit(
      { ...updatedQuote },
      {
        method: "post",
        action: `/api/update-quote/${id}`,
      },
    );
  };

  const handleDeleteQuote = (quote: TransformedQuote) => {
    fetcher.submit(
      { quoteId: quote.id },
      {
        method: "post",
        action: "/api/delete-quote",
      },
    );
  };

  const handleRestoreQuote = (quote: TransformedQuote) => {
    fetcher.submit(
      { quoteId: quote.id },
      {
        method: "post",
        action: "/api/restore-quote",
      },
    );
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      console.log('FETCHER DATA', fetcher.data);
      if (fetcher.data.error) {
        showBanner(fetcher.data.error, "error");
      } else {
        showBanner("Action completed successfully.", "success");
      }
    }
  }, [fetcher.state, fetcher.data, showBanner]);

  const columns: Column[] = [
    { header: "First Name", accessor: "firstName", dataType: "text" },
    { header: "Last Name", accessor: "lastName", dataType: "text" },
    { header: "Phone Number", accessor: "phoneNumber", dataType: "tel" },
    {
      header: "Pick Up Location",
      accessor: "pickUpLocation",
      dataType: "text",
    },
    {
      header: "Drop Off Location",
      accessor: "dropOffLocation",
      dataType: "text",
    },
    {
      header: "Time Frame Pick Up",
      accessor: "timeFramePickUp",
      dataType: "date",
    },
    { header: "Health Cert", accessor: "healthCert", dataType: "checkbox" },
    { header: "Comments", accessor: "comments", dataType: "longText" },
    { header: "Created At", accessor: "createdAt", dataType: "date" },
    { header: "Updated At", accessor: "updatedAt", dataType: "date" },
    { header: "Opened At", accessor: "openedAt", dataType: "date" },
    { header: "Horses", accessor: "horses" },
  ];

  return (
    <div>
      <BasicTable
        columns={columns}
        data={data}
        onDelete={handleDeleteQuote}
        onRestore={handleRestoreQuote}
        onEdit={handleEditQuote}
        onUpdate={handleUpdateQuote}
      />
    </div>
  );
};

export default QuotesTable;