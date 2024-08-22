import React, { useState, useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

interface FetcherResponse {
  success: boolean;
  message?: string;
  error?: string;
}

const QuotesTable: React.FC<QuotesTableProps> = ({ quotes }) => {
  const [data, setData] = useState<TransformedQuote[]>(
    quotes.map((quote) => ({
      ...quote,
      horses: quote.horses.map((horse) => horse.name).join(", "),
    })),
  );

  const fetcher = useFetcher<FetcherResponse>();

  const showToast = (message: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.success) {
        showToast(fetcher.data.message || "Operation successful", "success");
      } else {
        showToast(fetcher.data.error || "An error occurred", "error");
      }
    }
  }, [fetcher.data]);

  const handleEditQuote = (id: string, accessor: string, value: any) => {
    const updatedData = data.map((quote) =>
      quote.id === id ? { ...quote, [accessor]: value } : quote,
    );
    setData(updatedData);
  };

  const handleUpdateQuote = (id: string, updatedQuote: TransformedQuote) => {
    console.log("updatedQuote", updatedQuote);
    fetcher.submit(
      {
        ...updatedQuote,
        quoteId: id,
      },
      {
        method: "post",
        action: "/admin/quotes/update",
      },
    );
  };

  const handleDeleteQuote = (quote: TransformedQuote) => {
    fetcher.submit(
      { quoteId: quote.id },
      {
        method: "post",
        action: "/admin/quotes/delete",
      },
    );
  };

  const handleRestoreQuote = (quote: TransformedQuote) => {
    fetcher.submit(
      { quoteId: quote.id },
      {
        method: "post",
        action: "/admin/quotes/restore",
      },
    );
  };

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
        onEdit={handleEditQuote}
        onUpdate={handleUpdateQuote}
        onDelete={handleDeleteQuote}
        onRestore={handleRestoreQuote}
      />
    </div>
  );
};

export default QuotesTable;
