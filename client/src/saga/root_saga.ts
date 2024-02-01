import { all } from "redux-saga/effects";
import productsSaga from "./products_saga";

function* rootSaga() {
    yield all([productsSaga()]);
}

export default rootSaga;
