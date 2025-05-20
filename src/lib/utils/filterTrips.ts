import { Trip } from "../types/trips";
import { FILTER_KEY_NAME } from "../context/TripsContext";
import { Style } from "../types/trips";

export type Filters = Partial<Record<FILTER_KEY_NAME, string>>;

export const filterTrips = (
  tripSet: Trip[] = [],
  filters: Filters = {}
): Trip[] => {
  const activeFilters = Object.entries(filters).filter(([, value]) => {
    if (!value) return false;
    if (value.toLowerCase() === Style.All.toLowerCase()) return false;
    return true;
  });

  if (activeFilters.length === 0) {
    return tripSet;
  }

  return tripSet.filter((trip) =>
    activeFilters.every(
      ([key, value]) => trip[key as keyof Trip] === value
    )
  );
};
