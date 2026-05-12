import Link from "next/link";
import type { Metadata } from "next";
import SiteNav from "../SiteNav";

export const metadata: Metadata = {
  title: "Shaved Ice & To-Go Bar",
  description:
    "Bron's Shaved Ice & To-Go Bar menu — frozen margaritas, hard lemonade, daiquiris, beer, wine, party packs, and shaved ice in 31 flavors. Walk-up window in Port Aransas.",
};

const SHAVED_ICE_FLAVORS = [
  "Bahama Mama",
  "Banana",
  "Blue Raspberry",
  "Bubble Gum",
  "Caramel",
  "Cheesecake",
  "Cherry",
  "Coconut",
  "Coffee",
  "Cotton Candy",
  "Dill Pickle",
  "Dreamsicle",
  "Dulce de Leche",
  "Green Apple",
  "Grape",
  "Horchata",
  "Key Lime Pie",
  "Lemon",
  "Lime",
  "Mango",
  "Orange",
  "Georgia Peach",
  "Pina Colada",
  "Pineapple",
  "Root Beer",
  "Spearmint",
  "Strawberry",
  "Tiger's Blood",
  "Vanilla",
  "Watermelon",
  "Wedding Cake",
];

const SUGAR_FREE = ["Cherry", "Grape", "Lime"];

const LEMONADE_SLUSHIES = [
  "Original",
  "Cherry",
  "Mango",
  "Peach",
  "Strawberry",
  "Watermelon",
];

const KIDS_FAVORITES = [
  { name: "Frog in a Blender", recipe: "Watermelon + Lime" },
  { name: "Monster Mash", recipe: "Green Apple + Grape" },
  { name: "Ninja Turtle", recipe: "Banana + Lime" },
  { name: "Pretty Princess", recipe: "Bubble Gum + Sprinkles" },
  { name: "Pucker Power", recipe: "Green Apple + Sour Spray" },
  { name: "Rainbow", recipe: "Blue Raspberry + Banana + Cherry" },
];

const TOPPINGS = ["Cream", "Picadilly", "Rainbow Sprinkles", "Sour Spray", "Chamoy"];

const FROZEN_DRINKS = [
  "Margarita",
  "Strawberry Daquiri",
  "Pina Colada",
  "Sangria Margarita",
  "Strawberry Margarita",
  "Strawberry Pina Colada",
  "Blue Raspberry Margarita",
  "Mango Margarita",
];

const ON_THE_ROCKS = [
  "Margarita",
  "Homemade Sangria",
  "Sangria Margarita",
  "Bloody Mary",
];

