import { useEffect, useState } from "react";
import TripList from "../../components/TripList";
import "./styles.scss";

interface TripsData {
  tripSet: any;
}

const Home = () => {
  const [tripsData, setTripsData] = useState<TripsData>();

  useEffect(() => {
    void getTrips();
  }, []);

  const getTrips = async () => {
    const data = await fetch("../../assets/data/trips.json");
    const response: TripsData = await data.json();
    if (response) setTripsData(response);
  };

  return (
    <div>
      <h1>Welcome</h1>
      <TripList tripSet={tripsData?.tripSet} />
    </div>
  );
};

export default Home;
