import mongoose, { Schema } from "mongoose";

export interface Product {
    id: string;
    bodyHtml: string;
    imageSrc: string | null;
}

interface ProductModel extends Document, Product {}

const productSchema = new Schema<ProductModel>(
    {
        id: String,
        bodyHtml: String,
        imageSrc: String,
    },
    { versionKey: false }
);

export const ProductModel = mongoose.model<ProductModel>(
    "products",
    productSchema
);
