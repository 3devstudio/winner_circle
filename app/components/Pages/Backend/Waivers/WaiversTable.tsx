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
  waiverId: string;
  tripId: string;
}

interface WaiverWithHorses {
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
  horses: Horse[];
}

interface TransformedWaiver extends Omit<WaiverWithHorses, "horses"> {
  horses: string;
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
  waivers: WaiverWithHorses[];
}

interface FetcherData {
  error?: string;
  updatedWaiver?: TransformedWaiver;
}

const WaiversTable: React.FC<WaiversTableProps> = ({ waivers }) => {
  const transformedWaivers: TransformedWaiver[] = waivers.map((waiver) => ({
    ...waiver,
    horses: waiver.horses.map((horse: Horse) => horse.name).join(", "),
  }));

  const fetcher = useFetcher<FetcherData>();

  const handleEditWaiver = (id: string, accessor: string, value: any) => {
    const updatedWaivers = transformedWaivers.map((waiver) =>
      waiver.id === id ? { ...waiver, [accessor]: value } : waiver
    );
    // Assuming `setWaivers` is a state update function you would have if you wanted to update the state
    // setWaivers(updatedWaivers);
  };

  const handleUpdateWaiver = async (id: string, updatedWaiver: TransformedWaiver) => {
    fetcher.submit(
      { ...updatedWaiver },
      {
        method: "post",
        action: `/api/update-waiver/${id}`,
      },
    );
  };

  const handleDeleteWaiver = async (waiver: TransformedWaiver) => {
    fetcher.submit(
      { waiverId: waiver.id },
      {
        method: "post",
        action: "/api/delete-waiver",
      },
    );
  };

  const handleRestoreWaiver = async (waiver: TransformedWaiver) => {
    fetcher.submit(
      { waiverId: waiver.id },
      {
        method: "post",
        action: "/api/restore-waiver",
      },
    );
  };

  const columns: Column[] = [
    { header: "First Name", accessor: "firstName", dataType: "text" },
    { header: "Last Name", accessor: "lastName", dataType: "text" },
    { header: "Phone", accessor: "phone", dataType: "tel" },
    { header: "Email", accessor: "email", dataType: "email" },
    { header: "Pick Up Contact", accessor: "pickUpContact", dataType: "text" },
    { header: "Drop Off Contact", accessor: "dropOffContact", dataType: "text" },
    { header: "Pick Up Date", accessor: "pickUpDate", dataType: "date" },
    { header: "Pick Up Address", accessor: "pickUpAddress", dataType: "text" },
    { header: "Pick Up City", accessor: "pickUpCity", dataType: "text" },
    { header: "Pick Up State", accessor: "pickUpState", dataType: "select" },
    { header: "Pick Up Zip", accessor: "pickUpZip", dataType: "text" },
    { header: "Drop Off Address", accessor: "dropOffAddress", dataType: "text" },
    { header: "Drop Off City", accessor: "dropOffCity", dataType: "text" },
    { header: "Drop Off State", accessor: "dropOffState", dataType: "select" },
    { header: "Drop Off Zip", accessor: "dropOffZip", dataType: "text" },
    { header: "Agreed Bid Amount", accessor: "agreedBidAmount", dataType: "number" },
    { header: "Coggins Health Cert", accessor: "cogginsHealthCert", dataType: "checkbox" },
    { header: "Terms", accessor: "terms", dataType: "checkbox" },
    { header: "Comments", accessor: "comments", dataType: "longText" },
    { header: "Horses", accessor: "horses", dataType: "text" },
  ];

  return (
    <div>
      <BasicTable
        columns={columns}
        data={transformedWaivers}
        onDelete={handleDeleteWaiver}
        onRestore={handleRestoreWaiver}
        onEdit={handleEditWaiver}
        onUpdate={handleUpdateWaiver}
      />
    </div>
  );
};

export default WaiversTable;