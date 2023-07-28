import { takeEvery , takeLatest} from "redux-saga/effects";
import { fetchVendors, fetchNextPage } from "./sagas/vendors.saga";
import { RootState } from "../models";

function* rootSaga(): Generator<any, void, RootState> {
  yield takeEvery("FETCH_VENDORS", fetchVendors);
  yield takeLatest("FETCH_NEXT_PAGE", fetchNextPage);
}

export default rootSaga;
