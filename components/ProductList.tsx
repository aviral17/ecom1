"use client";

import { Pagination } from "@nextui-org/react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

// Create a new QueryClient instance
const queryClient = new QueryClient();

interface Product {
  id?: number;
  title?: string;
  description?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
}

interface ProductProps {
  selectedCategories: any;
  filteredProducts: any;
}

export default function ProductList({
  selectedCategories,
  filteredProducts,
}: ProductProps) {
  // Wrap your component in a QueryClientProvider component
  return (
    <QueryClientProvider client={queryClient}>
      <Products
        selectedCategories={selectedCategories}
        filteredProducts={filteredProducts}
      />
    </QueryClientProvider>
  );
}

function Products({ selectedCategories, filteredProducts }: ProductProps) {
  const {
    data: responseData,
    isLoading,
    error,
  } = useQuery<any>({
    queryKey: ["products"], // Use a unique query key
    queryFn: () =>
      fetch("https://dummyjson.com/products").then((res) => res.json()),
    staleTime: Infinity, // Revalidate data every 5 seconds (optional)
  });

  const products =
    responseData && responseData.products ? responseData.products : [];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  console.log("SELECTED CATEGORIES = ", selectedCategories);
  console.log("filtered CATEGORIES = ", filteredProducts);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Products
        </h2>

        {isLoading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>Error loading products: {error.message}</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {selectedCategories.length > 0 // Check if the selectedCategories array is empty or not
              ? filteredProducts.length > 0 &&
                filteredProducts
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((product: Product) => (
                    <Link href={`/products/${product.id}`}>
                      <div key={product.id} className="group relative">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                          <img
                            src={product.thumbnail}
                            alt={`Front of men's ${product.title} in black.`}
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                          />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm text-gray-700">
                              {/* <a href={`/products/${product.id}`}>{product.title}</a> */}
                              {product.title}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.category}
                            </p>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
              : // If the selectedCategories array is empty, render all the products
                products.length > 0 &&
                products
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                  )
                  .map((product: Product) => (
                    <Link href={`/products/${product.id}`}>
                      <div key={product.id} className="group relative">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                          <img
                            src={product.thumbnail}
                            alt={`Front of men's ${product.title} in black.`}
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                          />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm text-gray-700">
                              {/* <a href={`/products/${product.id}`}>{product.title}</a> */}
                              {product.title}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.category}
                            </p>
                          </div>
                          <p className="text-sm font-medium text-gray-900">
                            ${product.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
          </div>
        )}
      </div>
      <Pagination
        total={Math.ceil(
          filteredProducts.length > 0
            ? filteredProducts.length / itemsPerPage
            : products.length / itemsPerPage
        )}
        // pageSize={itemsPerPage}
        page={currentPage}
        onChange={(page) => handleClick(page)}
        showShadow={true}
        size="lg"
        className="mt-1"
      />
    </div>
  );
}
