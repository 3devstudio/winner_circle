// app/routes/admin/waivers/update.tsx

import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { updateWaiver, getWaiverById } from "~/models/waiver.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  
  const waiverId = formData.get("waiverId") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const isUserContact = formData.get("isUserContact") === "true";
  const pickUpContact = formData.get("pickUpContact") as string;
  const dropOffContact = formData.get("dropOffContact") as string;
  const pickUpDate = formData.get("pickUpDate") as string;
  const pickUpAddress = formData.get("pickUpAddress") as string;
  const pickUpCity = formData.get("pickUpCity") as string;
  const pickUpState = formData.get("pickUpState") as string;
  const pickUpZip = formData.get("pickUpZip") as string;
  const dropOffAddress = formData.get("dropOffAddress") as string;
  const dropOffCity = formData.get("dropOffCity") as string;
  const dropOffState = formData.get("dropOffState") as string;
  const dropOffZip = formData.get("dropOffZip") as string;
  const agreedBidAmount = formData.get("agreedBidAmount") as string;
  const cogginsHealthCert = formData.get("cogginsHealthCert") === "true";
  const terms = formData.get("terms") === "true";
  const comments = formData.get("comments") as string;
  const horses = JSON.parse(formData.get("horses") as string);

  // Update waiver with associated horses
  try {
    const existingWaiver = await getWaiverById(waiverId);
    if (!existingWaiver) {
      return json({ success: false, error: "Waiver not found" }, { status: 404 });
    }

    const updatedWaiver = await updateWaiver(waiverId, {
      firstName,
      lastName,
      phone,
      email,
      isUserContact,
      pickUpContact,
      dropOffContact,
      pickUpDate: new Date(pickUpDate),
      pickUpAddress,
      pickUpCity,
      pickUpState,
      pickUpZip,
      dropOffAddress,
      dropOffCity,
      dropOffState,
      dropOffZip,
      agreedBidAmount,
      cogginsHealthCert,
      terms,
      comments,
    }, horses); // Pass horses separately

    return json({ success: true, message: "Waiver updated successfully", updatedWaiver });
  } catch (error) {
    console.error("Error updating waiver:", error);
    return json({ success: false, error: "Failed to update waiver" }, { status: 500 });
  }
};