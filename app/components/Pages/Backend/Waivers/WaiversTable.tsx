import React, { useState, useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BasicTable from "~/components/Blocks/Tables/BasicTable";

interface Horse {
  id: string;
  name: string;
  breed: string;
  gender: string;
  age: number;
  height: string;
}

interface Waiver {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isUserContact: boolean;
  pickUpContact?: string;
  dropOffContact?: string;
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
  horses: Horse[];
}

interface TransformedWaiver extends Omit<Waiver, "horses"> {
  horses: string;
  originalHorses: Horse[];
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
    | "number"
    | "email";
}

interface WaiversTableProps {
  waivers: Waiver[];
}

interface FetcherResponse {
  success: boolean;
  message?: string;
  error?: string;
  updatedWaiver?: Waiver;
}

const WaiversTable: React.FC<WaiversTableProps> = ({ waivers }) => {
  const [data, setData] = useState<TransformedWaiver[]>(
    waivers.map((waiver) => ({
      ...waiver,
      horses: waiver.horses.map((horse) => horse.name).join(", "),
      originalHorses: waiver.horses,
    })),
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
        if (fetcher.data.updatedWaiver) {
          const updatedData = data.map((waiver) =>
            waiver.id === fetcher.data!.updatedWaiver!.id
              ? {
                  ...waiver, // Retain existing waiver data
                  ...fetcher.data!.updatedWaiver!, // Merge updated data
                  horses: Array.isArray(fetcher.data!.updatedWaiver!.horses)
                    ? fetcher
                        .data!.updatedWaiver!.horses.map((horse) => horse.name)
                        .join(", ")
                    : waiver.horses, // Use existing horses if not updated
                  originalHorses:
                    fetcher.data!.updatedWaiver!.horses ||
                    waiver.originalHorses, // Use existing or updated horses array
                }
              : waiver,
          );
          setData(updatedData);
        }
      } else if (fetcher.data.error) {
        showToast(fetcher.data.error, "error");
      }
      setToastShown(true);
    }
  }, [fetcher.data, data, toastShown]);

  useEffect(() => {
    if (fetcher.state === "submitting") {
      setToastShown(false);
    }
  }, [fetcher.state]);

  const handleEditWaiver = (id: string, accessor: string, value: any) => {
    const updatedData = data.map((waiver) => {
      if (waiver.id === id) {
        if (accessor === "horses") {
          return {
            ...waiver,
            horses: value.map((horse: Horse) => horse.name).join(", "),
            originalHorses: value,
          };
        }
        if (
          accessor === "isUserContact" ||
          accessor === "cogginsHealthCert" ||
          accessor === "terms"
        ) {
          // Convert these specific fields to booleans
          return { ...waiver, [accessor]: value === "true" || value === true };
        }
        return { ...waiver, [accessor]: value };
      }
      return waiver;
    });
    setData(updatedData);
  };

  const handleUpdateWaiver = (id: string, updatedWaiver: TransformedWaiver) => {
    const formData = new FormData();
    formData.append("waiverId", id);
    formData.append("firstName", updatedWaiver.firstName);
    formData.append("lastName", updatedWaiver.lastName);
    formData.append("phone", updatedWaiver.phone);
    formData.append("email", updatedWaiver.email);
    formData.append("isUserContact", updatedWaiver.isUserContact ? "true" : "false");
    formData.append("pickUpContact", updatedWaiver.pickUpContact || "");
    formData.append("dropOffContact", updatedWaiver.dropOffContact || "");
    formData.append("pickUpDate", updatedWaiver.pickUpDate);
    formData.append("pickUpAddress", updatedWaiver.pickUpAddress);
    formData.append("pickUpCity", updatedWaiver.pickUpCity);
    formData.append("pickUpState", updatedWaiver.pickUpState);
    formData.append("pickUpZip", updatedWaiver.pickUpZip);
    formData.append("dropOffAddress", updatedWaiver.dropOffAddress);
    formData.append("dropOffCity", updatedWaiver.dropOffCity);
    formData.append("dropOffState", updatedWaiver.dropOffState);
    formData.append("dropOffZip", updatedWaiver.dropOffZip);
    formData.append("agreedBidAmount", updatedWaiver.agreedBidAmount);
    formData.append("cogginsHealthCert", updatedWaiver.cogginsHealthCert ? "true" : "false");
    formData.append("terms", updatedWaiver.terms ? "true" : "false");
    formData.append("comments", updatedWaiver.comments);
    formData.append("horses", JSON.stringify(updatedWaiver.originalHorses));
  
    fetcher.submit(formData, {
      method: "post",
      action: `/admin/waivers/update`,
    });
  };  

  const handleDeleteWaiver = async (waiver: TransformedWaiver) => {
    fetcher.submit(
      { waiverId: waiver.id },
      {
        method: "post",
        action: "/admin/waivers/delete",
      },
    );
  };

  const handleRestoreWaiver = async (waiver: TransformedWaiver) => {
    fetcher.submit(
      { waiverId: waiver.id },
      {
        method: "post",
        action: "/admin/waivers/restore",
      },
    );
  };

  const columns: Column[] = [
    { header: "First Name", accessor: "firstName", dataType: "text" },
    { header: "Last Name", accessor: "lastName", dataType: "text" },
    { header: "Phone", accessor: "phone", dataType: "tel" },
    { header: "Email", accessor: "email", dataType: "email" },
    { header: "Pick Up Contact", accessor: "pickUpContact", dataType: "text" },
    {
      header: "Drop Off Contact",
      accessor: "dropOffContact",
      dataType: "text",
    },
    { header: "Pick Up Date", accessor: "pickUpDate", dataType: "date" },
    { header: "Pick Up Address", accessor: "pickUpAddress", dataType: "text" },
    { header: "Pick Up City", accessor: "pickUpCity", dataType: "text" },
    { header: "Pick Up State", accessor: "pickUpState", dataType: "select" },
    { header: "Pick Up Zip", accessor: "pickUpZip", dataType: "text" },
    {
      header: "Drop Off Address",
      accessor: "dropOffAddress",
      dataType: "text",
    },
    { header: "Drop Off City", accessor: "dropOffCity", dataType: "text" },
    { header: "Drop Off State", accessor: "dropOffState", dataType: "select" },
    { header: "Drop Off Zip", accessor: "dropOffZip", dataType: "text" },
    {
      header: "Agreed Bid Amount",
      accessor: "agreedBidAmount",
      dataType: "number",
    },
    {
      header: "Coggins Health Cert",
      accessor: "cogginsHealthCert",
      dataType: "checkbox",
    },
    { header: "Terms", accessor: "terms", dataType: "checkbox" },
    { header: "Comments", accessor: "comments", dataType: "longText" },
    { header: "Horses", accessor: "horses", dataType: "text" },
  ];

  return (
    <div>
      <BasicTable
        columns={columns}
        data={data}
        onEdit={handleEditWaiver}
        onUpdate={handleUpdateWaiver}
        onDelete={handleDeleteWaiver}
        onRestore={handleRestoreWaiver}
      />
      <ToastContainer />
    </div>
  );
};

export default WaiversTable;
