import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 3,
  });
  console.log(products);
  return (
    <div>
      <section>
        <h2 className="text-2xl font-bold">Welcome to My Ecommerce</h2>
        <p>Discover our latest products</p>
        <Button asChild variant="default">
          <Link href="/products">View All Products</Link>
        </Button>
        <Image
          src={products.data[0].images[0]}
          alt="Hero Image"
          width={450}
          height={450}
        />
      </section>
    </div>
  );
}
