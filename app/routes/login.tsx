import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";
import Button from "~/components/button";

import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  const remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 },
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 },
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      { errors: { email: "Invalid email or password", password: null } },
      { status: 400 },
    );
  }

  return createUserSession({
    redirectTo,
    remember: remember === "on" ? true : false,
    request,
    userId: user.id,
  });
};

export const meta: MetaFunction = () => [{ title: "Login" }];

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/notes";
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="md:flex h-screen w-full bg-secondary">
      <div className="hidden md:flex w-full h-full justify-center items-center bg-secondary p-8">
        <img src="/assets/logo.png" alt="Logo" className="h-52 xl:h-72" />
      </div>
      <div className="w-full h-full flex justify-center items-center p-8 relative md:bg-tertiary">
        <div className="absolute md:hidden top-8 inset-x-0 flex justify-center items-center">
          <img src="/assets/logo.png" alt="Logo" className="h-44" />
        </div>
        <div className="flex flex-col max-w-2xl p-8 rounded-lg bg-white w-full">
          <h1 className="w-full text-xl md:text-2xl font-bold text-stone-700 mb-8">
            Sign in to your account
          </h1>
          <Form method="post" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-stone-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  ref={emailRef}
                  id="email"
                  required
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus={true}
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={actionData?.errors?.email ? true : undefined}
                  aria-describedby="email-error"
                  className="w-full rounded border border-stone-300 px-2 py-1.5 text-lg focus:border-primary focus:ring-primary focus:ring-1 focus:ring-opacity-50 text-sm"
                />
                {actionData?.errors?.email ? (
                  <div className="pt-1 text-red-700" id="email-error">
                    {actionData.errors.email}
                  </div>
                ) : null}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-stone-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  ref={passwordRef}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={
                    actionData?.errors?.password ? true : undefined
                  }
                  aria-describedby="password-error"
                  className="w-full rounded border border-stone-300 px-2 py-1.5 text-lg focus:border-primary focus:ring-primary focus:ring-1 focus:ring-opacity-50 text-sm"
                />
                {actionData?.errors?.password ? (
                  <div className="pt-1 text-red-700" id="password-error">
                    {actionData.errors.password}
                  </div>
                ) : null}
              </div>
            </div>

            <input type="hidden" name="redirectTo" value={redirectTo} />
            <Button
              primary
              className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
            >
              Log in
            </Button>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-stone-300 text-primary focus:ring-primary"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-stone-900"
                >
                  Remember me
                </label>
              </div>
              {/* <div className="text-center text-sm text-stone-500">
                Don&apos;t have an account?{" "}
                <Link
                  className="text-blue-500 underline"
                  to={{
                    pathname: "/join",
                    search: searchParams.toString(),
                  }}
                >
                  Sign up
                </Link>
              </div> */}
            </div>
          </Form>
        </div>
        <Link
          to="/"
          className="absolute bottom-4 right-4 bg-white px-2 py-1.5 rounded-md text-sm text-stone-700"
        >
          Visit Website
        </Link>
      </div>
    </div>
  );
}