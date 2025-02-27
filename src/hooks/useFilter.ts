import { useState, useCallback, useEffect } from "react";
import { Test } from "../types/types";

export const useFilter = (tests: Test[]) => {
  const [filterValue, setFilterValue] = useState("");
  const [filteredTests, setFilteredTests] = useState<Test[]>([]); 

  useEffect(() => {
    setFilteredTests(tests); 
  }, [tests]);

  const handleFilterChange = useCallback(
    (value: string) => {
      setFilterValue(value);
      const trimmedTerm = value.trim().toLowerCase();
      setFilteredTests(
        trimmedTerm
          ? tests.filter((test) => test.name.toLowerCase().includes(trimmedTerm))
          : tests
      );
    },
    [tests]
  );

  const handleReset = useCallback(() => {
    setFilterValue("");
    setFilteredTests(tests);
  }, [tests]);

  return { filterValue, filteredTests, handleFilterChange, handleReset };
};
