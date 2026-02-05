// components/About.jsx
'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import * as THREE from 'three'

export default function About() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-120px' })

  /* ---------------- THREE.JS (SUBTLE, STABLE, SAFE) ---------------- */
  useEffect(() => {
    if (!canvasRef.current || !sectionRef.current) return

    const canvas = canvasRef.current
    const parent = sectionRef.current

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 50)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    })

    const resize = () => {
      const w = parent.offsetWidth
      const h = parent.offsetHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }

    resize()
    window.addEventListener('resize', resize)

    /* Floating particles */
    const particleCount = 120
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.5) * 10
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xb77f6b,
      transparent: true,
      opacity: 0.45
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    scene.add(new THREE.AmbientLight(0xffffff, 0.7))
    const light = new THREE.PointLight(0xb77f6b, 1)
    light.position.set(5, 5, 5)
    scene.add(light)

    const clock = new THREE.Clock()
    let rafId

    const animate = () => {
      const t = clock.getElapsedTime()
      particles.rotation.y = t * 0.025
      particles.rotation.x = Math.sin(t * 0.15) * 0.08
      renderer.render(scene, camera)
      rafId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  /* ---------------- FRAMER MOTION VARIANTS ---------------- */
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="
        relative w-full overflow-hidden
        py-24 md:py-32
        bg-gradient-to-br
        from-[#0a2e1a] via-[#14532d] to-[#0a2e1a]
        text-white
      "
    >
      {/* THREE BACKGROUND */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* SOFT RADIAL DEPTH */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(183,127,107,0.15), transparent 55%),
            radial-gradient(circle at 80% 70%, rgba(197,160,89,0.1), transparent 55%)
          `
        }}
      />

      {/* CONTENT */}
      <div className="relative z-20 max-w-3xl mx-auto px-6 text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-sm tracking-[0.3em] text-[#b77f6b] uppercase mb-4"
        >
          About Us
        </motion.p>

        <motion.h1
          id="about-heading"
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.1 }}
          className="
            font-serif font-bold
            text-4xl md:text-5xl lg:text-6xl
            bg-gradient-to-r from-white via-[#d1a394] to-[#b77f6b]
            bg-clip-text text-transparent
            leading-tight
          "
        >
          ARNA Skin Care
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.25 }}
          className="
    mt-8 text-sm sm:text-base md:text-lg
    text-white/90
    leading-relaxed
    bg-white/5 backdrop-blur-md
    p-6 rounded-2xl
    border border-white/10
  "
        >
          At ARNA Skin Care, we believe real beauty starts with nature. Our mission
          is simple — to bring you pure, herbal, and chemical-free skincare that
          actually works. From glow-boosting fairness creams to complete face and
          body care, every product is crafted with natural ingredients, gentle
          formulations, and zero side-effects.
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.4 }}
          className="mt-5 text-white/80 text-sm sm:text-base md:text-lg"
        >
          We're committed to giving your skin the love it deserves while keeping
          everything 100% herbal, safe, and effective — all at prices that won't
          hurt your pocket. Choose ARNA. <span className="font-semibold text-[#b77f6b]">
            Created by Nature.
          </span>
        </motion.p>


        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            href="/products"
            className="
              px-6 py-3 rounded-lg
              bg-gradient-to-r from-[#b77f6b] to-[#8e5d4d]
              shadow-lg shadow-[#b77f6b]/30
              hover:shadow-[#b77f6b]/50
              transition-all
              font-medium
            "
          >
            View Products
          </Link>

          <Link
            href="/#contact"
            className="
              px-6 py-3 rounded-lg
              border border-[#b77f6b]/40
              bg-white/5 backdrop-blur
              hover:bg-[#b77f6b]/10
              transition-all
              font-medium
            "
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
