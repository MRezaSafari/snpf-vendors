type VendorType = "VENDOR" | "TEXT";

type DataType = string | VendorEntity;

export interface VendorEntity {
  id: number;
  title: string;
  description: string;
  backgroundImage: string;
  logo: string;
  rate: number;
  voteCount: number;
  isZFExpress: boolean;
  deliveryFee: number;
}

export interface VendorModel {
  type: VendorType;
  data: DataType;
}

export interface VendorsModel {
  data: {
    finalResult: VendorModel[];
  };
}
