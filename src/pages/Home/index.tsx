import { useEffect, useState } from "react";
import SortBtn from "../../components/SortBtn";
import TripFilterList from "../../components/TripFilterList";
import TripList from "../../components/TripList";
import {
  addFilter,
  addFilteredTrips,
  FILTER_KEY_NAME,
  useTripsContext,
} from "../../lib/context/TripsContext";
import useTrips from "../../lib/hooks/useTrips";
import { Trips } from "../../lib/types/trips";
import { filterTrips } from "../../lib/utils/filterTrips";
import styles from "./styles.module.scss";

const Home = () => {
  const { dispatch } = useTripsContext();
  const { trips, filteredTrips, filters } = useTrips();
  const [sortByCheckIn, setSortByCheckIn] = useState<boolean>(true);
  const [tripSet, setTripSet] = useState<Trips["tripSet"]>();

  useEffect(() => {
    const dataSrc = filteredTrips || trips?.tripSet;
    const sortedData = [...(dataSrc || [])].sort((a, b) => {
      if (!sortByCheckIn) {
        return (
          new Date(b.checkInDate).valueOf() - new Date(a.checkInDate).valueOf()
        );
      }

      return (
        new Date(a.checkInDate).valueOf() - new Date(b.checkInDate).valueOf()
      );
    });
    setTripSet(sortedData);
  }, [sortByCheckIn, filteredTrips, trips?.tripSet]);

  const handleSortByCheckIn = () => {
    setSortByCheckIn(!sortByCheckIn);
  };

  const getFilteredTrips = (
    filterKeyName: FILTER_KEY_NAME,
    filterValue: string
  ) => {
    const nextFilters = {
      ...(filters || {}),
      [filterKeyName]: filterValue,
    };

    return filterTrips(trips?.tripSet || [], nextFilters);
  };

  const handleStyleFilterClick = (filterValue: string) => {
    dispatch(addFilter({ [FILTER_KEY_NAME.UnitStyleName]: filterValue }));
    const filterTripsData = getFilteredTrips(
      FILTER_KEY_NAME.UnitStyleName,
      filterValue
    );
    dispatch(addFilteredTrips(filterTripsData));
  };

  const handleCategoryFilterClick = (filterValue: string) => {
    dispatch(addFilter({ [FILTER_KEY_NAME.ParentCategoryName]: filterValue }));
    const filterTripsData = getFilteredTrips(
      FILTER_KEY_NAME.ParentCategoryName,
      filterValue
    );
    dispatch(addFilteredTrips(filterTripsData));
  };

  if (!trips) {
    // add loader
    return null;
  }

  return (
    <div className={styles.container}>
      <section className={styles.filter_style_section}>
        <SortBtn handleOnClick={handleSortByCheckIn} label="Check-In" />
        <TripFilterList
          activeFilter={filters ? filters[FILTER_KEY_NAME.UnitStyleName] : ""}
          filters={trips?.styles}
          handleOnClick={handleStyleFilterClick}
        />
      </section>
      <section className={styles.filter_category_section}>
        <TripFilterList
          activeFilter={
            filters ? filters[FILTER_KEY_NAME.ParentCategoryName] : ""
          }
          filters={trips?.categories}
          handleOnClick={handleCategoryFilterClick}
        />
      </section>
      <section className={styles.trip_list_section}>
        <TripList tripSet={tripSet} />
      </section>
    </div>
  );
};

export default Home;
