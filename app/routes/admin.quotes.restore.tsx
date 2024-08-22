import { json, ActionFunction } from "@remix-run/node";
import { restoreQuoteById } from "~/models/quote.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const quoteId = formData.get("quoteId") as string;

  if (quoteId) {
    await restoreQuoteById(quoteId);
  }

  return json({ success: true });
};