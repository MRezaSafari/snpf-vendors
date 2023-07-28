// vendors.reducer.ts

import { RootState, VendorModel } from "../../models";

interface SetVendorsAction {
  type: "SET_VENDORS";
  payload: VendorModel[];
}

interface UpdateVendorAction {
  type: "UPDATE_VENDOR";
  payload: VendorModel[];
}

interface SetCurrentPageAction {
  type: "SET_CURRENT_PAGE";
  payload: number; // Payload should be the currentPage number
}

type VendorActions =
  | SetVendorsAction
  | UpdateVendorAction
  | SetCurrentPageAction;

const vendorsReducer = (
  state = {
    currentPage: 0,
    data: [] as VendorModel[],
  },
  action: VendorActions
): { currentPage: number; data: VendorModel[] } => {
  switch (action.type) {
    case "SET_VENDORS":
      return {
        currentPage: 0,
        data: action.payload,
      };
    case "UPDATE_VENDOR":
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state as any;
  }
};

export default vendorsReducer;
