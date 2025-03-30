export interface Delegate {
  country: string;
  company: string;
  name: string;
  position: string;
  email: string;
  phone: string;
}

export interface FilterState {
  country: string;
  position: string;
  search: string;
}