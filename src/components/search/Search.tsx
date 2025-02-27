import styles from './Search.module.scss';
import classNames from 'classnames';
import searchIcon from './../../assets/icons/search-icon.svg';

interface FilterProps {
    value: string;
    onChange: (value: string) => void;
    totalTests: number;
    className?: string;
  }

export const Filter: React.FC<FilterProps> = ({ value, onChange, totalTests, className }) => {
    return (
        <div className={classNames(styles.filterWrapper, className)}>
          <img src={searchIcon} alt="Search" className={styles.icon} />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.input}
            placeholder='What test are you looking for?'
          />
          <span className={styles.count}>{totalTests} tests</span>
        </div>
      );
    };