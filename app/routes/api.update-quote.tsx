import { json } from "@remix-run/node";
import { prisma } from "~/db.server";
import { requireUserId } from "~/session.server";

type CustomActionArgs = {
  request: Request;
  params: { quoteId?: string };
};

export async function action({ request, params }: CustomActionArgs) {
    console.log('REQUEST', request, 'PARAMS', params);
  const userId = await requireUserId(request);
  const quoteId = params.quoteId;

  if (!quoteId) {
    return json({ error: "Quote ID is required" }, { status: 400 });
  }

  const formData = await request.formData();

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const pickUpLocation = formData.get("pickUpLocation") as string;
  const dropOffLocation = formData.get("dropOffLocation") as string;
  const timeFramePickUp = formData.get("timeFramePickUp") as string;
  const healthCert = formData.get("healthCert") === "true";
  const comments = formData.get("comments") as string;

  if (!firstName || !lastName || !phoneNumber) {
    return json(
      { error: "First name, last name, and phone number are required" },
      { status: 400 },
    );
  }

  try {
    const updatedQuote = await prisma.quote.update({
      where: { id: quoteId },
      data: {
        firstName,
        lastName,
        phoneNumber,
        pickUpLocation,
        dropOffLocation,
        timeFramePickUp: new Date(timeFramePickUp),
        healthCert,
        comments,
        updatedAt: new Date(),
      },
    });

    return json({ updatedQuote });
  } catch (error) {
    console.error(error);
    return json({ error: "Failed to update quote" }, { status: 500 });
  }
}
