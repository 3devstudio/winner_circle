import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";

import AppLayout from "~/layouts/AppLayout";
import BackgroundImage from "~/components/Blocks/BackgroundImage";
import Button from "~/components/Buttons/Button";
import Input from "~/components/Inputs/Input";
import Textarea from "~/components/Inputs/Textarea";
import AddHorse from "~/components/Pages/Frontend/Home/AddHorse";
import useSlideUp from "~/hooks/useSlideUp";

export const meta: MetaFunction = () => [{ title: "Get a Quote" }];

interface Horse {
  name: string;
  breed: string;
  gender: string;
  age: string;
  height: string;
}

interface AddHorseProps {
  onAddHorse: (addedHorses: Horse[]) => void;
  horses: Horse[];
  errors: { [key: string]: string }; // Add this interface for AddHorseProps
}

export default function Contact() {
  const [formData, setFormData] = useState({
    date: "",
    location: "",
    destination: "",
    numberOfHorses: "0",
    firstName: "",
    lastName: "",
    phone: "",
    comments: "",
    termsChecked: false,
  });

  const [formRef, formVisible] = useSlideUp<HTMLDivElement>();
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [horses, setHorses] = useState<Horse[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      termsChecked: e.target.checked,
    }));
  };

  const areTransportFieldsFilled = (data: typeof formData) => {
    return (
      data.date.trim() !== "" &&
      data.location.trim() !== "" &&
      data.destination.trim() !== "" &&
      data.numberOfHorses !== "0"
    );
  };

  const areContactFieldsFilled = (data: typeof formData) => {
    return (
      data.firstName.trim() !== "" &&
      data.lastName.trim() !== "" &&
      data.phone.trim() !== "" &&
      data.comments.trim() !== "" &&
      data.termsChecked
    );
  };

  const handleAddHorse = (addedHorses: Horse[]) => {
    setHorses(addedHorses);
    setFormData((prevData) => ({
      ...prevData,
      numberOfHorses: addedHorses.length.toString(),
    }));
  };

  const areHorsesFilled = (horses: Horse[]) => {
    return horses.every(
      (horse) =>
        horse.name.trim() !== "" &&
        horse.breed.trim() !== "" &&
        horse.gender.trim() !== "" &&
        horse.age.trim() !== "" &&
        horse.height.trim() !== "",
    );
  };

  const checkIfAllFieldsAreFilled = (
    data: typeof formData,
    horses: Horse[],
  ) => {
    const contactFieldsFilled = areContactFieldsFilled(data);
    const transportFieldsFilled = areTransportFieldsFilled(data);
    const horsesFilled = areHorsesFilled(horses);

    const step1Completed = transportFieldsFilled && horsesFilled;
    const step2Completed = contactFieldsFilled;

    setIsSubmitEnabled(step1Completed && step2Completed);
  };

  useEffect(() => {
    checkIfAllFieldsAreFilled(formData, horses);
  }, [formData, horses, checkIfAllFieldsAreFilled]);

  return (
    <AppLayout>
      <BackgroundImage
        image="/assets/truck_and_trailer.jpg"
        size="sm"
      >
        <div className="text-white text-center">
          <h1 className="text-4xl md:text-6xl font-semibold">Get a Quote</h1>
        </div>
      </BackgroundImage>
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-4 md:gap-8 p-4 md:p-8">
        <h1 className="text-xl md:text-2xl font-semibold text-stone-800">
          Get a free, no obligation quote today!
        </h1>
        <div className="bg-white rounded-lg border border-stone-200 p-8">
          <div ref={formRef} className={`flex flex-col gap-4 slide-up ${formVisible ? "show" : ""}`}>
            {/* Section 1: Contact Information */}
            <div className="mb-4">
              <h2 className="text-lg text-stone-800 font-semibold mb-4">
                Horse Transport Details
              </h2>
              <div className="flex flex-col gap-4">
                <div className="w-full flex">
                  <div className="w-1/2">
                    <Input
                      label="When do you need transport?"
                      type="date"
                      placeholder="Select a date"
                      required={true}
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 w-full">
                  <div className="w-full">
                    <Input
                      label="Moving From"
                      placeholder="State & Zip Code"
                      required={true}
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      label="Moving To"
                      placeholder="State & Zip Code"
                      required={true}
                      value={formData.destination}
                      onChange={(e) =>
                        handleInputChange("destination", e.target.value)
                      }
                    />
                  </div>
                </div>
                <AddHorse onAddHorse={handleAddHorse} horses={horses} errors={errors} />
              </div>
            </div>
            {/* Section 2: Horse Transport Details */}
            <div className="mb-4">
              <h2 className="text-lg text-stone-800 font-semibold mb-4">
                Contact Information
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full">
                    <Input
                      label="First Name"
                      placeholder="First Name"
                      required={true}
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                    />
                  </div>
                  <div className="w-full">
                    <Input
                      label="Last Name"
                      placeholder="Last Name"
                      required={true}
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <Input
                    label="Phone"
                    placeholder="Phone Number"
                    required={true}
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <Textarea
                    label="Additional Comments"
                    placeholder="Anything else we should know?"
                    value={formData.comments}
                    onChange={(e) =>
                      handleInputChange("comments", e.target.value)
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    required
                    checked={formData.termsChecked}
                    onChange={handleCheckboxChange}
                    className="form-checkbox h-4 w-4 text-primary rounded-sm border-stone-300 focus:ring-2 focus:ring-primary"
                  />
                  <label htmlFor="terms" className="text-stone-600 text-sm">
                    I acknowledge a current Coggins and Health Certificate will be
                    completed before pickup.
                  </label>
                </div>
              </div>
            </div>
            <div>
              <Button
                primary
                text="Submit"
                disabled={!isSubmitEnabled}
                onClick={() => alert("Form submitted")}
                className={`mt-4 py-2 ${
                  isSubmitEnabled ? "bg-primary" : "bg-primary/50"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}