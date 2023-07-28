import { VendorModel } from "./vendors.model";

export interface RootState {
  vendors: {
    data: VendorModel[];
    currentPage: number;
  };
}
