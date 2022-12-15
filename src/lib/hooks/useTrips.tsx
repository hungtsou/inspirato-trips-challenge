import { useEffect } from "react";
import { Trips } from "../types/trips";
import { getTrips as getTripsService } from "../services/trips.service";
import { addTrips, useTripsContext } from "../context/TripsContext";

const useTrips = () => {
  const { tripsState, dispatch } = useTripsContext();

  useEffect(() => {
    void getTrips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTrips = async () => {
    const data = await getTripsService();
    const response: Trips = (await data.json()) as Trips;
    if (response) {
      dispatch(addTrips(response));
    }
  };

  return tripsState;
};

export default useTrips;
