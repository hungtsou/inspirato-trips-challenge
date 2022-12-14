import React, { createElement, FunctionComponent, useEffect } from "react";
import { createRoot } from "react-dom/client";
import styles from "./styles.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Trip } from "../../lib/types/trips";
import "react-lazy-load-image-component/src/effects/blur.css";

interface Props {
  heroImage: Trip["heroImage"];
  unitName: Trip["unitName"];
  unitStyleName: Trip["unitStyleName"];
  checkInDate: Trip["checkInDate"];
  parentCategoryName: Trip["parentCategoryName"];
}

const TripItem: FunctionComponent<Props> = ({
  heroImage,
  unitName,
  unitStyleName,
  checkInDate,
  parentCategoryName,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <div className={styles.col}>
          <LazyLoadImage
            className={styles.img}
            effect="blur"
            src={heroImage}
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
    </div>
  );
};

export default TripItem;
