import { put, call, select } from "redux-saga/effects";
import { VendorModel, RootState, API_PATH } from "../../models";
import { fetcher } from "../../utilities";
import { stringify } from "querystring";

function* fetchVendors(): Generator<any, void, RootState> {
  try {
    const state = yield select((state: RootState) => state);

    const baseUrl = API_PATH.GET_VENDORS;
    const params = {
      page: state.vendors.currentPage,
      page_size: 10,
      lat: 35.774,
      long: 51.418,
    };

    const url = [baseUrl, stringify(params)].join("");

    const vendors: any = yield call(fetcher, "GET", url);

    const vendorsData: VendorModel[] = vendors.data.finalResult;

    yield put({ type: "SET_VENDORS", payload: vendorsData });
  } catch (error) {
    // Handle error, dispatch an action if needed
  }
}

function* fetchNextPage(): Generator<any, void, RootState> {
  try {

    const state = yield select((state: RootState) => state);

    const nextPage = state.vendors.currentPage + 1;

    const baseUrl = API_PATH.GET_VENDORS;
    const params = {
      page: nextPage,
      page_size: 10,
      lat: 35.774,
      long: 51.418,
    };
    

    const url = [baseUrl, stringify(params)].join("");

    const newVendors: any = yield call(fetcher, "GET", url);

    const vendorsData: VendorModel[] = newVendors.data.finalResult;

    yield put({ type: "UPDATE_VENDOR", payload: vendorsData });
    yield put({ type: "SET_CURRENT_PAGE", payload: nextPage });
  } catch (error) {
    // Handle error, dispatch an action if needed
  }
}

export { fetchVendors, fetchNextPage };
