import { Trips } from "../../lib/types/trips";
import TripFilterItem from "../TripFilterItem";
import styles from "./styles.module.scss";

interface Props {
  filters: Trips["styles"];
}

const TripFilterList = ({ filters }: Props) => {
  return (
    <div>
      <div className={styles.row}>
        {Object.entries(filters)?.map(([key, filterName]) => (
          <div key={key} className={styles.col}>
            <TripFilterItem filterName={filterName} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripFilterList;
