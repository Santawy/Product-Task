import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import {
  fetchProductById,
  deleteProduct,
  Product,
  fetchProducts,
} from "../../services/products";

// Define proper types for Next.js App Router
interface PageProps {
  params: {
    id: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

// Generate metadata including title
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const product = await fetchProductById(params.id);

  return {
    title: product ? `${product.title} - Products App` : "Product Not Found",
  };
}

export default async function ProductDetail({ params }: PageProps) {
  const product = await fetchProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3 p-4 flex justify-center">
          <div className="relative h-72 w-full">
            <Image
              src={product.image}
              alt={product.title}
              fill
              style={{ objectFit: "contain" }}
              priority
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </div>
        <div className="md:w-2/3 p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {product.title}
            </h1>
            <div className="text-2xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </div>
          </div>

          <div className="mb-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              {product.category}
            </span>
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex space-x-4">
            <a
              href={`/product/edit/${product.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Edit Product
            </a>
            <form
              action={async () => {
                "use server";
                await deleteProduct(product.id);
              }}
            >
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Delete Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate static paths at build time
export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  const products = await fetchProducts();

  return products.map((product: Product) => ({
    id: product.id.toString(),
  }));
}
