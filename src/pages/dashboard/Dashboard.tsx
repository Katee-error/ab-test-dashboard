import { useCallback, useEffect, useState } from "react";
import { Filter } from "../../components/filter/Filter";
import { getSites, getTests } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { Site, Test } from "../../types/types";
import { Table } from "../../components/table/Table";

export const Dashboard = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [filteredTests, setFilteredTests] = useState<Test[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const [testsData, sitesData] = await Promise.all([getTests(), getSites()]);

      setTests(testsData || []);
      setFilteredTests(testsData || []);
      setSites(sitesData || []);
    };

    loadData();
  }, []);

  const handleFilterChange = useCallback(
    (value: string) => {
      setFilterValue(value);

      const trimmedTerm = value.trim().toLowerCase();

      if (trimmedTerm) {
        const filtered = tests.filter((test) =>
          test.name.toLowerCase().includes(trimmedTerm)
        );
        setFilteredTests(filtered);
      } else {
        setFilteredTests(tests);
      }
    },
    [tests]
  );

  const handleReset = useCallback(() => {
    setFilterValue(""); 
    setFilteredTests(tests);
  }, [tests]);

  const handleResultsClick = useCallback(
    (testId: string) => {
      navigate(`/results/${testId}`);
    },
    [navigate]
  );

  const handleFinalizeClick = useCallback(
    (testId: string) => {
      navigate(`/finalize/${testId}`);
    },
    [navigate]
  );

  return (
    <>
      <h1>Dashboard</h1>
      <Filter
        value={filterValue}
        onChange={handleFilterChange}
        totalTests={filteredTests.length}
      />
      <Table
        tests={filteredTests}
        sites={sites}
        onResultsClick={handleResultsClick}
        onFinalizeClick={handleFinalizeClick}
        onReset={handleReset}
      />
    </>
  );
};