export default function ShavedIceMenuPage() {
  return (
    <>
      <SiteNav />
      <main className="bg-bron-sand min-h-screen">
        {/* Hero */}
        <section className="bg-bron-deep-blue text-white pt-24 sm:pt-32 pb-14 sm:pb-20 text-center">
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-bron-pink font-bold mb-3">
              Walk-up window · Same hours as the bar
            </p>
            <h1 className="font-display text-4xl sm:text-6xl font-bold mb-4 leading-tight">
              Shaved Ice &amp; To-Go Bar
            </h1>
            <p className="font-display italic text-xl sm:text-2xl text-bron-light-blue">
              Best in Port Aransas. We use real sugar.
            </p>
          </div>
        </section>

        {/* Shaved Ice — sizes hero card */}
        <section className="bg-bron-sand py-14 sm:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.3em] text-bron-coral font-bold mb-2">
                Shaved Ice
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-bron-deep-blue">
                Made fresh, every cup.
              </h2>
            </div>

            {/* Sizes */}
            <div className="grid grid-cols-3 gap-3 sm:gap-5 max-w-2xl mx-auto mb-12">
              {[
                { size: "Small", price: "$2.75" },
                { size: "Medium", price: "$3.75" },
                { size: "Large", price: "$4.75" },
              ].map((s) => (
                <div
                  key={s.size}
                  className="bg-bron-coral text-white rounded-2xl p-4 sm:p-6 text-center shadow-md"
                >
                  <p className="text-xs uppercase tracking-widest font-bold mb-1 text-white/85">
                    {s.size}
                  </p>
                  <p className="font-display text-2xl sm:text-3xl font-bold">
                    {s.price}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-bron-deep-blue/65 italic mb-12">
              Plus tax
            </p>

            {/* Flavors grid */}
            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
              <h3 className="font-display text-2xl font-bold text-bron-deep-blue text-center mb-6">
                31 Flavors
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-2 text-sm text-bron-deep-blue">
                {SHAVED_ICE_FLAVORS.map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <span className="text-bron-pink">●</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {/* Sugar Free */}
              <div className="mt-8 pt-6 border-t border-bron-deep-blue/10">
                <p className="text-xs uppercase tracking-[0.2em] text-bron-coral font-bold mb-3 text-center">
                  Sugar Free
                </p>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-bron-deep-blue">
                  {SUGAR_FREE.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </div>
              </div>

              {/* Toppings */}
              <div className="mt-8 pt-6 border-t border-bron-deep-blue/10">
                <p className="text-xs uppercase tracking-[0.2em] text-bron-coral font-bold mb-3 text-center">
                  Toppings · 50¢ each
                </p>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-bron-deep-blue">
                  {TOPPINGS.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lemonade Slushies + Kids Favorites */}
        <section className="bg-bron-cream py-14 sm:py-20">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Lemonade Slushies */}
            <div className="bg-bron-yellow rounded-2xl p-6 sm:p-8 shadow-md">
              <p className="text-xs uppercase tracking-[0.3em] text-bron-coral font-bold mb-2">
                Made fresh · $4.25
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-bron-deep-blue mb-5">
                Lemonade Slushies
              </h3>
              <ul className="space-y-1.5 text-sm text-bron-deep-blue">
                {LEMONADE_SLUSHIES.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-bron-coral">●</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kids Favorites */}
            <div className="bg-bron-pink text-white rounded-2xl p-6 sm:p-8 shadow-md">
              <p className="text-xs uppercase tracking-[0.3em] text-white/85 font-bold mb-2">
                For the little ones
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold mb-5">
                Kids Favorites
              </h3>
              <ul className="space-y-2.5 text-sm">
                {KIDS_FAVORITES.map((k) => (
                  <li key={k.name}>
                    <p className="font-bold">{k.name}</p>
                    <p className="text-white/85 text-xs">{k.recipe}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* To-Go Bar — divider section */}
        <section className="bg-bron-blue text-white pt-14 sm:pt-20 pb-10 text-center">
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-xs uppercase tracking-[0.3em] text-bron-yellow font-bold mb-3">
              Age 21 + · Plus tax · ID required
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold mb-3">
              Bron&apos;s To-Go Bar
            </h2>
            <p className="font-display italic text-lg sm:text-xl text-white/85">
              House specialty since 2014.
            </p>
          </div>
        </section>

        {/* Frozen Drinks + On the Rocks */}
        <section className="bg-bron-blue text-white pb-14 sm:pb-20">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Frozen */}
            <div className="bg-bron-deep-blue rounded-2xl p-6 sm:p-8 shadow-md">
              <p className="text-xs uppercase tracking-[0.3em] text-bron-light-blue font-bold mb-2">
                Frozen Drinks
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold mb-5">
                Frozen
              </h3>
              <ul className="space-y-1.5 text-sm">
                {FROZEN_DRINKS.map((d) => (
                  <li key={d} className="flex items-center gap-2">
                    <span className="text-bron-pink">●</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-white/65 italic mt-4">
                Gallon: 8–10 servings
              </p>
            </div>

            {/* On the Rocks */}
            <div className="bg-bron-deep-blue rounded-2xl p-6 sm:p-8 shadow-md">
              <p className="text-xs uppercase tracking-[0.3em] text-bron-light-blue font-bold mb-2">
                On the Rocks
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold mb-5">
                Hard Lemonade &amp; Cocktails
              </h3>
              <ul className="space-y-1.5 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-bron-pink">●</span>
                  <span>Bron&apos;s Fresh Hard Lemonade</span>
                </li>
                {ON_THE_ROCKS.map((d) => (
                  <li key={d} className="flex items-center gap-2">
                    <span className="text-bron-pink">●</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-white/65 italic mt-4">
                Gallon: 12–14 servings
              </p>
            </div>
          </div>

          {/* Drink prices */}
          <div className="max-w-5xl mx-auto px-6 mt-8">
            <div className="bg-bron-deep-blue rounded-2xl p-6 sm:p-8 shadow-md">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-bron-yellow text-center mb-5">
                Drink Prices
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {[
                  { label: "Large", price: "$6.75" },
                  { label: "Gallon", price: "$35" },
                  { label: "Top Shelf · Large", price: "$8.25" },
                  { label: "Top Shelf · Gallon", price: "$40" },
                ].map((p) => (
                  <div key={p.label}>
                    <p className="text-[10px] uppercase tracking-widest text-white/65 font-bold mb-1">
                      {p.label}
                    </p>
                    <p className="font-display text-2xl font-bold text-bron-pink">
                      {p.price}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-white/75 italic mt-5">
                Add extra shots: Large $1.50 each (limit 2) · Gallon 5 for $5
                (limit 15)
              </p>
            </div>
          </div>
        </section>

        {/* Wine + Beer + Shooters row */}
        <section className="bg-bron-sand py-14 sm:py-20">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Wine */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-md">
              <p className="text-xs uppercase tracking-[0.3em] text-bron-coral font-bold mb-2">
                Glass · $6.00
              </p>
              <h3 className="font-display text-xl font-bold text-bron-deep-blue mb-4">
                Wine
              </h3>
              <ul className="space-y-1.5 text-sm text-bron-deep-blue/85">
                <li>Chardonnay</li>
                <li>Cabernet Sauvignon</li>
              </ul>
            </div>

            {/* Beer */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-md">
              <p className="text-xs uppercase tracking-[0.3em] text-bron-coral font-bold mb-2">
                Beer
              </p>
              <h3 className="font-display text-xl font-bold text-bron-deep-blue mb-4">
                Cold Bottles
              </h3>
              <ul className="space-y-3 text-sm text-bron-deep-blue/85">
                <li>
                  <p className="font-bold">Coors Light · Miller Light</p>
                  <p className="text-xs text-bron-deep-blue/65">
                    Single $2.75 · Bucket of 5 $12.75
                  </p>
                </li>
                <li>
                  <p className="font-bold">Blue Moon · Dos Equis</p>
                  <p className="text-xs text-bron-deep-blue/65">
                    Single $3.50 · Bucket of 5 $15
                  </p>
                </li>
                <li className="pt-2 border-t border-bron-deep-blue/10">
                  <p className="font-bold">Make it a Michelada</p>
                  <p className="text-xs text-bron-deep-blue/65">
                    Add $2.50 to any beer
                  </p>
                </li>
              </ul>
            </div>

            {/* Shooters */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-md">
              <p className="text-xs uppercase tracking-[0.3em] text-bron-coral font-bold mb-2">
                Test tube shot · $2.00 · 4 for $6.00
              </p>
              <h3 className="font-display text-xl font-bold text-bron-deep-blue mb-4">
                Infusion Specialty Shooters
              </h3>
              <ul className="space-y-1.5 text-sm text-bron-deep-blue/85">
                <li>Raspberry</li>
                <li>Watermelon</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Party Packs */}
        <section className="bg-bron-cream py-14 sm:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.3em] text-bron-coral font-bold mb-2">
                Bring it back to the rental
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-bron-deep-blue">
                Party Packs
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  title: "Party Pack",
                  price: "$45",
                  contents:
                    "Choice of 1 gallon · 4 shooters · cooler bag · ice · cups · lids · straws",
                },
                {
                  title: "Super Party Pack",
                  price: "$80",
                  contents:
                    "Choice of 2 gallons · 8 shooters · cooler bag · ice · cups · lids · straws",
                },
                {
                  title: "Beer Party Pack",
                  price: "$25 / $30",
                  contents:
                    "4 shooters & 10 beers iced down in a cooler bag. Domestic $25 · Premium $30",
                },
              ].map((p) => (
                <div
                  key={p.title}
                  className="bg-bron-orange text-white rounded-2xl p-6 sm:p-7 shadow-md"
                >
                  <h3 className="font-display text-2xl font-bold mb-2">
                    {p.title}
                  </h3>
                  <p className="font-display text-3xl font-bold text-bron-yellow mb-4">
                    {p.price}
                  </p>
                  <p className="text-sm text-white/95 leading-relaxed">
                    {p.contents}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Soft drinks + misc */}
        <section className="bg-bron-sand py-14 sm:py-20">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-md">
              <h3 className="font-display text-xl font-bold text-bron-deep-blue mb-4">
                Soft Drinks
              </h3>
              <ul className="space-y-2 text-sm text-bron-deep-blue/85">
                <li className="flex justify-between">
                  <span>Fresh Lemonade</span>
                  <span className="font-bold text-bron-coral">$3.50</span>
                </li>
                <li className="flex justify-between">
                  <span>Bottled Water</span>
                  <span className="font-bold text-bron-coral">$1.25</span>
                </li>
                <li className="flex justify-between">
                  <span>Iced Tea · Coke · Diet Coke · Dr Pepper</span>
                  <span className="font-bold text-bron-coral">$1.75</span>
                </li>
              </ul>
              <p className="text-xs text-bron-deep-blue/65 italic mt-5 pt-4 border-t border-bron-deep-blue/10">
                Free soft drink for the designated driver.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-md">
              <h3 className="font-display text-xl font-bold text-bron-deep-blue mb-4">
                Misc.
              </h3>
              <ul className="space-y-2 text-sm text-bron-deep-blue/85">
                <li className="flex justify-between">
                  <span>Bag of Ice</span>
                  <span className="font-bold text-bron-coral">$2</span>
                </li>
                <li className="flex justify-between">
                  <span>Cooler Bag</span>
                  <span className="font-bold text-bron-coral">$5</span>
                </li>
                <li className="flex justify-between">
                  <span>Koozie</span>
                  <span className="font-bold text-bron-coral">$3</span>
                </li>
              </ul>
              <p className="text-xs text-bron-deep-blue/65 italic mt-5 pt-4 border-t border-bron-deep-blue/10">
                It is illegal to have an open container in a vehicle.
              </p>
            </div>
          </div>
        </section>

        {/* Back to home */}
        <section className="bg-bron-deep-blue text-white py-14 text-center">
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-sm text-white/85 mb-6">
              Walk-up window · same hours as the bar · 314 E Avenue G, Port
              Aransas
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
