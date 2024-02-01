import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { requestProducts } from "../reducers/products_reducer";
import "../App.css";

interface Product {
    id: number;
    imageSrc: string;
    bodyHtml: string;
}

const ProductCard: React.FC<{ productId: number }> = ({ productId }) => {
    const dispatch = useDispatch();
    const product = useSelector((state: RootState) =>
        state.products.data.find((p: Product) => p.id === productId)
    );

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!product) {
            dispatch(requestProducts());
        }
    }, [dispatch, product]);

    useEffect(() => {
        const loadImage = async () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const context = canvas.getContext("2d");
            if (!context) return;

            const image = new Image();
            image.src = product?.imageSrc || "";

            image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0);
            };
        };

        loadImage();
    }, [product]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card border-secondary my-white-card">
            <div className="card-body">
                <canvas ref={canvasRef} className="product-canvas " />
                <div
                    dangerouslySetInnerHTML={{
                        __html: `${product.bodyHtml.slice(0, 230)}...`,
                    }}
                />
            </div>
        </div>
    );
};

export default ProductCard;
