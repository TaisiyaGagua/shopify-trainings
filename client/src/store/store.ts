import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import productsReducer from "../reducers/products_reducer";
import rootSaga from "../saga/root_saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        products: productsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
