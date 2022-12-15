export type Trip = {
  heroImage: string;
  unitName: string;
  unitStyleName: string;
  checkInDate: string;
  parentCategoryName: string;
  propertyID: string;
};

export enum Style {
  All = "All Vacations",
  Beach = "Beach",
  Mountain = "Mountain",
  Lifestyle = "Lifestyle",
  Metropolitan = "Metropolitan",
}

export enum Category {
  "Homes" = "Homes",
  "Rooms/Suites" = "Rooms/Suites",
}

export type Trips = {
  tripSet: Trip[];
  styles: { [key: string]: Style };
  categories: { [key: string]: Category };
};
