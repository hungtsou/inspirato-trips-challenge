import { LazyLoadImage } from "react-lazy-load-image-component";
import { Trip } from "../../lib/types/trips";
import styles from "./styles.module.scss";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  addFilteredTrips,
  addFilters,
  useTripsContext,
} from "../../lib/context/TripsContext";

interface Props {
  filterName: string;
}

const TripFilterItem = ({ filterName }: Props) => {
  const {
    tripsState: { trips, filterStyle },
    dispatch,
  } = useTripsContext();

  const styleActive =
    filterStyle?.toLocaleLowerCase() === filterName.toLocaleLowerCase()
      ? styles.active
      : "";

  const filterTrips = (filterValue: string) => {
    return trips?.tripSet.filter((tripSetItem) => {
      const unitStyleName = tripSetItem.unitStyleName.toLocaleLowerCase();
      const _filterValue = filterValue.toLocaleLowerCase();

      if (unitStyleName === _filterValue) return tripSetItem;
      if (_filterValue === "all vacations") return tripSetItem;
    }) as Trip[];
  };

  const handleOnClick = () => {
    const filterTripsData = filterTrips(filterName);
    dispatch(addFilters(filterName));
    dispatch(addFilteredTrips(filterTripsData));
  };

  return (
    <button onClick={handleOnClick} className={`${styles.btn} ${styleActive}`}>
      <LazyLoadImage
        className={styles.img}
        effect="blur"
        src={
          "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg"
        }
        alt={filterName}
      />
      <span>{filterName}</span>
    </button>
  );
};

export default TripFilterItem;
