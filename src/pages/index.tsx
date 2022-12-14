import React, { createElement, useEffect } from "react";
import { TripsProvider } from "../lib/context/TripsContext";
import Home from "./Home";

const Pages = () => {
  return (
    <>
      <TripsProvider>
        <Home />
      </TripsProvider>
    </>
  );
};

export default Pages;
