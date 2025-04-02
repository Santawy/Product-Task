// app/product/edit/[id]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductForm from "../../../components/ProductForm";
import { fetchProductById } from "../../../services/products";

interface EditProductProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: EditProductProps): Promise<Metadata> {
  const product = await fetchProductById(params.id);

  return {
    title: product
      ? `Edit ${product.title} - Products App`
      : "Product Not Found",
  };
}

export default async function EditProduct({ params }: EditProductProps) {
  const product = await fetchProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h1>
      <ProductForm productId={product.id} initialData={product} />
    </div>
  );
}
