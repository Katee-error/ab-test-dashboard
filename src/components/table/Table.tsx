import { FC } from "react";
import styles from "./Table.module.scss";
import classNames from "classnames";
import { formatSite, getSiteById } from "../../utils/siteUtils";
import { useSorting } from "../../hooks/useSorting";
import { useKeyboardNavigation } from "../../hooks/useKeyboardNavigation";
import { Site, Test } from "../../types/types";
import { SortIcon } from "../../assets/icons/sort-arrow";

interface TableProps {
  tests: Test[];
  sites: Site[];
  onResultsClick: (testId: string) => void;
  onFinalizeClick: (testId: string) => void;
  onReset: () => void;
}

export const Table: FC<TableProps> = ({
    tests,
    sites,
    onResultsClick,
    onFinalizeClick,
    onReset,
  }) => {
    const { sortedTests, sortColumn, sortDirection, handleSort, resetSorting } = useSorting(tests, sites);
    const { currentIndex } = useKeyboardNavigation({
      itemsLength: tests.length,
      onEnterPress: (index) => onResultsClick(tests[index]?.id.toString()),
    });
  
    const getSiteMarkerClass = (siteId: number) => {
      const siteMarkerMap: Record<number, string> = {
        1: styles.market,
        2: styles.delivery,
        3: styles.games,
      };
  
      return siteMarkerMap[siteId] || styles.defaultSiteMarker;
    };
  
    return (
      <>
        {sortedTests.length > 0 ? (
          <div className={styles.table}>
            <div className={styles.header}>
              <div onClick={() => handleSort("name")} className={styles.sortableHeader}>
                NAME
                {sortColumn === "name" && (
                  <SortIcon
                    isDescending={sortDirection === "desc"}
                    isActive
                  />
                )}
              </div>
              <div onClick={() => handleSort("type")} className={styles.sortableHeader}>
                TYPE
                {sortColumn === "type" && (
                  <SortIcon
                    isDescending={sortDirection === "desc"}
                    isActive
                  />
                )}
              </div>
              <div onClick={() => handleSort("status")} className={styles.sortableHeader}>
                STATUS
                {sortColumn === "status" && (
                  <SortIcon
                    isDescending={sortDirection === "desc"}
                    isActive
                  />
                )}
              </div>
              <div onClick={() => handleSort("site")} className={styles.sortableHeader}>
                SITE
                {sortColumn === "site" && (
                  <SortIcon
                    isDescending={sortDirection === "desc"}
                    isActive
                  />
                )}
              </div>
              <div>
                <button className={styles.resetButton} onClick={resetSorting}>
                  Reset Sorting
                </button>
              </div>
            </div>
  
            {sortedTests.map((test, index) => {
              const siteUrl = getSiteById(test.siteId, sites);
              return (
                <div
                  key={test.id}
                  className={classNames(styles.row, styles.bodyRow, {
                    [styles.selected]: index === currentIndex,
                  })}
                >
                  <div className={styles.testName}>
                    <div
                      className={classNames(
                        styles.siteMarker,
                        getSiteMarkerClass(test.siteId)
                      )}
                    ></div>
                    {test.name}
                  </div>
                  <div className={styles.cell}>{test.type}</div>
                  <div className={styles.cell}>
                    <span
                      className={classNames(
                        styles.status,
                        styles[test.status.toLowerCase()]
                      )}
                    >
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
  