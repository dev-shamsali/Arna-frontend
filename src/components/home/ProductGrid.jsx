'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

const products = [
  { id: 1, name: "Radiance Serum", img: "/images/p1.jpg", price: "₹2,499" },
  { id: 2, name: "Hydra Cream", img: "/images/p2.jpg", price: "₹1,799" },
  { id: 3, name: "Gentle Cleanse", img: "/images/p3.jpg", price: "₹999" },
]

export default function ProductGrid() {
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-serif mb-8">Bestsellers</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden bg-white shadow-sm"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={p.img}
                fill
                className="object-cover"
                alt={p.name}
              />
            </div>
            <div className="p-5">
              <h3 className="font-medium">{p.name}</h3>
              <p className="mt-2 text-gray-500">{p.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
