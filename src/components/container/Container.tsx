import { FC, ReactNode } from 'react';
import styles from './Container.module.scss';
import classNames from 'classnames';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={classNames(styles.container, className)}>
      {children}
    </div>
  );
};


