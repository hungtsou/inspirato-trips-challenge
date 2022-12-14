import React, { createElement, useEffect } from "react";
import { Trip } from "../../lib/types/trips";
import TripItem from "../TripItem";
import styles from "./styles.module.scss";

interface Props {
  tripSet?: Trip[];
}

const TripsList = ({ tripSet }: Props) => {
  return (
    <div>
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
