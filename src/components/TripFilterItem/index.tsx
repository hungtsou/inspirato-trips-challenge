import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "./styles.module.scss";
import "react-lazy-load-image-component/src/effects/blur.css";

interface Props {
  filterName: string;
  activeFilter: string | null;
  handleOnClick: (filterValue: string) => void;
}

const TripFilterItem = ({ filterName, activeFilter, handleOnClick }: Props) => {
  const styleActive =
    activeFilter?.toLocaleLowerCase() === filterName.toLocaleLowerCase()
      ? styles.active
      : "";

  return (
    <button
      onClick={() => handleOnClick(filterName)}
      className={`${styles.btn} ${styleActive}`}
    >
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
