export interface ICitizen {
  name: string;
  password: string;
  phone: string;
  email?: string;
  district?: string;
  tehsil?: string;
  wssc_code?: string;
  createdAt: NativeDate;
  updatedAt: NativeDate;
}
