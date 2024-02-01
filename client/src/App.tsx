import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./card/product_card";
import { RootState } from "./store/store";
import { requestProducts } from "./reducers/products_reducer";
import Navbar from "./navbar/navbar";

const App: React.FC = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products.data);

    useEffect(() => {
        dispatch(requestProducts());
    }, [dispatch]);

    return (
        <div className="App">
            <Navbar />

            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} productId={product.id} />
                ))}
            </div>
        </div>
    );
};

export default App;
