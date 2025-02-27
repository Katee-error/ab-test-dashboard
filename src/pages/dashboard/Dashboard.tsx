import { useNavigate } from "react-router-dom";
import { useDashboardData } from "../../hooks/useDashboardData";
import { useSearch } from "../../hooks/useSearch";
import { Filter } from "../../components/search/Search";
import { Table } from "../../components/table/Table";


export const Dashboard = () => {
  const { tests, sites, error } = useDashboardData();
  const { searchValue, searchedTests, handleFilterChange, handleReset } = useSearch(tests);
  const navigate = useNavigate();

  const handleResultsClick = (testId: string) => {
    navigate(`/results/${testId}`);
  };

  const handleFinalizeClick = (testId: string) => {
    navigate(`/finalize/${testId}`);
  };

  if (error) return <p>{error}</p>;

  return (
    <>
      <h1>Dashboard</h1>
      <Filter
        value={searchValue}
        onChange={handleFilterChange}
        totalTests={searchedTests.length}
      />
      <Table
        tests={searchedTests}
        sites={sites}
        onResultsClick={handleResultsClick}
        onFinalizeClick={handleFinalizeClick}
        onReset={handleReset}
      />
    </>
  );
};
