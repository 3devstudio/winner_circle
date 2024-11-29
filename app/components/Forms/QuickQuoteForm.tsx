import React, { useState, useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useIntersectionObserver from "~/hooks/useIntersectionObserver";
import Button from "../Buttons/Button";
import Input from "../Inputs/Input";
import Textarea from "../Inputs/Textarea";
import AddHorse from "../Pages/Frontend/Home/AddHorse";
import Breadcrumb from "../Pages/Frontend/Home/Breadcrumb";
import ResponseMessage from "../Blocks/Messaging/ResponseMessage";

interface Horse {
  name: string;
  breed: string;
  gender: string;
  age: number;
  height: string;
}

interface QuickQuoteFormProps {
  title: string;
}

interface FetcherData {
  success: boolean;
  message?: string;
  error?: string;
}

const QuickQuoteForm: React.FC<QuickQuoteFormProps> = ({ title }) => {
  const fetcher = useFetcher<FetcherData>();

  const [isMobile, setIsMobile] = useState(false);

  const [formData, setFormData] = useState({
    timeFramePickUp: "",
    pickUpLocation: "",
    dropOffLocation: "",
    horses: [] as Horse[],
    firstName: "",
    lastName: "",
    phoneNumber: "",
    comments: "",
    healthCert: false,
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [h1Ref, h1InView] = useIntersectionObserver<HTMLDivElement>();
  const [breadcrumRef, breadcrumbInView] =
    useIntersectionObserver<HTMLDivElement>();
  const [formRef, formInView] = useIntersectionObserver<HTMLDivElement>();
  const [formTitleRef, formTitleInView] =
    useIntersectionObserver<HTMLDivElement>();

  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([
    false,
    false,
  ]);
  const [horses, setHorses] = useState<Horse[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [shouldValidate, setShouldValidate] = useState(false);

  const images = [
    "/assets/img/hero/horses.jpeg",
    "/assets/img/hero/unnamed.jpg",
    "/assets/img/hero/unnamed-1.jpg",
    "/assets/img/hero/unnamed-2.jpg",
    "/assets/img/hero/unnamed-3.jpg",
    "/assets/img/hero/unnamed-4.jpg",
    "/assets/img/hero/unnamed-5.jpg",
    "/assets/img/hero/unnamed-6.jpg",
    "/assets/img/hero/unnamed-7.jpg",
    "/assets/img/hero/unnamed-8.jpg",
    "/assets/img/hero/unnamed-9.jpg",
    "/assets/img/hero/unnamed-10.jpg",
    "/assets/img/hero/unnamed-11.jpg",
    "/assets/img/hero/unnamed-12.jpg",
    "/assets/img/hero/unnamed-13.jpg",
  ];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    // Function to check screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    // Set initial state
    handleResize();

    // Add event listener for resizing
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  const goToNextImage = () =>
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  const goToPrevImage = () =>
    setCurrentImage(
      (prevImage) => (prevImage - 1 + images.length) % images.length,
    );
  const goToImage = (index: number) => setCurrentImage(index);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.success) {
        setSuccessMessage("Your submission was received successfully!");
        toast.success(
          "Thanks for requesting a quote! Someone will be in contact with you very shortly.",
        );
        // Reset form
        setFormData({
          timeFramePickUp: "",
          pickUpLocation: "",
          dropOffLocation: "",
          horses: [],
          firstName: "",
          lastName: "",
          phoneNumber: "",
          comments: "",
          healthCert: false,
        });
        setHorses([]);
        setStep(1);
        setCompletedSteps([false, false]);
        setShouldValidate(false);
      } else {
        toast.error(fetcher.data.error || "Failed to submit the form.");
      }
    }
  }, [fetcher.state, fetcher.data]);

  //Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      healthCert: e.target.checked,
    }));
  };

  const handleAddHorse = (addedHorses: Horse[]) => {
    setHorses(addedHorses);
    setFormData((prevData) => ({
      ...prevData,
      horses: addedHorses,
    }));
  };

  //Validation
  const validateStep1 = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.timeFramePickUp.trim())
      newErrors.timeFramePickUp = "Date is required";
    if (!formData.pickUpLocation.trim())
      newErrors.pickUpLocation = "Location is required";
    if (!formData.dropOffLocation.trim())
      newErrors.dropOffLocation = "Destination is required";
    if (formData.horses.length === 0) newErrors.horses = "You must add horses";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.healthCert)
      newErrors.healthCert = "You must agree to the terms";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleNextClick = () => {
    setShouldValidate(true);
    if (step === 1 && validateStep1()) {
      setCompletedSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        newSteps[0] = true;
        return newSteps;
      });
      setStep(step + 1);
      setShouldValidate(false);
    } else if (step === 2 && validateStep2()) {
      setCompletedSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        newSteps[1] = true;
        return newSteps;
      });
      setStep(step + 1);
      setShouldValidate(false);
    }
  };

  const handleBackClick = () => {
    if (step > 1) {
      setStep(step - 1);
      setShouldValidate(false);
    }
  };

  const handleStepChange = (newStep: number) => {
    if (newStep < step) {
      setStep(newStep);
      setShouldValidate(false);
    } else {
      setShouldValidate(true);
      if (
        (newStep === 2 && validateStep1()) ||
        (newStep === 3 && validateStep2())
      ) {
        setStep(newStep);
        setShouldValidate(false);
      }
    }
  };

  //Submit form
  const handleSubmit = async () => {
    setShouldValidate(true);
    if (validateStep2()) {
      const submitData = {
        ...formData,
        horses: JSON.stringify(formData.horses),
      };

      fetcher.submit(submitData, {
        method: "post",
        action: "/quote/create",
      });
    }
  };

  return (
    <div
      style={{
        backgroundImage: isMobile
        ? `url('/assets/img/mobile-horses.jpg')`
        : `url(${images[currentImage]})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        transition: isMobile ? "" : "background-image 1s ease-in-out",
      }}
      className="relative w-full h-full bg-no-repeat responsive-image bg-cover bg-center bg-fixed flex justify-center items-center"
    >
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className="flex flex-col lg:flex-row w-full h-full z-20">
        {/* Title and Image Controls */}
        {!isMobile ? (
          <div className="relative w-full lg:w-1/2 min-h-[20rem] lg:min-h-[40rem] flex flex-col justify-center items-center">
            <h1
              ref={h1Ref}
              className={`h-fit md:w-5/6 text-3xl md:text-4xl lg:text-4xl xl:text-6xl text-stone-100 font-semibold px-8 pb-8 pt-16 md:mt-0 slide-up ${
                h1InView ? "show" : ""
              }`}
            >
              {title}
            </h1>
            <div className="absolute bottom-4 flex space-x-2 mt-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    currentImage === index ? "bg-white" : "bg-gray-400"
                  }`}
                  onClick={() => goToImage(index)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="relative w-full lg:w-1/2 min-h-[20rem] flex justify-center items-center">
          </div>
        )}
        {/* Form */}
        <div className="h-full w-full lg:w-1/2">
          <div className="bg-tertiary/25 h-full w-full min-h-[20rem] md:min-h-[40rem] flex flex-col gap-2 px-4 py-6">
            <div
              ref={breadcrumRef}
              className={`slide-up ${breadcrumbInView ? "show" : ""}`}
            >
              <Breadcrumb
                step={step}
                setStep={handleStepChange}
                steps={["Horse Transport Details", "Contact Information"]}
                completedSteps={completedSteps}
              />
            </div>
            <h2
              ref={formTitleRef}
              className={`mb-4 text-white font-semibold text-lg md:text-2xl slide-up ${
                formTitleInView ? "show" : ""
              }`}
            >
              Get a Quick Quote Today!{" "}
            </h2>
            <div
              ref={formRef}
              className={`slide-up ${formInView ? "show" : ""}`}
            >
              {successMessage && (
                <ResponseMessage
                  message={successMessage}
                  clearMessage={() => setSuccessMessage(null)}
                />
              )}
              {step === 1 ? (
                <>
                  <div className="mb-4">
                    <div className="flex flex-col gap-4">
                      <div className="w-full flex">
                        <div className="w-1/2">
                          <Input
                            whiteLabel
                            label="When do you need transport?"
                            type="date"
                            placeholder="Select a date"
                            required={true}
                            value={formData.timeFramePickUp}
                            onChange={(e) =>
                              handleInputChange(
                                "timeFramePickUp",
                                e.target.value,
                              )
                            }
                            error={shouldValidate ? errors.timeFramePickUp : ""}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-4 w-full">
                        <div className="w-full">
                          <Input
                            whiteLabel
                            label="Moving From"
                            placeholder="City & State"
                            required={true}
                            value={formData.pickUpLocation}
                            onChange={(e) =>
                              handleInputChange(
                                "pickUpLocation",
                                e.target.value,
                              )
                            }
                            error={shouldValidate ? errors.pickUpLocation : ""}
                          />
                        </div>
                        <div className="w-full">
                          <Input
                            whiteLabel
                            label="Moving To"
                            placeholder="City & State"
                            required={true}
                            value={formData.dropOffLocation}
                            onChange={(e) =>
                              handleInputChange(
                                "dropOffLocation",
                                e.target.value,
                              )
                            }
                            error={shouldValidate ? errors.dropOffLocation : ""}
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <AddHorse
                          onAddHorse={handleAddHorse}
                          horses={horses}
                          errors={errors}
                        />
                        {shouldValidate && errors.horses && (
                          <p className="text-red-500 text-sm mt-2">
                            Please add a horse to continue.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-end">
                    <div className="w-40">
                      <Button
                        secondary
                        text="Next"
                        onClick={handleNextClick}
                        className="w-full mt-4 py-2 px-4"
                        textSize="md"
                      />
                    </div>
                  </div>
                </>
              ) : null}
              {step === 2 ? (
                <>
                  <div className="mb-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full">
                          <Input
                            whiteLabel
                            label="First Name"
                            placeholder="First Name"
                            required={true}
                            value={formData.firstName}
                            onChange={(e) =>
                              handleInputChange("firstName", e.target.value)
                            }
                            error={shouldValidate ? errors.firstName : ""}
                          />
                        </div>
                        <div className="w-full">
                          <Input
                            whiteLabel
                            label="Last Name"
                            placeholder="Last Name"
                            required={true}
                            value={formData.lastName}
                            onChange={(e) =>
                              handleInputChange("lastName", e.target.value)
                            }
                            error={shouldValidate ? errors.lastName : ""}
                          />
                        </div>
                      </div>
                      <div className="w-full md:w-1/2">
                        <Input
                          whiteLabel
                          label="Phone"
                          type="tel"
                          placeholder="Phone Number"
                          required={true}
                          value={formData.phoneNumber}
                          onChange={(e) =>
                            handleInputChange("phoneNumber", e.target.value)
                          }
                          error={shouldValidate ? errors.phoneNumber : ""}
                        />
                      </div>
                      <div className="w-full">
                        <Textarea
                          whiteLabel
                          label="Additional Comments"
                          placeholder="Anything else we should know?"
                          value={formData.comments}
                          onChange={(e) =>
                            handleInputChange("comments", e.target.value)
                          }
                          error={shouldValidate ? errors.comments : ""}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="terms"
                          name="terms"
                          required
                          checked={formData.healthCert}
                          onChange={handleCheckboxChange}
                          className="form-checkbox h-4 w-4 text-primary rounded-sm border-stone-300 focus:ring-2 focus:ring-primary"
                        />
                        <label
                          htmlFor="terms"
                          className="text-gray-100 text-sm"
                        >
                          I acknowledge a current Coggins and Health Certificate
                          will be completed before pickup.
                        </label>
                      </div>
                      {shouldValidate && errors.healthCert && (
                        <p className="text-red-500 text-sm">
                          {errors.healthCert}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-4 justify-end">
                    <div className="w-40 mt-4">
                      <Button
                        secondary
                        text="Back"
                        onClick={handleBackClick}
                        className="w-full"
                        textSize="md"
                      />
                    </div>
                    <div className="w-40 mt-4">
                      <Button
                        primary
                        text="Submit"
                        onClick={handleSubmit}
                        className={`w-full`}
                        textSize="md"
                      />
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={10000} />
    </div>
  );
};

export default QuickQuoteForm;