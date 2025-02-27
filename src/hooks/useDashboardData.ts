import { useEffect, useState } from "react";
import { getTests, getSites } from "../api/api";
import { Test, Site } from "../types/types";

export const useDashboardData = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [testsData, sitesData] = await Promise.all([
          getTests(),
          getSites(),
        ]);
        setTests(testsData || []);
        setSites(sitesData || []);
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { tests, sites, isLoading, error };
};
