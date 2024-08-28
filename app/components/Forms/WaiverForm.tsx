import { useFetcher } from "@remix-run/react";
import { useState, useEffect } from "react";

import Breadcrumb from "~/components/Pages/Frontend/Home/Breadcrumb";
import Input from "~/components/Inputs/Input";
import Select from "~/components/Inputs/Select";
import Textarea from "~/components/Inputs/Textarea";
import AddHorse from "~/components/Pages/Frontend/Home/AddHorse";
import Button from "~/components/Buttons/Button";
import ResponseMessage from "~/components/Blocks/Messaging/ResponseMessage";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/solid";

interface Horse {
  name: string;
  breed: string;
  gender: string;
  age: number;
  height: string;
}

interface FetcherData {
  error?: string;
  [key: string]: any;
}

export default function WaiverForm() {
  const fetcher = useFetcher<FetcherData>();
  const [horses, setHorses] = useState<Horse[]>([]);
  const [isUserContact, setIsUserContact] = useState<boolean>(true);
  const [step, setStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [formValues, setFormValues] = useState<Record<string, string>>({
    isUserContact: "yes",
  });
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [responseType, setResponseType] = useState<
    "success" | "error" | "info" | "warning" | undefined
  >(undefined);

  const resetCompletedSteps = () => {
    setCompletedSteps([]);
  };

  const [isSameContactAsPickup, setIsSameContactAsPickup] =
    useState<boolean>(false);
  const [isSameAsPickup, setIsSameAsPickup] = useState<boolean>(false);

  const handleContactChange = (value: string) => {
    setIsUserContact(value === "yes");
    setFormValues((prev) => ({ ...prev, isUserContact: value }));
  };

  const handleInputChange = (name: string, value: string) => {
    setFormValues((prev) => {
      const updatedValues = { ...prev, [name]: value };

      if (
        isSameAsPickup &&
        name.startsWith("pickUp") &&
        !name.includes("Contact")
      ) {
        const dropOffField = name.replace("pickUp", "dropOff");
        updatedValues[dropOffField] = value;
      }

      if (
        isSameContactAsPickup &&
        name.startsWith("pickUp") &&
        name.includes("Contact")
      ) {
        const dropOffContactField = name.replace("pickUp", "dropOff");
        updatedValues[dropOffContactField] = value;
      }

      return updatedValues;
    });
  };

  const handleSameAsPickUpChange = (isChecked: boolean) => {
    setIsSameAsPickup(isChecked);
    setFormValues((prev) => ({
      ...prev,
      sameAsPickUp: isChecked ? "true" : "false",
      dropOffAddress: isChecked ? prev.pickUpAddress || "" : "",
      dropOffCity: isChecked ? prev.pickUpCity || "" : "",
      dropOffState: isChecked ? prev.pickUpState || "" : "",
      dropOffZip: isChecked ? prev.pickUpZip || "" : "",
    }));
  };

  const handleSameContactAsPickupChange = (isChecked: boolean) => {
    setIsSameContactAsPickup(isChecked);
    setFormValues((prev) => ({
      ...prev,
      dropOffName: isChecked ? prev.pickUpName || "" : "",
      dropOffPhone: isChecked ? prev.pickUpPhone || "" : "",
    }));
  };

  const handleAddHorse = (newHorses: Horse[]) => {
    setHorses(newHorses);
  };

  const validateStep = (nextStep: number): boolean => {
    let isValid = true;
    const newErrors: Record<string, string | undefined> = {};

    if (step === 1) {
      if (!formValues.firstName) {
        newErrors.firstName = "First name is required.";
        isValid = false;
      }

      if (!formValues.lastName) {
        newErrors.lastName = "Last name is required.";
        isValid = false;
      }

      if (!formValues.phone) {
        newErrors.phone = "Phone number is required.";
        isValid = false;
      }

      if (!isUserContact) {
        if (!formValues.pickUpName) {
          newErrors.pickUpName = "Pick up contact name is required.";
          isValid = false;
        }

        if (!formValues.pickUpPhone) {
          newErrors.pickUpPhone = "Pick up contact phone number is required.";
          isValid = false;
        }

        if (!isSameContactAsPickup) {
          if (!formValues.dropOffName) {
            newErrors.dropOffName = "Drop off contact name is required.";
            isValid = false;
          }

          if (!formValues.dropOffPhone) {
            newErrors.dropOffPhone = "Drop off contact phone number is required.";
            isValid = false;
          }
        }
      }
    }
    if (step === 2) {
      if (!formValues.pickUpDate) {
        newErrors.pickUpDate = "Pick up date is required.";
        isValid = false;
      }
      if (!formValues.pickUpAddress) {
        newErrors.pickUpAddress = "Pick up address is required.";
        isValid = false;
      }
      if (!formValues.pickUpCity) {
        newErrors.pickUpCity = "Pick up city is required.";
        isValid = false;
      }
      if (!formValues.pickUpState) {
        newErrors.pickUpState = "Pick up state is required.";
        isValid = false;
      }
      if (!formValues.pickUpZip) {
        newErrors.pickUpZip = "Pick up zip code is required.";
        isValid = false;
      }
      if (!isSameAsPickup) {
        if (!formValues.dropOffAddress) {
          newErrors.dropOffAddress = "Drop off address is required.";
          isValid = false;
        }
        if (!formValues.dropOffCity) {
          newErrors.dropOffCity = "Drop off city is required.";
          isValid = false;
        }
        if (!formValues.dropOffState) {
          newErrors.dropOffState = "Drop off state is required.";
          isValid = false;
        }
        if (!formValues.dropOffZip) {
          newErrors.dropOffZip = "Drop off zip code is required.";
          isValid = false;
        }
      }
    }
    if (step === 3) {
      if (horses.length === 0) {
        newErrors.horses = "At least one horse is required.";
        isValid = false;
      }
    }
    if (step === 4) {
      if (!formValues.bidAmount) {
        newErrors.bidAmount = "Bid amount is required.";
        isValid = false;
      }
      if (!formValues.cogginsHealthCert) {
        newErrors.cogginsHealthCert = "Coggins and health certificate is required.";
        isValid = false;
      }
      if (!formValues.terms) {
        newErrors.terms = "Terms and conditions are required.";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleStepChange = (newStep: number) => {
    if (newStep > step && !validateStep(newStep)) {
      return;
    }

    if (newStep > step) {
      setCompletedSteps((prev) => {
        const newCompletedSteps = [...prev];
        newCompletedSteps[step - 1] = true;
        return newCompletedSteps;
      });
    }

    setStep(newStep);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateStep(step + 1)) {
      return;
    }

    console.log("FORM DATA (WaiverForm.tsx):", formValues, horses);

    const formData = new FormData();

    for (const key in formValues) {
      formData.append(key, formValues[key]);
    }

    formData.append("horses", JSON.stringify(horses));

    fetcher.submit(formData, {
      method: "post",
      action: "/admin/waiver/create",
    });
  };

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.error) {
        setResponseMessage("Failed to submit the waiver. Please try again.");
        setResponseType("error");
      } else {
        setResponseMessage(
          "Thanks! Your waiver submitted successfully. We will be in contact with you shortly."
        );
        setResponseType("success");

        setFormValues({ isUserContact: "yes" });
        setHorses([]);
        setIsUserContact(true);
        setIsSameAsPickup(false);
        setIsSameContactAsPickup(false);
        setErrors({});
        setStep(1);
        resetCompletedSteps();
      }
    }
  }, [fetcher.data]);

  const stateOptions = [
    { label: "Alabama", value: "AL" },
    { label: "Alaska", value: "AK" },
    { label: "Arizona", value: "AZ" },
    { label: "Arkansas", value: "AR" },
    { label: "California", value: "CA" },
    { label: "Colorado", value: "CO" },
    { label: "Connecticut", value: "CT" },
    { label: "Delaware", value: "DE" },
    { label: "Florida", value: "FL" },
    { label: "Georgia", value: "GA" },
    { label: "Hawaii", value: "HI" },
    { label: "Idaho", value: "ID" },
    { label: "Illinois", value: "IL" },
    { label: "Indiana", value: "IN" },
    { label: "Iowa", value: "IA" },
    { label: "Kansas", value: "KS" },
    { label: "Kentucky", value: "KY" },
    { label: "Louisiana", value: "LA" },
    { label: "Maine", value: "ME" },
    { label: "Maryland", value: "MD" },
    { label: "Massachusetts", value: "MA" },
    { label: "Michigan", value: "MI" },
    { label: "Minnesota", value: "MN" },
    { label: "Mississippi", value: "MS" },
    { label: "Missouri", value: "MO" },
    { label: "Montana", value: "MT" },
    { label: "Nebraska", value: "NE" },
    { label: "Nevada", value: "NV" },
    { label: "New Hampshire", value: "NH" },
    { label: "New Jersey", value: "NJ" },
    { label: "New Mexico", value: "NM" },
    { label: "New York", value: "NY" },
    { label: "North Carolina", value: "NC" },
    { label: "North Dakota", value: "ND" },
    { label: "Ohio", value: "OH" },
    { label: "Oklahoma", value: "OK" },
    { label: "Oregon", value: "OR" },
    { label: "Pennsylvania", value: "PA" },
    { label: "Rhode Island", value: "RI" },
    { label: "South Carolina", value: "SC" },
    { label: "South Dakota", value: "SD" },
    { label: "Tennessee", value: "TN" },
    { label: "Texas", value: "TX" },
    { label: "Utah", value: "UT" },
    { label: "Vermont", value: "VT" },
    { label: "Virginia", value: "VA" },
    { label: "Washington", value: "WA" },
    { label: "West Virginia", value: "WV" },
    { label: "Wisconsin", value: "WI" },
    { label: "Wyoming", value: "WY" },
  ];

  return (
    <fetcher.Form
      method="post"
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
    >
      <Breadcrumb
        step={step}
        setStep={handleStepChange}
        steps={[
          "Contact Information",
          "Transportation Details",
          "Horses",
          "Confirmation",
        ]}
        completedSteps={completedSteps}
        resetCompletedSteps={resetCompletedSteps}
      />
      <ResponseMessage
        message={responseMessage}
        clearMessage={() => setResponseMessage(null)}
        type={responseType}
      />

      {/* Sections */}
      {step === 1 && (
        <div id="contact-information" className="flex flex-col gap-8">
          <h1 className="text-xl text-2xl text-stone-900 font-semibold border-b border-stone-200 pb-2">
            Contact Information
          </h1>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <Input
                  label="First Name"
                  placeholder="Your First Name"
                  name="firstName"
                  type="text"
                  required
                  error={errors.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  value={formValues.firstName || ""}
                />
              </div>
              <div className="w-full">
                <Input
                  label="Last Name"
                  placeholder="Your Last Name"
                  name="lastName"
                  type="text"
                  required
                  error={errors.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  value={formValues.lastName || ""}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <Input
                  label="Phone Number"
                  placeholder="Your Phone Number"
                  name="phone"
                  type="tel"
                  required
                  error={errors.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  value={formValues.phone || ""}
                />
              </div>

              <div className="w-full">
                <Input
                  label="Email"
                  placeholder="Your Email"
                  name="email"
                  type="email"
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  value={formValues.email || ""}
                />
              </div>
            </div>
            <fieldset>
              <legend className="block text-sm leading-6 text-gray-800">
                Will you be the contact when we pick up and drop off?
              </legend>
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-x-3">
                  <input
                    type="radio"
                    id="pickUpYes"
                    name="isUserContact"
                    value="yes"
                    className="form-checkbox h-4 w-4 text-primary rounded-sm border-stone-300 focus:ring-2 focus:ring-primary cursor-pointer"
                    onChange={(e) => handleContactChange(e.target.value)}
                    checked={formValues.isUserContact === "yes"}
                  />
                  <label
                    htmlFor="pickUpYes"
                    className="block text-sm leading-6 text-gray-900 font-light"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    type="radio"
                    id="pickUpNo"
                    name="isUserContact"
                    value="no"
                    className="form-checkbox h-4 w-4 text-primary rounded-sm border-stone-300 focus:ring-2 focus:ring-primary cursor-pointer"
                    onChange={(e) => handleContactChange(e.target.value)}
                    checked={formValues.isUserContact === "no"}
                  />
                  <label
                    htmlFor="pickUpNo"
                    className="block text-sm leading-6 text-gray-900 font-light"
                  >
                    No
                  </label>
                </div>
              </div>
            </fieldset>
            {!isUserContact && (
              <>
                <fieldset>
                  <div className="flex flex-col gap-4">
                    <legend className="block text-sm leading-6 text-gray-900 font-semibold">
                      Contact at Pick Up
                    </legend>
                    <div className="flex flex-col md:flex-row gap-2">
                      <div className="w-full md:w-1/2">
                        <Input
                          label="Name"
                          placeholder="Contact's name"
                          name="pickUpName"
                          type="text"
                          required
                          error={errors.pickUpName}
                          onChange={(e) => handleInputChange("pickUpName", e.target.value)}
                          value={formValues.pickUpName || ""}
                        />
                      </div>
                      <div className="w-full">
                        <Input
                          label="Phone Number"
                          placeholder="Contact's phone number"
                          name="pickUpPhone"
                          type="tel"
                          required
                          error={errors.pickUpPhone}
                          onChange={(e) => handleInputChange("pickUpPhone", e.target.value)}
                          value={formValues.pickUpPhone || ""}
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>

                <fieldset>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between md:justify-start gap-2">
                      <legend className="block text-sm leading-6 text-gray-900 font-semibold">
                        Contact at Drop Off
                      </legend>
                      <div className="flex gap-1">
                        <input
                          type="checkbox"
                          id="sameContactAsPickUp"
                          name="sameContactAsPickUp"
                          className="form-checkbox h-4 w-4 text-primary rounded-sm border-stone-300 focus:ring-2 focus:ring-primary cursor-pointer my-auto"
                          onChange={(e) => handleSameContactAsPickupChange(e.target.checked)}
                          checked={isSameContactAsPickup}
                        />
                        <label
                          htmlFor="sameContactAsPickUp"
                          className="block text-xs md:text-sm leading-6 text-gray-900 my-auto font-light"
                        >
                          Same as pick up contact
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 mt=2">
                      <div className="w-full md:w-1/2">
                        <Input
                          label="Name"
                          placeholder="Contact's name"
                          name="dropOffName"
                          type="text"
                          required
                          error={errors.dropOffName}
                          onChange={(e) => handleInputChange("dropOffName", e.target.value)}
                          value={formValues.dropOffName || ""}
                          disabled={isSameContactAsPickup}
                        />
                      </div>
                      <div className="w-full">
                        <Input
                          label="Phone Number"
                          placeholder="Contact's phone number"
                          name="dropOffPhone"
                          type="tel"
                          required
                          error={errors.dropOffPhone}
                          onChange={(e) => handleInputChange("dropOffPhone", e.target.value)}
                          value={formValues.dropOffPhone || ""}
                          disabled={isSameContactAsPickup}
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </>
            )}
          </div>
        </div>
      )}
      {step === 2 && (
        <div id="transportation-details" className="flex flex-col gap-4">
          <h1 className="text-xl text-2xl text-stone-900 font-semibold border-b border-stone-200 pb-2">
            Transportation Details
          </h1>
          <div className="w-full md:w-1/3">
            <Input
              label="Date of Pick Up"
              placeholder="Pick Up Date"
              name="pickUpDate"
              type="date"
              required
              error={errors.pickUpDate}
              onChange={(e) => handleInputChange("pickUpDate", e.target.value)}
              value={formValues.pickUpDate || ""}
            />
          </div>
          <fieldset>
            <legend className="block text-sm leading-6 text-gray-900">
              Where are we picking up?
            </legend>
            <div className="flex flex-col gap-4 mt-2">
              <div className="w-full md:w-1/2">
                <Input
                  label="Address"
                  placeholder="1234 Main St"
                  name="pickUpAddress"
                  type="text"
                  required
                  error={errors.pickUpAddress}
                  onChange={(e) => handleInputChange("pickUpAddress", e.target.value)}
                  value={formValues.pickUpAddress || ""}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <Input
                    label="City"
                    placeholder="City"
                    name="pickUpCity"
                    type="text"
                    required
                    error={errors.pickUpCity}
                    onChange={(e) => handleInputChange("pickUpCity", e.target.value)}
                    value={formValues.pickUpCity || ""}
                  />
                </div>
                <div className="w-full">
                  <Select
                    label="State"
                    options={stateOptions}
                    value={formValues.pickUpState || ""}
                    onSelect={(option) => handleInputChange("pickUpState", option)}
                    placeholder="State"
                    required
                    error={errors.pickUpState}
                  />
                </div>
                <div className="w-full">
                  <Input
                    label="Zip Code"
                    placeholder="12345"
                    name="pickUpZip"
                    type="text"
                    required
                    error={errors.pickUpZip}
                    onChange={(e) => handleInputChange("pickUpZip", e.target.value)}
                    value={formValues.pickUpZip || ""}
                  />
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div className="flex justify-between md:justify-start gap-2">
              <legend className="block text-sm leading-6 text-gray-900">
                Where are we dropping off?
              </legend>
              <div className="flex gap-1">
                <input
                  type="checkbox"
                  id="sameAsPickUp"
                  name="sameAsPickUp"
                  className="form-checkbox h-4 w-4 text-primary rounded-sm border-stone-300 focus:ring-2 focus:ring-primary cursor-pointer my-auto"
                  onChange={(e) => handleSameAsPickUpChange(e.target.checked)}
                  checked={isSameAsPickup} // Bind checked to state
                />
                <label
                  htmlFor="sameAsPickUp"
                  className="block text-xs md:text-sm leading-6 text-gray-900 my-auto font-light"
                >
                  Same as pick up
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-2">
              <div className="w-full md:w-1/2">
                <Input
                  label="Address"
                  placeholder="1234 Main St"
                  name="dropOffAddress"
                  type="text"
                  required
                  error={errors.dropOffAddress}
                  value={formValues.dropOffAddress || ""}
                  onChange={(e) => handleInputChange("dropOffAddress", e.target.value)}
                  disabled={isSameAsPickup}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <Input
                    label="City"
                    placeholder="City"
                    name="dropOffCity"
                    type="text"
                    required
                    error={errors.dropOffCity}
                    value={formValues.dropOffCity || ""}
                    onChange={(e) => handleInputChange("dropOffCity", e.target.value)}
                    disabled={isSameAsPickup}
                  />
                </div>
                <div className="w-full">
                  <Select
                    label="State"
                    options={stateOptions}
                    value={formValues.dropOffState || ""}
                    onSelect={(option) => handleInputChange("dropOffState", option)}
                    placeholder="State"
                    required
                    error={errors.dropOffState}
                    disabled={isSameAsPickup}
                  />
                </div>
                <div className="w-full">
                  <Input
                    label="Zip Code"
                    placeholder="12345"
                    name="dropOffZip"
                    type="text"
                    required
                    error={errors.dropOffZip}
                    value={formValues.dropOffZip || ""}
                    onChange={(e) => handleInputChange("dropOffZip", e.target.value)}
                    disabled={isSameAsPickup}
                  />
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      )}
      {step === 3 && (
        <div id="horses" className="flex flex-col gap-4">
          <h1 className="text-xl text-2xl text-stone-900 font-semibold border-b border-stone-200 pb-2">
            Your Horses
          </h1>
          <AddHorse onAddHorse={handleAddHorse} horses={horses} errors={{}} />
          {errors.horses && (
            <p className="text-red-500 text-sm">{errors.horses}</p>
          )}
        </div>
      )}
      {step === 4 && (
        <div id="confirmation" className="flex flex-col gap-4">
          <h1 className="text-xl text-2xl text-stone-900 font-semibold border-b border-stone-200 pb-2">
            Confirmation
          </h1>
          <div className="w-full md:w-1/2">
            <Input
              label="Agreed Upon Bid Amount"
              name="bidAmount"
              type="money"
              required
              error={errors.bidAmount}
              onChange={(e) => handleInputChange("bidAmount", e.target.value)}
              value={formValues.bidAmount || ""}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 py-1">
              <input
                type="checkbox"
                id="cogginsHealthCert"
                name="cogginsHealthCert"
                required
                className="form-checkbox h-4 w-4 text-primary rounded-sm border-stone-300 focus:ring-2 focus:ring-primary cursor-pointer"
                onChange={(e) =>
                  handleInputChange(
                    "cogginsHealthCert",
                    e.target.checked ? "true" : "false"
                  )
                }
                checked={formValues.cogginsHealthCert === "true"}
              />
              <label
                htmlFor="cogginsHealthCert"
                className="text-stone-600 text-sm font-light"
              >
                I acknowledge a current Coggins and Health Certificate will be
                completed before pickup.{" "}
                <span className="text-rose-500">*</span>
              </label>
            </div>
            {errors.cogginsHealthCert && (
              <p className="text-red-500 text-sm">{errors.cogginsHealthCert}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 py-1">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                required
                className="form-checkbox h-4 w-4 text-primary rounded-sm border-stone-300 focus:ring-2 focus:ring-primary cursor-pointer"
                onChange={(e) =>
                  handleInputChange(
                    "terms",
                    e.target.checked ? "true" : "false"
                  )
                }
                checked={formValues.terms === "true"}
              />
              <label
                htmlFor="terms"
                className="text-stone-600 text-sm font-light"
              >
                I agree to the{" "}
                <a
                  href="/terms-and-conditions"
                  target="_blank"
                  className="text-primary hover:font-normal transition cursor-pointer"
                >
                  Terms and Conditions.<span className="text-rose-500">*</span>
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm">{errors.terms}</p>
            )}
          </div>
          <div className="w-full">
            <Textarea
              label="Comments"
              placeholder="Anything else we should know?"
              onChange={(e) => handleInputChange("comments", e.target.value)}
              value={formValues.comments || ""}
            />
          </div>
        </div>
      )}
      <div>
        <div className="flex justify-end gap-2">
          {step > 1 && (
            <div className="w-[15rem]">
              <Button
                secondary
                type="button"
                icon={ArrowLongLeftIcon}
                onClick={() => handleStepChange(step - 1)}
              >
                Previous
              </Button>
            </div>
          )}
          {step < 4 && (
            <div className="w-[15rem]">
              <Button
                secondary
                type="button"
                icon={ArrowLongRightIcon}
                onClick={() => handleStepChange(step + 1)}
              >
                Next
              </Button>
            </div>
          )}
          {step === 4 && (
            <div className="w-[15rem]">
              <Button primary type="submit" className="h-full">
                Submit
              </Button>
            </div>
          )}
        </div>
      </div>
    </fetcher.Form>
  );
}