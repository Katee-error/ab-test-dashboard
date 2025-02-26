import React from 'react';

interface DashboardProps {
  className?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ className }) => {
  return (
    <div className={className}></div>
  );
};