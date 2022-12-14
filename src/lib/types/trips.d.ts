export type Trip = {
  heroImage: string;
  unitName: string;
  unitStyleName: string;
  checkInDate: string;
  parentCategoryName: string;
  propertyID: string;
};

export type Trips = {
  tripSet: Trip[];
};
