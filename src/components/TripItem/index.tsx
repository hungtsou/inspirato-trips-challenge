import React, { FunctionComponent, useState } from "react";
import styles from "./styles.module.scss";

interface Props {
  heroImage: string;
  unitName: string;
  unitStyleName: string;
  checkInDate: string;
  parentCategoryName: string;
}

const ImgPlaceHolder = () => <div className={styles.img_placeholder}></div>;

const TripItem: FunctionComponent<Props> = ({
  heroImage,
  unitName,
  unitStyleName,
  checkInDate,
  parentCategoryName,
}) => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  return (
    <div className={styles.trip_item}>
      <div className={styles.col}>
        {!isImgLoaded && <ImgPlaceHolder />}
        <img
          className={styles.img}
          src={`${heroImage}?width=400`}
          alt={`${unitStyleName} trip`}
          onLoad={() => setIsImgLoaded(true)}
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
