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
        name.startsWith("pick-up-") &&
        !name.includes("contact")
      ) {
        const dropOffField = name.replace("pick-up-", "drop-off-");
        updatedValues[dropOffField] = value;
      }

      if (
        isSameContactAsPickup &&
        name.startsWith("pick-up-") &&
        name.includes("contact")
      ) {
        const dropOffContactField = name.replace("pick-up-", "drop-off-");
        updatedValues[dropOffContactField] = value;
      }

      return updatedValues;
    });
  };

  const handleSameAsPickUpChange = (isChecked: boolean) => {
    setIsSameAsPickup(isChecked);
    setFormValues((prev) => ({
      ...prev,
      "same-as-pick-up": isChecked ? "true" : "false",
      "drop-off-address": isChecked ? prev["pick-up-address"] || "" : "",
      "drop-off-city": isChecked ? prev["pick-up-city"] || "" : "",
      "drop-off-state": isChecked ? prev["pick-up-state"] || "" : "",
      "drop-off-zip": isChecked ? prev["pick-up-zip"] || "" : "",
    }));
  };

  const handleSameContactAsPickupChange = (isChecked: boolean) => {
    setIsSameContactAsPickup(isChecked);
    setFormValues((prev) => ({
      ...prev,
      "drop-off-name": isChecked ? prev["pick-up-name"] || "" : "",
      "drop-off-phone": isChecked ? prev["pick-up-phone"] || "" : "",
    }));
  };

  const handleAddHorse = (newHorses: Horse[]) => {
    setHorses(newHorses);
  };

  const validateStep = (nextStep: number): boolean => {
    let isValid = true;
    const newErrors: Record<string, string | undefined> = {};

    if (step === 1) {
      if (!formValues["first-name"]) {
        newErrors["first-name"] = "First name is required.";
        isValid = false;
      }

      if (!formValues["last-name"]) {
        newErrors["last-name"] = "Last name is required.";
        isValid = false;
      }

      if (!formValues["phone"]) {
        newErrors["phone"] = "Phone number is required.";
        isValid = false;
      }

      if (isUserContact === false) {
        if (!formValues["pick-up-name"]) {
          newErrors["pick-up-name"] = "Pick up contact name is required.";
          isValid = false;
        }

        if (!formValues["pick-up-phone"]) {
          newErrors["pick-up-phone"] =
            "Pick up contact phone number is required.";
          isValid = false;
        }

        if (!isSameContactAsPickup) {
          if (!formValues["drop-off-name"]) {
            newErrors["drop-off-name"] = "Drop off contact name is required.";
            isValid = false;
          }

          if (!formValues["drop-off-phone"]) {
            newErrors["drop-off-phone"] =
              "Drop off contact phone number is required.";
            isValid = false;
          }
        }
      }
    }
    if (step === 2) {
      if (!formValues["pick-up-date"]) {
        newErrors["pick-up-date"] = "Pick up date is required.";
        isValid = false;
      }
      if (!formValues["pick-up-address"]) {
        newErrors["pick-up-address"] = "Pick up address is required.";
        isValid = false;
      }
      if (!formValues["pick-up-city"]) {
        newErrors["pick-up-city"] = "Pick up city is required.";
        isValid = false;
      }
      if (!formValues["pick-up-state"]) {
        newErrors["pick-up-state"] = "Pick up state is required.";
        isValid = false;
      }
      if (!formValues["pick-up-zip"]) {
        newErrors["pick-up-zip"] = "Pick up zip code is required.";
        isValid = false;
      }
      if (!isSameAsPickup) {
        if (!formValues["drop-off-address"]) {
          newErrors["drop-off-address"] = "Drop off address is required.";
          isValid = false;
        }
      }
      if (!isSameAsPickup) {
        if (!formValues["drop-off-city"]) {
          newErrors["drop-off-city"] = "Drop off city is required.";
          isValid = false;
        }
      }
      if (!isSameAsPickup) {
        if (!formValues["drop-off-state"]) {
          newErrors["drop-off-state"] = "Drop off state is required.";
          isValid = false;
        }
      }
      if (!isSameAsPickup) {
        if (!formValues["drop-off-zip"]) {
          newErrors["drop-off-zip"] = "Drop off zip code is required.";
          isValid = false;
        }
      }
    }
    if (step === 3) {
      if (horses.length === 0) {
        newErrors["horses"] = "At least one horse is required.";
        isValid = false;
      }
    }
    if (step === 4) {
      if (!formValues["bid-amount"]) {
        newErrors["bid-amount"] = "Bid amount is required.";
        isValid = false;
      }
      if (!formValues["coggins-health-cert"]) {
        newErrors["coggins-health-cert"] =
          "Coggins and health certificate is required.";
        isValid = false;
      }
      if (!formValues["terms"]) {
        newErrors["terms"] = "Terms and conditions are required.";
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

    const formData = new FormData();

    for (const key in formValues) {
      formData.append(key, formValues[key]);
    }

    formData.append("horses", JSON.stringify(horses));

    fetcher.submit(formData, {
      method: "post",
      action: "/waiver/create"
    });
  };

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.error) {
        setResponseMessage("Failed to submit the waiver. Please try again.");
        setResponseType("error");
      } else {
        setResponseMessage(
          "Thanks! Your waiver submitted successfully. We will be in contact with you shortly.",
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
                  name="first-name"
                  type="text"
                  required
                  error={errors["first-name"]}
                  onChange={(e) =>
                    handleInputChange("first-name", e.target.value)
                  }
                  value={formValues["first-name"] || ""}
                />
              </div>
              <div className="w-full">
                <Input
                  label="Last Name"
                  placeholder="Your Last Name"
                  name="last-name"
                  type="text"
                  required
                  error={errors["last-name"]}
                  onChange={(e) =>
                    handleInputChange("last-name", e.target.value)
                  }
                  value={formValues["last-name"] || ""}
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
                  error={errors["phone"]}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  value={formValues["phone"] || ""}
                />
              </div>

              <div className="w-full">
                <Input
                  label="Email"
                  placeholder="Your Email"
                  name="email"
                  type="email"
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  value={formValues["email"] || ""}
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
                    id="pick-up-yes"
                    name="pick-up"
                    value="yes"
                    className="form-checkbox h-4 w-4 text-primary rounded-sm border-stone-300 focus:ring-2 focus:ring-primary cursor-pointer"
                    onChange={(e) => handleContactChange(e.target.value)}
                    checked={formValues["isUserContact"] === "yes"}
                  />
                  <label
                    htmlFor="pick-up-yes"
                    className="block text-sm leading-6 text-gray-900 font-light"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    type="radio"
                    id="pick-up-no"
                    name="pick-up"
                    value="no"
                    className="form-checkbox h-4 w-4 text-primary rounded-sm border-stone-300 focus:ring-2 focus:ring-primary cursor-pointer"
                    onChange={(e) => handleContactChange(e.target.value)}
                    checked={formValues["isUserContact"] === "no"}
                  />
                  <label
                    htmlFor="pick-up-no"
                    className="block text-sm leading-6 text-gray-900 font-light"
                  >
                    No
                  </label>
                </div>
              </div>
            </fieldset>
            {isUserContact === false && (
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
                          name="pick-up-name"
                          type="text"
                          required
                          error={errors["pick-up-name"]}
                          onChange={(e) =>
                            handleInputChange("pick-up-name", e.target.value)
                          }
                          value={formValues["pick-up-name"] || ""}
                        />
                      </div>
                      <div className="w-full">
                        <Input
                          label="Phone Number"
                          placeholder="Contact's phone number"
                          name="pick-up-phone"
                          type="tel"
                          required
                          error={errors["pick-up-phone"]}
                          onChange={(e) =>
                            handleInputChange("pick-up-phone", e.target.value)
                          }
                          value={formValues["pick-up-phone"] || ""}
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
                          id="same-contact-as-pick-up"
                          name="same-contact-as-pick-up"
                          className="form-checkbox h-4 w-4 text-primary rounded-sm border-stone-300 focus:ring-2 focus:ring-primary cursor-pointer my-auto"
                          onChange={(e) =>
                            handleSameContactAsPickupChange(e.target.checked)
                          }
                          checked={isSameContactAsPickup}
                        />
                        <label
                          htmlFor="same-contact-as-pick-up"
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
                          name="drop-off-name"
                          type="text"
                          required
                          error={errors["drop-off-name"]}
                          onChange={(e) =>
                            handleInputChange("drop-off-name", e.target.value)
                          }
                          value={formValues["drop-off-name"] || ""}
                          disabled={isSameContactAsPickup}
                        />
                      </div>
                      <div className="w-full">
                        <Input
                          label="Phone Number"
                          placeholder="Contact's phone number"
                          name="drop-off-phone"
                          type="tel"
                          required
                          error={errors["drop-off-phone"]}
                          onChange={(e) =>
                            handleInputChange("drop-off-phone", e.target.value)
                          }
                          value={formValues["drop-off-phone"] || ""}
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
              name="pick-up-date"
              type="date"
              required
              error={errors["pick-up-date"]}
              onChange={(e) =>
                handleInputChange("pick-up-date", e.target.value)
              }
              value={formValues["pick-up-date"] || ""}
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
                  name="pick-up-address"
                  type="text"
                  required
                  error={errors["pick-up-address"]}
                  onChange={(e) =>
                    handleInputChange("pick-up-address", e.target.value)
                  }
                  value={formValues["pick-up-address"] || ""}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <Input
                    label="City"
                    placeholder="City"
                    name="pick-up-city"
                    type="text"
                    required
                    error={errors["pick-up-city"]}
                    onChange={(e) =>
                      handleInputChange("pick-up-city", e.target.value)
                    }
                    value={formValues["pick-up-city"] || ""}
                  />
                </div>
                <div className="w-full">
                  <Select
                    label="State"
                    options={stateOptions}
                    value={formValues["pick-up-state"] || ""}
                    onSelect={(option) =>
                      handleInputChange("pick-up-state", option)
                    }
                    placeholder="State"
                    required
                    error={errors["pick-up-state"]}
                  />
                </div>
                <div className="w-full">
                  <Input
                    label="Zip Code"
                    placeholder="12345"
                    name="pick-up-zip"
                    type="text"
                    required
                    error={errors["pick-up-zip"]}
                    onChange={(e) =>
                      handleInputChange("pick-up-zip", e.target.value)
                    }
                    value={formValues["pick-up-zip"] || ""}
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
                  id="same-as-pick-up"
                  name="same-as-pick-up"
                  className="form-checkbox h-4 w-4 text-primary rounded-sm border-stone-300 focus:ring-2 focus:ring-primary cursor-pointer my-auto"
                  onChange={(e) => handleSameAsPickUpChange(e.target.checked)}
                  checked={isSameAsPickup} // Bind checked to state
                />
                <label
                  htmlFor="same-as-pick-up"
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
                  name="drop-off-address"
                  type="text"
                  required
                  error={errors["drop-off-address"]}
                  value={formValues["drop-off-address"] || ""}
                  onChange={(e) =>
                    handleInputChange("drop-off-address", e.target.value)
                  }
                  disabled={isSameAsPickup}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <Input
                    label="City"
                    placeholder="City"
                    name="drop-off-city"
                    type="text"
                    required
                    error={errors["drop-off-city"]}
                    value={formValues["drop-off-city"] || ""}
                    onChange={(e) =>
                      handleInputChange("drop-off-city", e.target.value)
                    }
                    disabled={isSameAsPickup}
                  />
                </div>
                <div className="w-full">
                  <Select
                    label="State"
                    options={stateOptions}
                    value={formValues["drop-off-state"] || ""}
                    onSelect={(option) =>
                      handleInputChange("drop-off-state", option)
                    }
                    placeholder="State"
                    required
                    error={errors["drop-off-state"]}
                    disabled={isSameAsPickup}
                  />
                </div>
                <div className="w-full">
                  <Input
                    label="Zip Code"
                    placeholder="12345"
                    name="drop-off-zip"
                    type="text"
                    required
                    error={errors["drop-off-zip"]}
                    value={formValues["drop-off-zip"] || ""}
                    onChange={(e) =>
                      handleInputChange("drop-off-zip", e.target.value)
                    }
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
          {errors["horses"] && (
            <p className="text-red-500 text-sm">{errors["horses"]}</p>
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
              name="bid-amount"
              type="money"
              required
              error={errors["bid-amount"]}
              onChange={(e) => handleInputChange("bid-amount", e.target.value)}
              value={formValues["bid-amount"] || ""}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 py-1">
              <input
                type="checkbox"
                id="coggins-health-cert"
                name="coggins-health-cert"
                required
                className="form-checkbox h-4 w-4 text-primary rounded-sm border-stone-300 focus:ring-2 focus:ring-primary cursor-pointer"
                onChange={(e) =>
                  handleInputChange(
                    "coggins-health-cert",
                    e.target.checked ? "true" : "false",
                  )
                }
              />
              <label
                htmlFor="coggins-health-cert"
                className="text-stone-600 text-sm font-light"
              >
                I acknowledge a current Coggins and Health Certificate will be
                completed before pickup.{" "}
                <span className="text-rose-500">*</span>
              </label>
            </div>
            {errors["coggins-health-cert"] && (
              <p className="text-red-500 text-sm">
                {errors["coggins-health-cert"]}
              </p>
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
                    e.target.checked ? "true" : "false",
                  )
                }
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
            {errors["terms"] && (
              <p className="text-red-500 text-sm">{errors["terms"]}</p>
            )}
          </div>
          <div className="w-full">
            <Textarea
              label="Comments"
              placeholder="Anything else we should know?"
              onChange={(e) => handleInputChange("comments", e.target.value)}
              value={formValues["comments"] || ""}
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
