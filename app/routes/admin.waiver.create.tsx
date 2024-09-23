import { json, ActionFunction } from "@remix-run/node";
import { createWaiver, WaiverWithHorses } from "~/models/waiver.server";

export let action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  
  const firstName = formData.get("firstName")?.toString() || "";
  const lastName = formData.get("lastName")?.toString() || "";
  const phone = formData.get("phone")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const pickUpDate = formData.get("pickUpDate")?.toString() || "";
  const pickUpAddress = formData.get("pickUpAddress")?.toString() || "";
  const pickUpCity = formData.get("pickUpCity")?.toString() || "";
  const pickUpState = formData.get("pickUpState")?.toString() || "";
  const pickUpZip = formData.get("pickUpZip")?.toString() || "";
  const pickUpContactName = formData.get("pickUpContactName")?.toString() || "";
  const pickUpContactPhone = formData.get("pickUpContactPhone")?.toString() || "";
  const dropOffAddress = formData.get("dropOffAddress")?.toString() || "";
  const dropOffCity = formData.get("dropOffCity")?.toString() || "";
  const dropOffState = formData.get("dropOffState")?.toString() || "";
  const dropOffZip = formData.get("dropOffZip")?.toString() || "";
  const dropOffContactName = formData.get("dropOffContactName")?.toString() || "";
  const dropOffContactPhone = formData.get("dropOffContactPhone")?.toString() || "";
  const agreedBidAmount = formData.get("bidAmount")?.toString() || "";
  const cogginsHealthCert = formData.get("cogginsHealthCert") === "true";
  const terms = formData.get("terms") === "true";
  const comments = formData.get("comments")?.toString() || "";
  const horses = JSON.parse(formData.get("horses")?.toString() || "[]");

  try {
    const newWaiver: WaiverWithHorses = {
      firstName,
      lastName,
      phone,
      email,
      pickUpDate: new Date(pickUpDate),
      pickUpAddress,
      pickUpCity,
      pickUpState,
      pickUpZip,
      pickUpContactName,
      pickUpContactPhone,
      dropOffAddress,
      dropOffCity,
      dropOffState,
      dropOffZip,
      dropOffContactName,
      dropOffContactPhone,
      agreedBidAmount,
      cogginsHealthCert,
      terms,
      comments,
      horses: { create: horses },
    };

    const createdWaiver = await createWaiver(newWaiver);

    return json(createdWaiver);
  } catch (error) {
    console.error("Error creating waiver:", error);
    return json({ error: "Failed to create waiver" }, { status: 500 });
  }
};

