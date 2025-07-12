"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  default_price:
    | {
        unit_amount: number;
      }
    | string;
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { items, addItem, removeItem } = useCartStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cartItem = items.find((item) => item.id === params.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  // Handle price extraction with proper type checking
  const getPrice = () => {
    if (!product) return 0;
    if (typeof product.default_price === "string") {
      return 0; // Handle string case
    }
    return product.default_price?.unit_amount || 0;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !product) {
    return <div>Error: {error || "Product not found"}</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <Image
        src={product.images[0]}
        alt={product.name}
        width={300}
        height={300}
      />
      <p>{product.description}</p>
      <Button
        onClick={() =>
          addItem({
            id: product.id,
            name: product.name,
            price: getPrice(),
            quantity: 1,
            imageUrl: product.images[0],
          })
        }
      >
        Add to Cart
      </Button>
      <Button onClick={() => removeItem(product.id)}>-</Button>
      <p>{quantity}</p>
      <Button
        onClick={() =>
          addItem({
            id: product.id,
            name: product.name,
            price: getPrice(),
            quantity: 1,
            imageUrl: product.images[0],
          })
        }
      >
        +
      </Button>
      <Link href="/products">Back to Products</Link>
    </div>
  );
}
