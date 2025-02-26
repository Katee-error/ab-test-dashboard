import React from 'react';

interface ResultsProps {
  className?: string;
}

export const Results: React.FC<ResultsProps> = ({ className }) => {
  return (
    <div className={className}></div>
  );
};