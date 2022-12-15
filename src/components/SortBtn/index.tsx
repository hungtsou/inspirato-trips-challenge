import { ChangeEvent, FunctionComponent, MouseEvent } from "react";
import styles from "./styles.module.scss";

interface Props {
  label?: string;
  handleOnClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const SortBtn: FunctionComponent<Props> = ({ label, handleOnClick }) => {
  return (
    <button className={styles.btn} onClick={(e) => handleOnClick(e)}>
      <img
        className={styles.img}
        src="/images/sort-icon.png"
        alt="sort items"
      />
      {label && <span className={styles.label}>{label}</span>}
    </button>
  );
};

export default SortBtn;
