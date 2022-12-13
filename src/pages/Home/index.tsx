/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from "react";
import TripList from "../../components/TripList";
import styles from "./styles.module.scss";

interface TripsData {
  tripSet: any[];
}

const Home = () => {
  const [tripsData, setTripsData] = useState<TripsData>();
  const [sortByCheckIn, setSortByCheckIn] = useState<boolean>(false);

  useEffect(() => {
    void getTrips();
  }, []);

  const getTrips = async () => {
    const data = await fetch("../../assets/data/trips.json");
    const response: TripsData = await data.json();
    if (response) setTripsData(response);
  };

  const sortByCheckInDate = () => {
    if (sortByCheckIn) {
      return tripsData?.tripSet?.sort(
        (a: { checkInDate: number }, b: { checkInDate: number }) =>
          new Date(Number(a.checkInDate)).valueOf() -
          new Date(b.checkInDate).valueOf()
      );
    }

    return tripsData?.tripSet;
  };

  return (
    <div>
      <div className={styles.container}>
        <h1>Welcome</h1>
        <TripList tripSet={sortByCheckInDate()} />
      </div>
    </div>
  );
};

export default Home;
