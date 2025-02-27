
import { Site } from "../types/types";

export const getSiteById = (siteId: number, sites: Site[]) => {
  const site = sites.find((s) => s.id === siteId);
  return site ? site.url : "-";
};

export const formatSite = (url?: string) => {
  return url ? url.replace(/^(https?:\/\/)?(www\.)?/, "").toLowerCase() : "-";
};

export const getSiteMarkerClass = (siteId: number, styles: Record<string, string>) => {
    const siteMarkerMap: Record<number, string | undefined> = {
      1: styles.market,
      2: styles.delivery,
      3: styles.games,
    };
  
    return siteMarkerMap[siteId] ?? styles.defaultSiteMarker ?? "";
  };
  
