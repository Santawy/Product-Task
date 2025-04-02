import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import "./globals.css";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout = ({ children, title = "Products App" }: LayoutProps) => {
  return (
    <html className="min-h-screen bg-gray-100">
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="A simple products application built with Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-blue-600">Products App</h1>
            </Link>
            <Link href="/product/new">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Add New Product
              </button>
            </Link>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>

        <footer className="bg-white border-t border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
            <p>
              © {new Date().getFullYear()} Products App - Built with Next.js
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
};

export default Layout;
