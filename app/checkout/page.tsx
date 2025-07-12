"use client";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { checkoutAction } from "./checkout-action";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Checkout() {
  const { items, addItem, removeItem, clear } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  if (total === 0 || items.length === 0) {
    return <div>No items in cart</div>;
  }
  return (
    <div>
      <h1>Checkout</h1>
      <div>
        <h2>Order Summary</h2>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <div>
                <span>{item.name}</span>
                <span>${((item.price * item.quantity) / 100).toFixed(2)}</span>
              </div>
              <div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                >
                  -
                </Button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <Button
                  size="icon"
                  onClick={() => addItem({ ...item, quantity: 1 })}
                >
                  +
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <div>Total: ${(total / 100).toFixed(2)}</div>
      </div>
      <form action={checkoutAction}>
        <input hidden name="items" value={JSON.stringify(items)} />
        <Button type="submit" className="max-w-md mx-auto">
          Checkout
        </Button>
      </form>
    </div>
  );
}
