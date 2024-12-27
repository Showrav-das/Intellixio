"use client";

import React, { useState, useCallback, useEffect, Suspense } from "react";
import { Product } from "@/types";
import { ProductModal } from "@/views/products/productModal/productModal";
import { BackToHome } from "@/components/backToHome/backToHome";
import { ProductList } from "@/views/products/productList/productList";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { usePagination } from "@/hooks/usePagination";
import { PRODUCTS_DATA } from "@/data/productsData";
import { useRouter, useSearchParams } from "next/navigation";

export const Products: React.FC = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const search = searchParams.get("product-id");
  console.log("first", search);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

  const handleOpenModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    console.log("open modal", product);
    router.push(`/products?product-id=${product.id}`);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  useEffect(() => {
    if (search) {
      PRODUCTS_DATA.find((product) => {
        if (product.id === search) {
          setSelectedProduct(product);
        }
      });
    } else {
      setSelectedProduct(null);
    }
  }, [search]);
  return (
    // <Suspense fallback={<div>Loading...</div>}>
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
    // </Suspense>
  );
};
