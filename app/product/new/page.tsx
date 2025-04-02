import { Metadata } from "next";
import ProductForm from "../../components/ProductForm";

export const metadata: Metadata = {
  title: "Add New Product - Products App",
};

export default function NewProduct() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>
      <ProductForm />
    </div>
  );
}
