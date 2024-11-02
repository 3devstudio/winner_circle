import type { MetaFunction } from "@remix-run/node";

import AppLayout from "~/layouts/AppLayout";
import QuickQuoteForm from "~/components/Forms/QuickQuoteForm";

export const meta: MetaFunction = () => [{ title: "Get a Quote" }];

export default function Contact() {
  return (
    <AppLayout>
      <QuickQuoteForm title="Get a quick quote today!"/>
    </AppLayout>
  );
}
