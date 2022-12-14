import React, { createElement, useEffect } from "react";
import { Styles as StylesEnum, Trip, Trips } from "../../lib/types/trips";
import TripFilterItem from "../TripFilterItem";
import TripItem from "../TripItem";
import _styles from "./styles.module.scss";

interface Props {
  filters: Trips["styles"];
}

const TripFilterList = ({ filters }: Props) => {
  return (
    <div>
      <div className={_styles.row}>
        {Object.entries(filters)?.map(([key, filterName]) => (
          <div key={key} className={_styles.col}>
            <TripFilterItem filterName={filterName} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripFilterList;
