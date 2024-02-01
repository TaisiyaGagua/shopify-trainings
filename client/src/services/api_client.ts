import axios from "axios";
import { ApiResultWrapper } from "../common/api_result_wrapper";
import { ProductDto } from "../dtos/product_dto";

export async function getProductsAsync(): Promise<
    ApiResultWrapper<ProductDto[]>
> {
    const url = "http://localhost:5005/products";

    try {
        const response = await axios.get<ProductDto[]>(url);
        const result: ApiResultWrapper<ProductDto[]> = {
            data: response.data,
            error: undefined,
        };

        return result;
    } catch (error) {
        const result: ApiResultWrapper<ProductDto[]> = {
            data: undefined,
            error: error as string,
        };

        return result;
    }
}
