export type monumentos = {
  name: string;
  description: string;
  postal_code: number;
  ISO: string;
};

export type Location = {
  country: string;
  city: string;
  zipcode: string;
};

export type Weather = {
  location: Location;
  temperature: number;
  description: string;
};
