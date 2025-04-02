import axios from "axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export type CreateProductData = Omit<Product, "id" | "rating">;

export type UpdateProductData = Partial<Omit<Product, "id" | "rating">>;

const BASE_URL = "https://fakestoreapi.com/products";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (
  id: number | string
): Promise<Product> => {
  try {
    const response = await axios.get<Product>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export const createProduct = async (
  productData: CreateProductData
): Promise<Product> => {
  try {
    const response = await axios.post<Product>(BASE_URL, productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
export const updateProduct = async (
  id: number | string,
  productData: UpdateProductData
): Promise<Product> => {
  try {
    const response = await axios.put<Product>(`${BASE_URL}/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
};

export const deleteProduct = async (
  id: number | string
): Promise<{ id: number }> => {
  try {
    const response = await axios.delete<{ id: number }>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
};
