import React from 'react';

interface FinalizeProps {
  className?: string;
}

export const Finalize: React.FC<FinalizeProps> = ({ className }) => {
  return (
    <div className={className}></div>
  );
};