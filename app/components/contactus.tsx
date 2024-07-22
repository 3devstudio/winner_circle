import Input from "./input";
import TextArea from "./textarea";
import Button from "./Button";

const ContactUs = () => {
  return (
    <div
      style={{ backgroundImage: "url('/assets/horses.jpeg')" }}
      className="relative w-full h-full md:h-[28rem] bg-no-repeat bg-cover bg-center bg-fixed flex justify-center items-center"
    >
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className="flex flex-col md:flex-row gap-8 w-full h-full max-w-7xl mx-auto z-20">
        {/* Left Side */}
        <div className="w-full h-full">
          <div className="absolute left-0 top-6 pl-8 pr-20 py-2 clip-angle-r-sm bg-primary flex flex-col gap-6">
            <h1 className="text-4xl font-bold text-secondary uppercase">
              Get in touch
            </h1>
          </div>
          <p className="absolute left-0 top-28 pl-8 text-tertiary w-full md:w-1/2">
            We would love to hear from you! Please feel free to reach out to us with any questions.
          </p>
        </div>
        {/* Right Side */}
        <div className="h-full w-1/2 absolute right-0 inset-y-0">
          <div className="bg-tertiary/75 h-full w-full flex flex-col gap-2 p-4">
            <Input label="Name" placeholder="First and Last Name" required={true} />
            <Input label="Email" placeholder="Email Address" required={true} />
            <Input label="Phone" placeholder="Phone Number" />
            <TextArea label="Message" placeholder="How can we help you?" required={true} />
            <div className="flex justify-end">
              <Button primary>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;