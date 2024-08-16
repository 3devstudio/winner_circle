import React from "react";

type NoResultsFoundErrorProps = {
  error: string;
};

const NoResultsFoundError: React.FC<NoResultsFoundErrorProps> = ({ error }) => {
  return (
    <div className="text-center">
      <p className="font-semibold text-xl md:text-3xl text-primary">
        No results found.
      </p>
      <p className="font-light text-gray-500">{error}</p>
    </div>
  );
};

export default NoResultsFoundError;
