import { combineReducers } from "redux";
import vendorsReducer from "./reducers/vendors.reducer";

const rootReducer = combineReducers({
  vendors: vendorsReducer,
});

export default rootReducer;
