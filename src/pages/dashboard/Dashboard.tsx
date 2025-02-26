import React, { useCallback, useEffect, useState } from "react";
import { Filter } from "../../components/filter/Filter";
import { fetchTests } from "../../api/axios";
import { useDebounce } from "../../hooks/useDebounce";

interface DashboardProps {
  className?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ className }) => {
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const debouncedFilter = useDebounce(filterValue, 400);

  useEffect(() => {
    const loadTests = async () => {
      try {
        const data = await fetchTests();
        setTests(data);
        setFilteredTests(data); // Изначально показываем все тесты
      } catch (error) {
        console.error('Failed to fetch tests:', error);
      }
    };

    loadTests();
  }, []);

  useEffect(() => {
    const trimmedTerm = debouncedFilter.trim().toLowerCase();

    if (trimmedTerm) {
      const filtered = tests.filter((test: any) =>
        test.name.toLowerCase().includes(trimmedTerm)
      );
      setFilteredTests(filtered);
    } else {
      setFilteredTests(tests); // Сброс фильтра при пустом вводе
    }
  }, [debouncedFilter, tests]);


  return (
    <>
      <h1>Dashboard</h1>
      <Filter value={filterValue} // Передаём обязательное value
        onChange={setFilterValue} // Управляемое состояние
        totalTests={filteredTests.length} />
    </>
  );
};
