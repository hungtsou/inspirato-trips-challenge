import { ChangeEvent, useCallback, useEffect, useState } from "react";
import CheckBox from "../../components/CheckBox";
import TripFilterList from "../../components/TripFilterList";
import TripList from "../../components/TripList";
import {
  addFilterCategory,
  addFilteredTrips,
  addFilterStyle,
  addTrips,
  FILTER_KEY_NAME,
  useTripsContext,
} from "../../lib/context/TripsContext";
import { Trip, Trips } from "../../lib/types/trips";
import styles from "./styles.module.scss";

const Home = () => {
  const {
    tripsState: { trips, filteredTrips, filterStyle, filterCategory },
    dispatch,
  } = useTripsContext();
  const [sortByCheckIn, setSortByCheckIn] = useState<boolean>(true);
  const [tripSet, setTripSet] = useState<Trips["tripSet"]>();

  useEffect(() => {
    void getTrips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortByCheckInDate = useCallback(
    (isSort: boolean) => {
      const sortDta = filteredTrips?.sort((a, b) => {
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
      setTripSet(sortDta);
    },
    [filteredTrips]
  );

  useEffect(() => {
    sortByCheckInDate(sortByCheckIn);
  }, [sortByCheckIn, sortByCheckInDate]);

  const getTrips = async () => {
    const data = await fetch("/data/trips.json");
    const response: Trips = (await data.json()) as Trips;
    if (response) {
      dispatch(addTrips(response));
      if (!filteredTrips) dispatch(addFilteredTrips(response.tripSet));
    }
  };

  const handleSortByCheckIn = (e: ChangeEvent<HTMLInputElement>) => {
    setSortByCheckIn(e.target.checked);
    sortByCheckInDate(e.target.checked);
  };

  const filterTrips = (filterKeyName: FILTER_KEY_NAME, filterValue: string) => {
    return trips?.tripSet.filter((tripSetItem) => {
      const filterStyleRef = tripSetItem[FILTER_KEY_NAME.UnitStyleName];
      const filterCategoryRef = tripSetItem[FILTER_KEY_NAME.ParentCategoryName];
      const allStylesValue = "All Vacations";

      if (filterKeyName === FILTER_KEY_NAME.UnitStyleName && filterCategory) {
        if (
          filterValue === allStylesValue &&
          filterCategoryRef === filterCategory
        )
          return tripSetItem;

        if (
          filterStyleRef === filterValue &&
          filterCategoryRef === filterCategory
        )
          return tripSetItem;
      }

      if (filterKeyName === FILTER_KEY_NAME.ParentCategoryName && filterStyle) {
        if (filterStyle === allStylesValue && filterCategoryRef === filterValue)
          return tripSetItem;

        if (filterCategoryRef === filterValue && filterStyleRef === filterStyle)
          return tripSetItem;
      }

      if (
        (filterKeyName === FILTER_KEY_NAME.UnitStyleName && !filterCategory) ||
        (filterKeyName === FILTER_KEY_NAME.ParentCategoryName && !filterStyle)
      ) {
        const filterRef = tripSetItem[filterKeyName];

        if (filterRef === filterValue) return tripSetItem;
        if (filterValue === allStylesValue) return tripSetItem;
      }
    }) as Trip[];
  };

  const handleStyleFilterClick = (filterValue: string) => {
    dispatch(addFilterStyle(filterValue));
    const filterTripsData = filterTrips(
      FILTER_KEY_NAME.UnitStyleName,
      filterValue
    );
    dispatch(addFilteredTrips(filterTripsData));
  };

  const handleCategoryFilterClick = (filterValue: string) => {
    dispatch(addFilterCategory(filterValue));
    const filterTripsData = filterTrips(
      FILTER_KEY_NAME.ParentCategoryName,
      filterValue
    );
    dispatch(addFilteredTrips(filterTripsData));
  };

  if (!trips) {
    return (
      <div className={styles.loading}>
        <p>...Loading</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <section>
        <TripFilterList
          activeFilter={filterStyle}
          filters={trips?.styles}
          handleOnClick={handleStyleFilterClick}
        />
      </section>
      <section className={styles.filter_category_section}>
        <TripFilterList
          activeFilter={filterCategory}
          filters={trips?.categories}
          handleOnClick={handleCategoryFilterClick}
        />
      </section>
      <section>
        <CheckBox
          checked={sortByCheckIn}
          label="Sort by closest check in"
          handleOnChange={handleSortByCheckIn}
        />
      </section>
      <section className={styles.trip_list_section}>
        <TripList tripSet={tripSet} />
      </section>
    </div>
  );
};

export default Home;
