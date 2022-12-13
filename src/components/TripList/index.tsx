import React, { createElement, useEffect } from "react";
import TripItem from "../TripItem";
import "./styles.scss";

interface Trip {
  unitID: string;
  heroImage: string;
  unitName: string;
  unitStyleName: string;
  checkInDate: string;
  parentCategoryName: string;
}

interface Props {
  tripSet: Trip[];
}

const TripsList = ({ tripSet }: Props) => {
  console.log("my trips", tripSet);
  return (
    <div>
      <h2>Trips</h2>
      {tripSet?.map((trip) => (
        <div key={trip.unitID}>
          <TripItem
            heroImage={trip.heroImage}
            unitName={trip.unitName}
            unitStyleName={trip.unitStyleName}
            checkInDate={trip.checkInDate}
            parentCategoryName={trip.parentCategoryName}
          />
        </div>
      ))}
    </div>
  );
};

export default TripsList;
