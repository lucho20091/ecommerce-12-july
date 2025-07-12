"use server";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { CartItem } from "@/store/cart-store";
export const checkoutAction = async (formData: FormData): Promise<void> => {
  const items = formData.get("items") as string;
  const itemsArray = JSON.parse(items);
  const line_items = itemsArray.map((item: CartItem) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
      },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
  });

  redirect(session.url!);
};
