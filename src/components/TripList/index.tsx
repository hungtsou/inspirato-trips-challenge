import React, { createElement, useEffect } from "react";
import TripItem from "../TripItem";
import styles from "./styles.module.scss";

interface Trip {
  unitID: string;
  heroImage: string;
  unitName: string;
  unitStyleName: string;
  checkInDate: string;
  parentCategoryName: string;
}

interface Props {
  tripSet?: Trip[];
}

const TripsList = ({ tripSet }: Props) => {
  console.log("my trips", tripSet);
  return (
    <div>
      <h2>Trips</h2>
      <div className={styles.grid}>
        {tripSet?.map((trip, i) => (
          <div key={i}>
            <TripItem
              heroImage={`https://cms.inspirato.com/${trip.heroImage}?width=400`}
              unitName={trip.unitName}
              unitStyleName={trip.unitStyleName}
              checkInDate={trip.checkInDate}
              parentCategoryName={trip.parentCategoryName}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripsList;
