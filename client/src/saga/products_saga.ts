import { call, put, takeEvery } from "redux-saga/effects";
import { getProductsAsync } from "../services/api_client";
import {
    requestProducts,
    requestProductsFailure,
    requestProductsSuccess,
} from "../reducers/products_reducer";

function* fetchProducts(): Generator<any, void, any> {
    try {
        const response = yield call(getProductsAsync);
        yield put(requestProductsSuccess(response.data));
    } catch (error: any) {
        yield put(requestProductsFailure(error.message));
    }
}

function* productsSaga(): Generator {
    yield takeEvery(requestProducts, fetchProducts);
}

export default productsSaga;
