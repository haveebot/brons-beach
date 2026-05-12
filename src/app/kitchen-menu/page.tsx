import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "../SiteNav";

export const metadata: Metadata = {
  title: "Kitchen Menu",
  description:
    "Bron's Backyard Kitchen menu — Wisconsin garlic cheese curds, fried pickles, the Jimmy Jam Smashburger, chicken tenders, and bone-in wings. Open Wed–Sun at 5pm in Port Aransas.",
};

interface MenuItem {
  name: string;
  description?: string;
  price: string;
  modifiers?: string;
}

const SHARABLES: MenuItem[] = [
  {
    name: "Wisconsin Garlic Cheese Curds",
    description: "Served with marinara sauce and ranch",
    price: "$10.99",
  },
  {
    name: "Fried Pickles with Ranch Dressing",
    price: "$10.99",
  },
  {
    name: "Large Basket of Fries",
    price: "$5.99",
  },
  {
    name: "Large Basket of Garlic Fries",
    price: "$7.99",
  },
];

const ENTREES: MenuItem[] = [
  {
    name: "Adult Grilled Cheese with Fries",
    description:
      "Sourdough bread, cheddar, white cheddar, American cheese, Roma tomatoes and peppered bacon",
    price: "$13.99",
  },
  {
    name: "Jimmy Jam Smashburger with Fries",
    description:
      "Brisket blend patty, American cheese, grilled onion, lettuce, Roma tomatoes, and pickles",
    modifiers: "Add cheese $1.50 · Add bacon $1.50",
    price: "$14.99",
  },
  {
    name: "4 Chicken Tenders with Fries",
    description: "Served with ranch and honey mustard dressing",
    price: "$13.99",
  },
  {
    name: "Breaded Bone-In Chicken Wings",
    description:
      "Sauces: buffalo, sweet chili, garlic parmesan, or naked. Served with a side of ranch.",
    price: "$14.95",
  },
];

const KIDS: MenuItem[] = [
  {
    name: "Grilled Cheese with Fries and Juice Box",
    description: "Sourdough bread with American cheese",
    price: "$8.99",
  },
  {
    name: "Chicken Tenders with Fries and Juice Box",
    description: "Two large chicken tenders served with ranch",
    price: "$8.99",
  },
];

function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-4 border-b border-bron-deep-blue/10 last:border-b-0">
      <div className="flex-1">
        <p className="font-bold text-bron-deep-blue text-sm sm:text-base uppercase tracking-wide">
          {item.name}
        </p>
        {item.description && (
          <p className="text-xs sm:text-sm text-bron-deep-blue/75 mt-1 leading-relaxed">
            {item.description}
          </p>
        )}
        {item.modifiers && (
          <p className="text-xs text-bron-coral/85 italic mt-1.5">
            {item.modifiers}
          </p>
        )}
      </div>
      <p className="font-display text-xl sm:text-2xl font-bold text-bron-coral whitespace-nowrap">
        {item.price}
      </p>
    </div>
  );
}

export default function KitchenMenuPage() {
  return (
    <>
      <SiteNav />
      <main className="bg-bron-sand min-h-screen">
        {/* Hero — text left, food photo right */}
        <section className="bg-bron-deep-blue text-white pt-24 sm:pt-32 pb-14 sm:pb-20">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-bron-pink font-bold mb-3">
                Wed–Sun · 5pm onward · 314 E Avenue G
              </p>
              <h1 className="font-display text-4xl sm:text-6xl font-bold mb-4 leading-tight">
                Bron&apos;s Backyard Kitchen
              </h1>
              <p className="font-display italic text-xl sm:text-2xl text-bron-light-blue mb-5">
                Enjoy Our Backyard With Delicious Food!
              </p>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed">
                At <strong>Bron&apos;s Backyard Kitchen</strong>, enjoy our
                laid-back island atmosphere with delicious food that&apos;s
                always cooked fresh! Whether you&apos;re gathering with
                friends or family, we&apos;ve got a variety of flavorful
                dishes to make your time memorable. Come to Bron&apos;s and
                enjoy a good time in our beautiful backyard setting. It&apos;s
                the perfect spot to relax, eat well, and soak in the island
                vibes!
              </p>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden border-4 border-bron-coral shadow-2xl max-w-md w-full mx-auto">
              <Image
                src="/images/brons-food-1.png"
                alt="A Bron's Kitchen burger and fries in a checkered basket"
                fill
                sizes="(min-width: 768px) 50vw, 90vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Sharables */}
        <section className="bg-bron-sand py-14 sm:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-bron-coral font-bold mb-2">
                For the table
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-bron-deep-blue">
                Sharables
              </h2>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
              {SHARABLES.map((item) => (
                <MenuItemRow key={item.name} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Entrees — color band */}
        <section className="bg-bron-blue text-white py-14 sm:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-bron-yellow font-bold mb-2">
                Hot off the flat top
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-bold">
                Entrees
              </h2>
            </div>
            <div className="bg-bron-deep-blue rounded-2xl shadow-md p-6 sm:p-8">
              {ENTREES.map((item) => (
                <div
                  key={item.name}
                  className="flex items-baseline justify-between gap-6 py-4 border-b border-white/10 last:border-b-0"
                >
                  <div className="flex-1">
                    <p className="font-bold text-white text-sm sm:text-base uppercase tracking-wide">
                      {item.name}
                    </p>
                    {item.description && (
                      <p className="text-xs sm:text-sm text-white/75 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                    {item.modifiers && (
                      <p className="text-xs text-bron-yellow italic mt-1.5">
                        {item.modifiers}
                      </p>
                    )}
                  </div>
                  <p className="font-display text-xl sm:text-2xl font-bold text-bron-pink whitespace-nowrap">
                    {item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Kids Menu */}
        <section className="bg-bron-cream py-14 sm:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-bron-coral font-bold mb-2">
                For the little ones
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-bron-deep-blue">
                Kids Menu
              </h2>
            </div>
            <div className="bg-bron-pink text-white rounded-2xl shadow-md p-6 sm:p-8">
              {KIDS.map((item) => (
                <div
                  key={item.name}
                  className="flex items-baseline justify-between gap-6 py-4 border-b border-white/15 last:border-b-0"
                >
                  <div className="flex-1">
                    <p className="font-bold text-sm sm:text-base uppercase tracking-wide">
                      {item.name}
                    </p>
                    {item.description && (
                      <p className="text-xs sm:text-sm text-white/85 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <p className="font-display text-xl sm:text-2xl font-bold text-bron-yellow whitespace-nowrap">
                    {item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Back to home */}
        <section className="bg-bron-deep-blue text-white py-14 text-center">
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-sm text-white/85 mb-6">
              Kitchen runs the same hours as the bar · Wed–Sun · 5pm onward
              · 314 E Avenue G, Port Aransas
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-full bg-bron-coral text-white font-bold text-sm uppercase tracking-widest hover:bg-bron-coral-dark transition shadow-md"
            >
              ← Back to Bron&apos;s
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
