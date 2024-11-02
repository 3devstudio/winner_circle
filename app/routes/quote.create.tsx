import { json, ActionFunction } from "@remix-run/node";
import { createQuote, QuoteCreateInputWithHorses } from "~/models/quote.server";

export let action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const firstName = formData.get("firstName")?.toString() || "";
  const lastName = formData.get("lastName")?.toString() || "";
  const phoneNumber = formData.get("phoneNumber")?.toString() || "";
  const pickUpLocation = formData.get("pickUpLocation")?.toString() || "";
  const dropOffLocation = formData.get("dropOffLocation")?.toString() || "";
  const timeFramePickUp = new Date(
    formData.get("timeFramePickUp")?.toString() || "",
  );
  const healthCert = formData.get("healthCert") === "true";
  const comments = formData.get("comments")?.toString() || "";
  const horses = JSON.parse(formData.get("horses")?.toString() || "[]");
  const openedAt = new Date();

  try {
    const newQuote: QuoteCreateInputWithHorses = {
      firstName,
      lastName,
      phoneNumber,
      pickUpLocation,
      dropOffLocation,
      timeFramePickUp,
      comments,
      healthCert,
      horses: {
        create: horses,
      },
      openedAt,
    };

    const createdQuote = await createQuote(newQuote);
    return json({ success: true, quote: createdQuote });
  } catch (error) {
    console.error("Error creating quote:", error);
    return json(
      { success: false, error: "Failed to create quote" },
      { status: 500 },
    );
  }
};
