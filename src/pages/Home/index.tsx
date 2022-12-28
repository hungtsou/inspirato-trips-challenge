import { useCallback, useEffect, useState } from "react";
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
import { Trip, Trips } from "../../lib/types/trips";
import styles from "./styles.module.scss";

const Home = () => {
  const { dispatch } = useTripsContext();
  const { trips, filteredTrips, filters } = useTrips();
  const [sortByCheckIn, setSortByCheckIn] = useState<boolean>(true);
  const [tripSet, setTripSet] = useState<Trips["tripSet"]>();

  const sortByCheckInDate = useCallback(
    (isSort: boolean) => {
      const dataSrc = filteredTrips || trips?.tripSet;

      const sortData = dataSrc?.sort((a, b) => {
        if (!isSort) {
          return (
            new Date(b.checkInDate).valueOf() -
            new Date(a.checkInDate).valueOf()
          );
        }

        return (
          new Date(a.checkInDate).valueOf() - new Date(b.checkInDate).valueOf()
        );
      });
      setTripSet(sortData);
    },
    [filteredTrips, trips?.tripSet]
  );

  useEffect(() => {
    sortByCheckInDate(sortByCheckIn);
  }, [sortByCheckIn, sortByCheckInDate]);

  const handleSortByCheckIn = () => {
    sortByCheckInDate(!sortByCheckIn);
    setSortByCheckIn(!sortByCheckIn);
  };

  const filterTrips = (filterKeyName: FILTER_KEY_NAME, filterValue: string) => {
    let _filters: { [key: string]: string } = filters ? filters : {};
    _filters = {
      ..._filters,
      [filterKeyName]: filterValue,
    };

    return trips?.tripSet.filter((tripSetItem: any) => {
      if (filterValue.toLowerCase() === "all vacations") return true;
      return Object.entries(_filters).every(
        ([key, val]) => tripSetItem[key] === val
      );
    }) as Trip[];
  };

  const handleStyleFilterClick = (filterValue: string) => {
    dispatch(addFilter({ [FILTER_KEY_NAME.UnitStyleName]: filterValue }));
    const filterTripsData = filterTrips(
      FILTER_KEY_NAME.UnitStyleName,
      filterValue
    );
    dispatch(addFilteredTrips(filterTripsData));
  };

  const handleCategoryFilterClick = (filterValue: string) => {
    dispatch(addFilter({ [FILTER_KEY_NAME.ParentCategoryName]: filterValue }));
    const filterTripsData = filterTrips(
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
