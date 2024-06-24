import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [{ title: "Winner Circle" }];

export default function SubmitReview() {
  return (
    <div className="w-[90%] mx-auto mt-10">
      <form action="post">
        <div className="space-y-12">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">Leave A Review</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Feel free to leave us a review!</p>

            <fieldset className="mt-10">
              <legend className="block text-sm font-medium leading-6 text-gray-900">Can we publish your testimonial on our website?</legend>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-x-3">
                  <input type="radio" id="publish-yes" name="publish" className="h-4 w-4 border-gray-300 text-dark-green focus:ring-dark-green" />
                  <label htmlFor="publish-yes" className="block text-sm font-medium leading-6 text-gray-900">Yes</label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input type="radio" id="publish-no" name="publish" className="h-4 w-4 border-gray-300 text-dark-green focus:ring-dark-green" />
                  <label htmlFor="publish-no" className="block text-sm font-medium leading-6 text-gray-900">No</label>
                </div>
              </div>
            </fieldset>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                <div className="mt-2">
                  <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                <div className="mt-2">
                  <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" required />
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                <div className="mt-2">
                  <input type="email" id="email" name="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="example@example.com" required />
                </div>
              </div>
            </div>

            <div className="mt-10 col-span-full">
              <label htmlFor="review" className="block text-sm font-medium leading-6 text-gray-900">Leave Your Review</label>
              <div className="mt-2">
                <textarea id="review" name="review" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
              </div>
            </div>

            <div className="mt-10 col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">Upload Photo</label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                  </svg>
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <button type="button" className="mt-4 bg-dark-green text-white py-2 px-4 rounded hover:bg-winners-orange">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}