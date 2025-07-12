import { stripe } from "@/lib/stripe";
import Link from "next/link";
import Image from "next/image";

export default async function Products() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });
  console.log(products);
  return (
    <div>
      <h1>Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.data.map((product) => (
          <div key={product.id}>
            <Link href={`/product/${product.id}`}>
              <Image
                src={product.images[0]}
                alt={product.name}
                width={300}
                height={300}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
