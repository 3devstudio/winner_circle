import { json, ActionFunction } from "@remix-run/node";
import { createQuote, QuoteCreateInputWithHorses } from "~/models/quote.server"; // Import the interface

export let action: ActionFunction = async ({ request }) => {
  console.log("API route hit");
  const data = await request.json();
  const {
    timeFramePickUp,
    pickUpLocation,
    dropOffLocation,
    firstName,
    lastName,
    phoneNumber,
    comments,
    healthCert,
    horses,
  } = data;

  try {
    const newQuote: QuoteCreateInputWithHorses = {
      firstName,
      lastName,
      phoneNumber,
      pickUpLocation,
      dropOffLocation,
      timeFramePickUp: new Date(timeFramePickUp),
      healthCert,
      comments,
      openedAt: new Date(),
      horses: {
        create: horses.map((horse: any) => ({
          name: horse.name,
          breed: horse.breed,
          gender: horse.gender,
          age: parseInt(horse.age),
          height: horse.height,
          trip: horse.tripId
            ? { connect: { id: horse.tripId } }
            : {
                create: {
                  firstName,
                  lastName,
                  phoneNumber,
                  email: "example@example.com",
                  pickUpDate: new Date(timeFramePickUp),
                  pickUpAddress: pickUpLocation,
                  pickUpContactName: `${firstName} ${lastName}`,
                  pickUpContactNumber: phoneNumber,
                  dropOffAddress: dropOffLocation,
                  dropOffContactName: `${firstName} ${lastName}`,
                  dropOffContactNumber: phoneNumber,
                  bidAmount: 0,
                  healthCert,
                  comments,
                },
              },
        })),
      },
    };

    const createdQuote = await createQuote(newQuote);

    return json(createdQuote, { status: 201 });
  } catch (error) {
    console.log("Error creating quote:", error);
    return json({ error: "Failed to create quote" }, { status: 500 });
  }
};