import { ActionFunction, redirect } from '@remix-run/node';
import { softDeleteUserById } from '~/models/user.server';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const userId = formData.get('userId') as string;

  if (userId) {
    await softDeleteUserById(userId);
  }

  return redirect('/admin/users');
};