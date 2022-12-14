import { Trips } from "../../lib/types/trips";
import TripFilterItem from "../TripFilterItem";
import styles from "./styles.module.scss";

interface Props {
  filters: Trips["styles"];
  activeFilter: string | null;
  handleOnClick: (filterValue: string) => void;
}

const TripFilterList = ({ filters, activeFilter, handleOnClick }: Props) => {
  return (
    <div>
      <div className={styles.row}>
        {Object.entries(filters)?.map(([key, filterName]) => (
          <div key={key} className={styles.col}>
            <TripFilterItem
              activeFilter={activeFilter}
              filterName={filterName}
              handleOnClick={handleOnClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripFilterList;
