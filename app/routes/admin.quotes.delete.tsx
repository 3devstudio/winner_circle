import { ActionFunction, redirect } from '@remix-run/node';
import { softDeleteQuoteById } from '~/models/quote.server';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const quoteId = formData.get('quoteId') as string;

  if (quoteId) {
    await softDeleteQuoteById(quoteId);
  }

  return redirect('/admin/quotes');
};