import React from "react";

interface ResultsProps {
  className?: string;
}

export const Results: React.FC<ResultsProps> = ({ className }) => {
  return (
    <>
      <h1>Results</h1>
      <h2>Order basket redesing</h2>
    </>
  );
};
