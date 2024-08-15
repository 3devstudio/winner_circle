import { json, ActionFunction } from "@remix-run/node";
import { createWaiver, WaiverCreateInput } from "~/models/waiver.server";

export let action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log("FORM DATA:", formData);
  const firstName = formData.get("first-name")?.toString() || "";
  const lastName = formData.get("last-name")?.toString() || "";
  const phone = formData.get("phone")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const isUserContact = formData.get("applicantIsContact") === "yes";
  const pickUpDate = formData.get("pick-up-date")?.toString() || "";
  const pickUpAddress = formData.get("pick-up-address")?.toString() || "";
  const pickUpCity = formData.get("pick-up-city")?.toString() || "";
  const pickUpState = formData.get("pick-up-state")?.toString() || "";
  const pickUpZip = formData.get("pick-up-zip")?.toString() || "";
  const dropOffAddress = formData.get("drop-off-address")?.toString() || "";
  const dropOffCity = formData.get("drop-off-city")?.toString() || "";
  const dropOffState = formData.get("drop-off-state")?.toString() || "";
  const dropOffZip = formData.get("drop-off-zip")?.toString() || "";
  const agreedBidAmount = formData.get("bid-amount")?.toString() || "";
  const cogginsHealthCert = formData.get("coggins-health-cert") === "true";
  const terms = formData.get("terms") === "true";
  const comments = formData.get("comments")?.toString();
  const horses = JSON.parse(formData.get("horses")?.toString() || "[]");

  try {
    const newWaiver: WaiverCreateInput = {
      firstName,
      lastName,
      phone,
      email,
      isUserContact,
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
      horses,
    };

    const createdWaiver = await createWaiver(newWaiver);

    return json(createdWaiver);
  } catch (error) {
    console.error("Error creating waiver:", error);
    return json({ error: "Failed to create waiver" }, { status: 500 });
  }
};

