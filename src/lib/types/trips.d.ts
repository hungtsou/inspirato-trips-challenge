export type Trip = {
  heroImage: string;
  unitName: string;
  unitStyleName: string;
  checkInDate: string;
  parentCategoryName: string;
  propertyID: string;
};

export enum Styles {
  All = "All Vacations",
  Beach = "Beach",
  Mountain = "Mountain",
  Lifestyle = "Lifestyle",
  Metropolitan = "Metropolitan",
}

export type Trips = {
  tripSet: Trip[];
  styles: { [key: string]: string };
};
