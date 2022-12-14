import { ChangeEvent, useCallback, useEffect, useState } from "react";
import CheckBox from "../../components/CheckBox";
import TripFilterList from "../../components/TripFilterList";
import TripList from "../../components/TripList";
import {
  addFilteredTrips,
  addTrips,
  useTripsContext,
} from "../../lib/context/TripsContext";
import { Trips } from "../../lib/types/trips";
import styles from "./styles.module.scss";

const Home = () => {
  const {
    tripsState: { trips, filteredTrips },
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
        <TripFilterList filters={trips?.styles} />
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
