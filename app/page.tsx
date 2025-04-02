import { Metadata } from "next";
import { fetchProducts, Product } from "./services/products";
import ProductCard from "./components/ProductCard";

export const metadata: Metadata = {
  title: "Products App - Home",
};

export default async function Home() {
  const products: Product[] = await fetchProducts();

  return (
    <div className="px-4 sm:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
