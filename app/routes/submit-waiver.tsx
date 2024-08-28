import type { MetaFunction } from "@remix-run/node";
import BackgroundImage from "~/components/Blocks/BackgroundImage";
import AppLayout from "~/layouts/AppLayout";
import WaiverForm from "~/components/Forms/WaiverForm";

export const meta: MetaFunction = () => [{ title: "Sumbit Waiver" }];

export default function Waiver() {
  return (
    <AppLayout>
      <div className="flex flex-col">
        <BackgroundImage image="/assets/img/home_background.jpeg" size="md">
          <div className="text-white text-center">
            <h1 className="text-4xl md:text-6xl font-semibold">Book Now</h1>
            <p className="text-lg md:text-2xl">
              Ready to book your next transport? Fill out the form below to get
              started.
            </p>
          </div>
        </BackgroundImage>
        <div className="flex justify-center items-center p-4 md:p-8">
          <div className="w-full max-w-6xl mx-auto bg-white rounded-lg border border-stone-200 p-4 md:p-8">
            <WaiverForm />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
