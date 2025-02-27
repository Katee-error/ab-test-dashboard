import { useNavigate } from "react-router-dom";
import { useDashboardData } from "../../hooks/useDashboardData";
import { useFilter } from "../../hooks/useFilter";
import { Filter } from "../../components/filter/Filter";
import { Table } from "../../components/table/Table";


export const Dashboard = () => {
  const { tests, sites, error } = useDashboardData();
  const { filterValue, filteredTests, handleFilterChange, handleReset } = useFilter(tests);
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
