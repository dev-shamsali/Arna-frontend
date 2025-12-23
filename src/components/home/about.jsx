// components/About.jsx
'use client'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import * as THREE from 'three'

export default function About() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Three.js 3D Background Effect
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    camera.position.z = 5

    // Create floating particles (herbal theme)
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 150
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x4ade80, // Green-400
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Create 3D geometric shapes (leaves/nature inspired)
    const shapes = []
    for (let i = 0; i < 8; i++) {
      const geometry = new THREE.TetrahedronGeometry(0.3, 0)
      const material = new THREE.MeshPhongMaterial({
        color: i % 2 === 0 ? 0x065f46 : 0x047857, // Dark green variants
        transparent: true,
        opacity: 0.3,
        wireframe: true
      })
      const mesh = new THREE.Mesh(geometry, material)

      mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5
      )

      shapes.push(mesh)
      scene.add(mesh)
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x4ade80, 1)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    // Mouse movement effect
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // Rotate particles
      particlesMesh.rotation.y = elapsedTime * 0.05
      particlesMesh.rotation.x = elapsedTime * 0.03

      // Animate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x = elapsedTime * 0.2 + index * 0.1
        shape.rotation.y = elapsedTime * 0.15 + index * 0.1
        shape.position.y = Math.sin(elapsedTime + index) * 0.5
      })

      // Camera movement based on mouse
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
  }, [])

  return (
    <section
      ref={containerRef}
      aria-labelledby="about-heading"
      className="relative w-full overflow-hidden py-20"
    >
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-30 h-full w-full"
        aria-hidden="true"
      />

      {/* Background image */}
      <div className="absolute inset-0 -z-20 h-full w-full">
        <Image
          src="/home/about-bg.jpg"
          alt="Botanical background for ARNA"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          quality={85}
        />
      </div>

      {/* Enhanced Dark Green Gradient Overlay */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-950/90 via-green-900/85 to-teal-950/90"
        aria-hidden="true"
      />

      {/* Additional gradient layer for depth */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-emerald-950/70 via-transparent to-green-950/70"
        aria-hidden="true"
      />

      {/* Animated mesh gradient overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(5, 150, 105, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(6, 95, 70, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)
          `
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full px-6"
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Small label with animation */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl tracking-wider text-emerald-300 uppercase mb-3 font-light"
          >
            About Us
          </motion.p>

          {/* Big brand title with 3D text effect */}
          <motion.h1
            id="about-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="font-serif text-white font-bold relative"
            style={{
              fontSize: 'clamp(2rem, 5.5vw, 3.25rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              textShadow: `
                2px 2px 4px rgba(0, 0, 0, 0.5),
                4px 4px 8px rgba(5, 150, 105, 0.3),
                -1px -1px 2px rgba(16, 185, 129, 0.2)
              `
            }}
          >
            <span className="bg-gradient-to-r from-white via-emerald-50 to-green-100 bg-clip-text text-transparent">
              ARNA Skin Care
            </span>
          </motion.h1>

          {/* Body text with staggered animation */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-6 text-white/95 text-sm sm:text-base md:text-lg leading-relaxed backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10"
          >
            At ARNA Skin Care, we believe real beauty starts with nature. Our mission is simple — to
            bring you pure, herbal, and chemical-free skincare that actually works. From glow-boosting
            fairness creams to complete face and body care, every product is crafted with natural
            ingredients, gentle formulations, and zero side-effects.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="mt-4 text-emerald-100/90 text-sm sm:text-base md:text-lg leading-relaxed"
          >
            We're committed to giving your skin the love it deserves while keeping everything 100% herbal,
            safe, and effective — all at prices that won't hurt your pocket. Choose ARNA. Created by Nature. 🌿✨
          </motion.p>

          {/* Buttons with hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Link
                href="/products"
                aria-label="View ARNA products"
                className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg shadow-lg hover:shadow-emerald-500/50 transition-shadow duration-300 font-medium"
              >
                View Products
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Link
                href="/#contact"
                aria-label="Contact ARNA Skin Care"
                className="inline-block px-6 py-3 border-2 border-emerald-400/60 text-white rounded-lg bg-white/5 hover:bg-emerald-500/20 backdrop-blur-sm transition-all duration-300 font-medium"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating decorative elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"
            aria-hidden="true"
          />

          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-600/10 rounded-full blur-3xl"
            aria-hidden="true"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}