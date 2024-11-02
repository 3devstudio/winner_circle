import React, { useState, useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BasicTable from "~/components/Blocks/Tables/BasicTable";

interface Horse {
  name: string;
  breed: string;
  gender: string;
  age: number;
  height: string;
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
    | "date"
    | "modal";
}

interface TransformedQuote extends Omit<Quote, "horses"> {
  horses: string; // For display
  originalHorses: Horse[]; // For editing
}

interface QuotesTableProps {
  quotes: Quote[];
}

interface FetcherResponse {
  success: boolean;
  message?: string;
  error?: string;
  updatedQuote?: Quote; // Include updated quote in response
}

const QuotesTable: React.FC<QuotesTableProps> = ({ quotes }) => {
  const [data, setData] = useState<TransformedQuote[]>(
    quotes.map((quote) => ({
      ...quote,
      horses: quote.horses.map((horse) => horse.name).join(", "), // String for display
      originalHorses: quote.horses, // Store original array
    }))
  );

  const fetcher = useFetcher<FetcherResponse>();
  const [toastShown, setToastShown] = useState(false); // Track if a toast has been shown

  const showToast = (message: string, type: "success" | "error") => {
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    // Only show a toast if there's new fetch data and a toast hasn't been shown
    if (fetcher.data && !toastShown) {
      if (fetcher.data.success) {
        if (fetcher.data.updatedQuote) {
          const updatedData = data.map((quote) =>
            quote.id === fetcher.data!.updatedQuote!.id
              ? {
                  ...quote, // Retain existing quote data
                  ...fetcher.data!.updatedQuote!, // Merge updated data
                  horses: Array.isArray(fetcher.data!.updatedQuote!.horses)
                    ? fetcher.data!.updatedQuote!.horses
                        .map((horse) => horse.name)
                        .join(", ")
                    : quote.horses, // Use existing horses if not updated
                  originalHorses: fetcher.data!.updatedQuote!.horses || quote.originalHorses, // Use existing or updated horses array
                }
              : quote
          );
          setData(updatedData);
        }
      } else if (fetcher.data.error) {
        showToast(fetcher.data.error, "error");
      }
      setToastShown(true); // Prevent further toasts until a new fetch
    }
  }, [fetcher.data, data, toastShown]);

  // Reset toastShown when a new fetch starts
  useEffect(() => {
    if (fetcher.state === "submitting") {
      setToastShown(false);
    }
  }, [fetcher.state]);

  const handleEditQuote = (id: string, accessor: string, value: any) => {
    const updatedData = data.map((quote) => {
      if (quote.id === id) {
        if (accessor === "horses") {
          return {
            ...quote,
            horses: value.map((horse: Horse) => horse.name).join(", "),
            originalHorses: value,
          };
        }
        return { ...quote, [accessor]: value };
      }
      return quote;
    });
    setData(updatedData);
  };

  const handleUpdateQuote = (id: string, updatedQuote: TransformedQuote) => {
    const formData = new FormData();
    formData.append("quoteId", id);
    formData.append("firstName", updatedQuote.firstName);
    formData.append("lastName", updatedQuote.lastName);
    formData.append("phoneNumber", updatedQuote.phoneNumber);
    formData.append("pickUpLocation", updatedQuote.pickUpLocation);
    formData.append("dropOffLocation", updatedQuote.dropOffLocation);
    formData.append("timeFramePickUp", updatedQuote.timeFramePickUp);
    formData.append("healthCert", updatedQuote.healthCert.toString());
    formData.append("comments", updatedQuote.comments);
    formData.append("horses", JSON.stringify(updatedQuote.originalHorses));

    fetcher.submit(formData, {
      method: "post",
      action: `/admin/quotes/update`,
    });
  };

  const handleDeleteQuote = (quote: TransformedQuote) => {
    fetcher.submit(
      { quoteId: quote.id },
      {
        method: "post",
        action: "/admin/quotes/delete",
      }
    );
  };

  const handleRestoreQuote = (quote: TransformedQuote) => {
    fetcher.submit(
      { quoteId: quote.id },
      {
        method: "post",
        action: "/admin/quotes/restore",
      }
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
    {
      header: "Horses",
      accessor: "horses",
      dataType: "modal",
    },
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
      <ToastContainer />
    </div>
  );
};

export default QuotesTable;