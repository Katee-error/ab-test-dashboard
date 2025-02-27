import { FC, useState, useEffect } from "react";
import styles from "./Table.module.scss";
import classNames from "classnames";
import { Test, Site } from "../../types/types";
import { useKeyboardNavigation } from "../../hooks/useKeyboardNavigation";

interface TableProps {
  tests: Test[];
  sites: Site[];
  selectedIndex: number | null;
  onResultsClick: (testId: string) => void;
  onFinalizeClick: (testId: string) => void;
  onReset: () => void;
}

const getSiteById = (siteId: number, sites: Site[]) => {
  const site = sites.find((s) => s.id === siteId);
  return site ? site.url : "-";
};

const formatSite = (url?: string) => {
  return url ? url.replace(/^(https?:\/\/)?(www\.)?/, "").toLowerCase() : "-";
};

const getSiteMarkerClass = (siteId: number) => {
  return classNames(styles.siteMarker, {
    [styles.market]: siteId === 1,
    [styles.delivery]: siteId === 2,
    [styles.games]: siteId === 3,
  });
};

export const Table: FC<TableProps> = ({
  tests,
  sites,
  selectedIndex,
  onResultsClick,
  onFinalizeClick,
  onReset,
}) => {
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
      const aValue = column === "site" ? formatSite(getSiteById(a.siteId, sites)) : a[column].toLowerCase();
      const bValue = column === "site" ? formatSite(getSiteById(b.siteId, sites)) : b[column].toLowerCase();

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

  const { currentIndex } = useKeyboardNavigation({
    itemsLength: tests.length,
    onEnterPress: (index) => onResultsClick(tests[index].id.toString()),
    onFinalizePress: (index) => {
      if (tests[index].status.toLowerCase() === "draft") {
        onFinalizeClick(tests[index].id.toString());
      }
    },
  });
  
  return (
    <>

      {sortedTests.length > 0 ? (
        <div className={styles.table}>
          <div className={styles.header}>
            <div onClick={() => handleSort("name")}>NAME</div>
            <div onClick={() => handleSort("type")} className={styles.sortableHeader}>
              TYPE
              <svg
                className={classNames(styles.sortIcon, { [styles.desc]: sortColumn === "type" && sortDirection === "desc" })}
                width="7"
                height="4"
                viewBox="0 0 7 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 3.5L3.13529 0.364716L3.5 7.15256e-06L3.86471 0.364716L7 3.5L6.63529 3.86472L3.5 0.729424L0.364708 3.86472L0 3.5Z"
                  fill={sortColumn === "type" ? "#333" : "#999"}
                />
              </svg>
            </div>
            <div onClick={() => handleSort("status")}>STATUS</div>
            <div onClick={() => handleSort("site")}>SITE</div>
            <div><button className={styles.resetButton} onClick={resetSorting}>
          Reset Sorting
        </button></div>
          </div>

          {sortedTests.map((test, index) => {
            const siteUrl = getSiteById(test.siteId, sites);
            return (
              <div key={test.id} className={classNames(styles.row, styles.bodyRow, {
                [styles.selected]: index === currentIndex,
              })}>
                <div className={styles.testName}>
                  <div className={getSiteMarkerClass(test.siteId)}></div>
                  {test.name}
                </div>
                <div className={styles.cell}>{test.type}</div>
                <div className={styles.cell}>
                  <span className={classNames(styles.status, styles[test.status.toLowerCase()])}>
                    {test.status}
                  </span>
                </div>
                <div className={styles.cell}>{formatSite(siteUrl)}</div>
                <div className={styles.cell}>
                {test.status.toLowerCase() === "draft" ? (
                  <button
                    className={styles.finalizeButton}
                    onClick={() => onFinalizeClick(test.id.toString())}
                  >
                    Finalize
                  </button>
                ) : (
                  <button
                    className={styles.resultsButton}
                    onClick={() => onResultsClick(test.id.toString())}
                  >
                    Results
                  </button>
                )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.noResultsContainer}>
          <div>Your search did not match any results.</div>
          <button className={styles.resultsButton} onClick={onReset}>
            Reset
          </button>
        </div>
      )}
    </>
  );
};
