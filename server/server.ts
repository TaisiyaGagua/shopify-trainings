import express, { Request, Response } from "express";
import axios from "axios";
import { Product, ProductModel } from "./dtos/product_dto";
import mongoose from "mongoose";
require("dotenv").config({ path: ".env" });

let cors = require("cors");

const app = express();
const port = 5005;

mongoose.Promise = require("bluebird");

mongoose.connect(process.env.MONGODB_URI!);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", async () => {
    const collectionName = "products";
    const database = db.db;
    const collections = await database.collections();
    const collectionExists = collections.some(
        (coll) => coll.collectionName === collectionName
    );

    if (!collectionExists) {
        await database.createCollection(collectionName);
    }
});

app.use(cors());

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.get("/products", async (req: Request, res: Response) => {
    try {
        const fetchedProducts = await fetchProducts();
        if (fetchedProducts) {
            await saveProductsToDatabase(fetchedProducts);

            const allProducts = await getProductsFromDatabase();
            res.status(200).json({
                message: "Products fetched and saved successfully.",
                allProducts,
            });
        } else {
            res.status(500).send("An error occurred while fetching products.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while executing the request.");
    }
});

async function fetchProducts(): Promise<Product[] | null> {
    const graphqlUrl = process.env.SHOPIFY_GRAPHQL_API;
    const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;

    const graphqlQuery = `
    {
      shop {
        products(first: 5) {
          edges {
            node {
              id
              bodyHtml
              images(first: 1) {
                edges {
                  node {
                    src
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

    try {
        const response = await axios.post(
            graphqlUrl!,
            { query: graphqlQuery },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Access-Token": accessToken,
                },
            }
        );

        const products: Product[] = response.data.data.shop.products.edges.map(
            (product: any) => {
                const { id, bodyHtml } = product.node;
                const imageSrc = product.node.images.edges[0]?.node.src || null;
                return { id, bodyHtml, imageSrc };
            }
        );

        return products;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function saveProductsToDatabase(products: Product[]): Promise<Product[]> {
    const savedProducts: Product[] = [];

    for (const product of products) {
        try {
            const existingProduct = await ProductModel.findOne({
                id: product.id,
            });

            if (!existingProduct) {
                const createdProduct = await ProductModel.create(product);
                savedProducts.push(createdProduct);
            }
        } catch (error) {
            console.error(`Error saving product to database: ${error}`);
        }
    }

    return savedProducts;
}

async function getProductsFromDatabase(): Promise<Product[]> {
    try {
        await saveProductsToDatabase([]);
        const products = await ProductModel.find({});
        return products;
    } catch (error) {
        console.error(`Error getting products from database: ${error}`);
        throw error;
    }
}
