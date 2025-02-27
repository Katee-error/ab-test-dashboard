import { useState, useEffect } from "react";
import { Test, Site } from "../types/types";
import { getSiteById, formatSite } from "../utils/siteUtils";

export const useSorting = (tests: Test[], sites: Site[]) => {
  const [sortedTests, setSortedTests] = useState<Test[]>([]); 
  const [sortColumn, setSortColumn] = useState<string | null>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    setSortedTests(tests);
  }, [tests]);

  const handleSort = (column: "name" | "type" | "site" | "status") => {
    const direction =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";

    const sorted = [...tests].sort((a, b) => {
      const aValue =
        column === "site"
          ? formatSite(getSiteById(a.siteId, sites))
          : a[column].toLowerCase();
      const bValue =
        column === "site"
          ? formatSite(getSiteById(b.siteId, sites))
          : b[column].toLowerCase();

      return direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

    setSortedTests(sorted);
    setSortColumn(column);
    setSortDirection(direction);
  };

  const resetSorting = () => {
    setSortedTests(tests);
    setSortColumn("name");
    setSortDirection("asc");
  };

  return { sortedTests, sortColumn, sortDirection, handleSort, resetSorting };
};
