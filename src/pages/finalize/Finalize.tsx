import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Test } from "../../types/types";
import { getTestById } from "../../api/api";
import styles from "./../Page.module.scss";
import arrowIcon from "./../../assets/icons/arrow.svg";

export const Finalize = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState<Test | null>(null);

  useEffect(() => {
    const fetchTest = async () => {
      if (testId) {
        const testData = await getTestById(testId);
        setTest(testData);
      }
    };
    fetchTest();
  }, [testId]);

  return (
    <div className={styles.pageContainer}>
      <h1>Finalize Page</h1>
      {test ? (
        <div>
          <h2>{test.name}</h2>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <div className={styles.navigation}>
        <button className={styles.backButton} onClick={() => navigate("/")}>
          <img src={arrowIcon} alt="Arrow Back" />
          <p>Back </p>
        </button>
      </div>
    </div>
  );
};
