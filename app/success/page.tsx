"use client";
import { useCartStore } from "@/store/cart-store";
import { useEffect } from "react";
import Link from "next/link";
export default function SuccessPage() {
  const { clear } = useCartStore();
  useEffect(() => {
    clear();
  }, [clear]);
  return (
    <div>
      <h1>Payment successful</h1>
      <p>Thank you for your purchase</p>
      <Link href="/products">Go to products</Link>
    </div>
  );
}
