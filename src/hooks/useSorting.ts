import { useState, useMemo } from "react";
import { Test, Site } from "../types/types";
import { getSiteById, formatSite } from "../utils/siteUtils";

export const useSorting = (filteredTests: Test[], sites: Site[]) => {
  const [sortColumn, setSortColumn] = useState<"name" | "type" | "site" | "status" | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  
  const sortedTests = useMemo(() => {
    if (!sortColumn) return filteredTests; 

    return [...filteredTests].sort((a, b) => {
      const aValue = sortColumn === "site"
        ? formatSite(getSiteById(a.siteId, sites))
        : a[sortColumn].toLowerCase();

      const bValue = sortColumn === "site"
        ? formatSite(getSiteById(b.siteId, sites))
        : b[sortColumn].toLowerCase();

      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [filteredTests, sortColumn, sortDirection, sites]); 

  const handleSort = (column: "name" | "type" | "site" | "status") => {
    setSortColumn(column);
    setSortDirection(prevDirection => (sortColumn === column && prevDirection === "asc" ? "desc" : "asc"));
  };

  const resetSorting = () => {
    setSortColumn(null); 
    setSortDirection("asc");
  };

  return { sortedTests, sortColumn, sortDirection, handleSort, resetSorting };
};


