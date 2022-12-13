import React, { createElement, FunctionComponent, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.scss";

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
    <div>
      <div>
        <img src={heroImage} alt={`${unitStyleName} trip`} />
      </div>
      <div>
        <p className="name">{unitName}</p>
        <p className="style_name">{unitStyleName}</p>
        <p className="check_in_date">{checkInDate}</p>
        <p className="category_name">{parentCategoryName}</p>
      </div>
    </div>
  );
};

export default TripItem;
