import axios from "axios";
import { logger } from "../logger";
import { APIError } from "../error";
import { Product } from "../../dto/product.dto";
import { User } from "../../dto/user.model";

const CATALOG_BASE_URL =
  process.env.CATALOG_BASE_URL || "http://localhost:9001";

const AUTH_SERVICE_BASE_URL = process.env.AUTH_SERVICE_BASE_URL || "http://localhost:9000";

export const GetproductDetails = async (productId: number) => {
  try {
    const response = await axios.get(
      `${CATALOG_BASE_URL}/products/${productId}`
    );
    return response.data as Product;
  } catch (error) {
    logger.error(error);
    throw new APIError("Error while fetching product details");
  }
};


export const ValidateUser = async (token: string) => {
  try {
    // axios.defaults.headers.common["Authorization"] = token;
    const response = await axios.get(`${AUTH_SERVICE_BASE_URL}/validate`, {
      headers: {
        Authorization: token,
      }
    });

    if (response.status !== 200) {
      throw new APIError("Error while validating user");
    }

    return response.data as User;
  } catch (error) {
    logger.error(error);
    throw new APIError("Error while validating user");
    
  }
}