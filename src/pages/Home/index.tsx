/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import CheckBox from "../../components/CheckBox";
import TripList from "../../components/TripList";
import { Trips } from "../../lib/types/trips";
import styles from "./styles.module.scss";

const Home = () => {
  const [tripsData, setTripsData] = useState<Trips>();
  const [sortByCheckIn, setSortByCheckIn] = useState<boolean>(true);
  const [tripSet, setTripSet] = useState<Trips["tripSet"]>();

  useEffect(() => {
    void getTrips();
  }, []);

  const sortByCheckInDate = useCallback(
    (isSort: boolean) => {
      const sortDta = tripsData?.tripSet?.sort((a, b) => {
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
    [tripsData?.tripSet]
  );

  useEffect(() => {
    sortByCheckInDate(sortByCheckIn);
  }, [tripsData, sortByCheckIn, sortByCheckInDate]);

  const getTrips = async () => {
    const data = await fetch("../../assets/data/trips.json");
    const response: Trips = (await data.json()) as Trips;
    if (response) {
      console.log("response", response);
      setTripsData(response);
    }
  };

  const handleSortByCheckIn = (e: ChangeEvent<HTMLInputElement>) => {
    setSortByCheckIn(e.target.checked);
    sortByCheckInDate(e.target.checked);
  };

  return (
    <div>
      <div className={styles.container}>
        <h1>Welcome</h1>
        <CheckBox
          checked={sortByCheckIn}
          label="Sort by closest check in"
          handleOnChange={handleSortByCheckIn}
        />
        <TripList tripSet={tripSet} />
      </div>
    </div>
  );
};

export default Home;
