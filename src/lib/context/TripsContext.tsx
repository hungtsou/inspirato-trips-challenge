import React, { createContext, useReducer, useContext } from "react";
import { Trip, Trips } from "../types/trips";

// Initial state
const initialState: State = {
  trips: null,
  filterStyle: null,
  filteredTrips: null,
};

export const TripsContext = createContext<{
  tripsState: State;
  dispatch: (action?: TripAction) => void;
}>({ tripsState: initialState, dispatch: () => {} });

interface State {
  trips: Trips | null;
  filterStyle: string | null;
  filteredTrips: Trip[] | null;
}

interface TripAction {
  type: string;
  payload: Trips | Trip[] | string;
}

// Actions
export const ADD_TRIPS = "ADD_TRIPS";
export const ADD_FILTER_STYLE = "ADD_FILTER_STYLE";
export const ADD_FILTERED_TRIPS = "ADD_FILTERED_TRIPS";
export const CLEAR_ALL = "CLEAR_ALL";

// Action creators
export function addTrips(trips: Trips) {
  return { type: ADD_TRIPS, payload: trips };
}

export function addFilters(filter: string) {
  return { type: ADD_FILTER_STYLE, payload: filter };
}

export function addFilteredTrips(trips: Trip[]) {
  return { type: ADD_FILTERED_TRIPS, payload: trips };
}

export function clearAll() {
  return { type: CLEAR_ALL };
}

// Reducer
export function tripsReducer(state: State, action: TripAction) {
  switch (action.type) {
    case ADD_TRIPS:
      return { ...state, trips: action.payload as Trips };
    case ADD_FILTER_STYLE:
      return { ...state, filterStyle: action.payload as string };
    case ADD_FILTERED_TRIPS:
      return { ...state, filteredTrips: action.payload as Trip[] };
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
