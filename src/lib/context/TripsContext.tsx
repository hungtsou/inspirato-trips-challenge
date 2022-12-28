import React, { createContext, useReducer, useContext } from "react";
import { Trip, Trips } from "../types/trips";

// Initial state
const initialState: State = {
  trips: null,
  filteredTrips: null,
  filters: null,
};

export const TripsContext = createContext<{
  tripsState: State;
  dispatch: (action?: TripAction) => void;
}>({ tripsState: initialState, dispatch: () => {} });

interface State {
  trips: Trips | null;
  filters: { [key in FILTER_KEY_NAME]: string } | null;
  filteredTrips: Trip[] | null;
}

export enum FILTER_KEY_NAME {
  UnitStyleName = "unitStyleName",
  ParentCategoryName = "parentCategoryName",
}
interface TripAction {
  type: string;
  payload: Trips | Trip[] | string | State["filters"];
}

// Actions
export const ADD_TRIPS = "ADD_TRIPS";
export const ADD_FILTERED_TRIPS = "ADD_FILTERED_TRIPS";
export const ADD_FILTER = "ADD_FILTER";
export const CLEAR_ALL = "CLEAR_ALL";

// Action creators
export function addTrips(trips: Trips) {
  return { type: ADD_TRIPS, payload: trips };
}

export function addFilteredTrips(trips: Trip[]) {
  return { type: ADD_FILTERED_TRIPS, payload: trips };
}

export function addFilter(filter: State["filters"]) {
  return { type: ADD_FILTER, payload: filter };
}

export function clearAll() {
  return { type: CLEAR_ALL };
}

// Reducer
export function tripsReducer(state: State, action: TripAction) {
  switch (action.type) {
    case ADD_TRIPS:
      return { ...state, trips: action.payload as Trips };
    case ADD_FILTERED_TRIPS:
      return { ...state, filteredTrips: action.payload as Trip[] };
    case ADD_FILTER:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
}

function TripsProvider(props: any) {
  const [tripsState, dispatch] = useReducer(tripsReducer, initialState);

  const todoData = { tripsState, dispatch };

  return <TripsContext.Provider value={todoData} {...props} />;
}

function useTripsContext() {
  return useContext(TripsContext);
}

export { TripsProvider, useTripsContext };
