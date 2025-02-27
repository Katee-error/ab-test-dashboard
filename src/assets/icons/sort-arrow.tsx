import React from "react";
import classNames from "classnames";
import styles from './../../components/table/Table.module.scss'; 

interface SortIconProps {
  isDescending: boolean;
  isActive: boolean;
}

export const SortIcon: React.FC<SortIconProps> = ({ isDescending, isActive }) => {
  return (
    <svg
      className={classNames(styles.sortIcon, { [styles.desc]: isDescending })}
      width="6"
      height="3"
      viewBox="0 0 7 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 3.5L3.13529 0.364716L3.5 7.15256e-06L3.86471 0.364716L7 3.5L6.63529 3.86472L3.5 0.729424L0.364708 3.86472L0 3.5Z"
        fill={"#999"}
      />
    </svg>
  );
};


