import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./rootSaga";
import { RootState, VendorModel } from "../models";
import { composeWithDevTools } from "redux-devtools-extension";

const middlewares = [];

const initialState: any = {
  vendors: {
    data: [] as VendorModel[],
    currentPage: 0,
  },
};

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga as any);

export default store;
