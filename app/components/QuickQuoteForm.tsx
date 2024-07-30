import React, { useState, useEffect } from "react";
import Input from "./Input";
import Textarea from "./Textarea";
import Button from "./Button";
import Breadcrumb from "./Breadcrumb";
import AddHorse from "./AddHorse";

interface Horse {
  name: string;
  breed: string;
  gender: string;
  age: string;
  height: string;
}

const QuickQuoteForm = () => {
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

  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false]);
  const [horses, setHorses] = useState<Horse[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({ ...prevData, termsChecked: e.target.checked }));
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

  const checkIfAllFieldsAreFilled = (data: typeof formData, horses: Horse[]) => {
    const contactFieldsFilled = areContactFieldsFilled(data);
    const transportFieldsFilled = areTransportFieldsFilled(data);
    const horsesFilled = areHorsesFilled(horses);

    const step1Completed = transportFieldsFilled && horsesFilled;
    const step2Completed = contactFieldsFilled;

    setCompletedSteps([step1Completed, step2Completed]);

    if (step === 1) {
      setIsNextEnabled(step1Completed);
    }

    setIsSubmitEnabled(step1Completed && step2Completed);
  };

  useEffect(() => {
    checkIfAllFieldsAreFilled(formData, horses);
  }, [formData, horses]);

  const handleStepChange = (newStep: number) => {
    setStep(newStep);
    checkIfAllFieldsAreFilled(formData, horses);
  };

  const handleNextClick = () => {
    if (isNextEnabled) {
      setStep(step + 1);
    }
  };

  const handleBackClick = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div
      style={{ backgroundImage: "url('/assets/horses.jpeg')" }}
      className="relative w-full h-full bg-no-repeat bg-cover bg-center bg-fixed flex justify-center items-center"
    >
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className="flex flex-col lg:flex-row w-full h-full z-20">
        {/* Left Side (Free Quote Header) */}
        <div className="w-full lg:w-1/2 min-h-[20rem] lg:min-h-[40rem] flex justify-center items-center">
          <h1 className="h-fit md:w-5/6 text-3xl md:text-4xl lg:text-4xl xl:text-6xl text-stone-100 font-semibold px-8 pb-8 pt-16 md:mt-0">
            Reliable Equine Transport, Every Mile of the Way.
          </h1>
        </div>
        {/* Right Side (Form) */}
        <div className="h-full w-full lg:w-1/2">
          <div className="bg-tertiary/75 h-full w-full min-h-[20rem] md:min-h-[40rem] flex flex-col gap-2 px-4 py-6">
            <Breadcrumb
              step={step}
              setStep={handleStepChange}
              completedSteps={completedSteps}
            />
            {step === 1 && (
              <>
                {/* Section 2: Horse Transport Details */}
                <div className="mb-4">
                  <h2 className="text-2xl text-stone-800 font-semibold mb-4">
                    Where is your precious cargo going?
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
                          onChange={(e) =>
                            handleInputChange("date", e.target.value)
                          }
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
                    <div className="w-full">
                      <AddHorse onAddHorse={handleAddHorse} horses={horses} />
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div className="w-40">
                    <Button
                      text="Next"
                      disabled={!isNextEnabled}
                      onClick={handleNextClick}
                      className={`mt-4 py-2 ${
                        isNextEnabled ? "bg-primary" : "bg-gray-400"
                      }`}
                    />
                  </div>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                {/* Section 1: Contact Information */}
                <div className="mb-4">
                  <h2 className="text-2xl text-stone-800 font-semibold mb-4">
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
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
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
                        I acknowledge a current Coggins and Health Certificate will be completed before pickup.
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button
                    text="Back"
                    onClick={handleBackClick}
                    className="mt-4 bg-secondary py-2"
                  />
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickQuoteForm;