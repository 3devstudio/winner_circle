import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { getHorseListItems } from "~/models/horse.server";
import { deleteQuote, getQuote } from "~/models/quote.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.quoteId, "quoteId not found");

  const quote = await getQuote(params.quoteId); // Pass only the quoteId
  if (!quote) {
    throw new Response("Not Found", { status: 404 });
  }

  const horses = await getHorseListItems({ quoteId: params.quoteId });
  if (!horses) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ quote, horses });
};

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.quoteId, "quoteId not found");

  await deleteQuote(params.quoteId); // Pass only the quoteId

  return redirect("admin/quotes");
};

export default function QuoteDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <p className="text-2xl font-bold">{data.quote.firstName} {data.quote.lastName}</p>
      <p className="py-6">{data.quote.phoneNumber}</p>
      <p className="py-6">{data.quote.pickUpLocation}</p>
      <p className="py-6">{data.quote.dropOffLocation}</p>
      <p className="py-6">{data.quote.timeFramePickUp}</p> 
      <p className="py-6">{data.quote.healthCert}</p>
      <p className="py-6">{data.quote.comments}</p>

      <div>
        {data.horses.map(horse => (
          <div key={horse.id} className="py-2">
            <p>{horse.breed}</p>
            <p>{horse.age}</p>
            <p>{horse.gender}</p>
            <p>{horse.height}</p>
          </div>
        ))}
      </div>

      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>An unexpected error occurred: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>;
  }

  if (error.status === 404) {
    return <div>Quote not found</div>;
  }

  return <div>An unexpected error occurred: {error.statusText}</div>;
}