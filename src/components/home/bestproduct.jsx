'use client'
import Image from "next/image"
import { motion } from "framer-motion"

export default function BestProduct() {
  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE - TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-6 leading-snug">
            Arna’s Premium  
            <span className="text-green-700"> Pure Botanical Serum</span>
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Our best–selling botanical serum is crafted from 100% natural extracts  
            sourced directly from nature. It hydrates, nourishes, and restores your  
            skin’s natural glow — without chemicals or harsh preservatives.
          </p>

          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-700 text-xl">•</span>
              <p>Deep hydration & natural nourishment</p>
            </li>

            <li className="flex items-start gap-2">
              <span className="text-green-700 text-xl">•</span>
              <p>Made with pure, cold–pressed botanicals</p>
            </li>

            <li className="flex items-start gap-2">
              <span className="text-green-700 text-xl">•</span>
              <p>Suitable for all skin types</p>
            </li>

            <li className="flex items-start gap-2">
              <span className="text-green-700 text-xl">•</span>
              <p>Free from parabens, sulfates & artificial fragrance</p>
            </li>
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <button className="px-6 py-3 bg-green-700 text-white rounded-md shadow hover:bg-green-800 transition">
              View Product
            </button>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE - IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div className="w-full max-w-md">
            <Image
              src="/images/best-product.jpg"
              alt="Arna best product"
              width={600}
              height={600}
              className="rounded-xl shadow-lg object-cover"
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
