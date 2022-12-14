import React, { FunctionComponent } from "react";
import styles from "./styles.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface Props {
  heroImage: string;
  unitName: string;
  unitStyleName: string;
  checkInDate: string;
  parentCategoryName: string;
}

const TripItem: FunctionComponent<Props> = ({
  heroImage,
  unitName,
  unitStyleName,
  checkInDate,
  parentCategoryName,
}) => {
  return (
    <div className={styles.trip_item}>
      <div className={styles.col}>
        <LazyLoadImage
          className={styles.img}
          effect="blur"
          src={`${heroImage}?width=400`}
          alt={`${unitStyleName} trip`}
        />
      </div>
      <div className={styles.col}>
        <p className="name">Name: {unitName}</p>
        <p className="style_name">Style: {unitStyleName}</p>
        <p className="category_name">Category: {parentCategoryName}</p>
        <p className="check_in_date">
          Check in: {new Date(checkInDate).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default TripItem;
