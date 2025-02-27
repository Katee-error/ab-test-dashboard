import { useState, useCallback, useEffect } from "react";
import { Test } from "../types/types";

export const useSearch = (tests: Test[]) => {
  const [searchValue, setSearchedValue] = useState("");
  const [searchedTests, setSearchedTests] = useState<Test[]>([]); 

  useEffect(() => {
    setSearchedTests(tests); 
  }, [tests]);

  const handleFilterChange = useCallback(
    (value: string) => {
      setSearchedValue(value);
      const trimmedTerm = value.trim().toLowerCase();
      setSearchedTests(
        trimmedTerm
          ? tests.filter((test) => test.name.toLowerCase().includes(trimmedTerm))
          : tests
      );
    },
    [tests]
  );

  const handleReset = useCallback(() => {
    setSearchedValue("");
    setSearchedTests(tests);
  }, [tests]);

  return { searchValue, searchedTests, handleFilterChange, handleReset };
};


