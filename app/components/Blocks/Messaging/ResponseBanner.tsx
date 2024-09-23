import React, { useEffect, useState } from "react";
import { ExclamationCircleIcon, XMarkIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import useIntersectionObserver from "~/hooks/useIntersectionObserver";

interface ResponseBannerProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const ResponseBanner: React.FC<ResponseBannerProps> = ({ message, type, onClose }) => {
  const [bannerRef, bannerVisible] = useIntersectionObserver<HTMLDivElement>();
  const [isVisible, setIsVisible] = useState(bannerVisible);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
    }
  }, [message]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      ref={bannerRef}
      className={`flex justify-between gap-4 ${
        type === "error" ? "bg-rose-500" : "bg-emerald-500"
      } text-white p-4 slide-up ${isVisible ? "show" : ""}`}
    >
      {type === "error" ? (
        <ExclamationCircleIcon className="h-10 w-10" />
      ) : (
        <CheckCircleIcon className="h-10 w-10" />
      )}
      <p className="my-auto font-light">{message}</p>
      <XMarkIcon
        onClick={handleClose}
        className={`h-8 w-8 cursor-pointer p-1 hover:bg-rose-400 rounded-md transition`}
      />
    </div>
  );
};

export default ResponseBanner;