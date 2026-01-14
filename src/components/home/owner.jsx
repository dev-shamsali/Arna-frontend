// components/OurStory.jsx
'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import * as THREE from 'three'

const OurStory = () => {
    const canvasRef = useRef(null)
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    /* ---------------- MOTION VARIANTS (FIXED BUG) ---------------- */
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    }

    /* ---------------- THREE.JS BACKGROUND ---------------- */
    useEffect(() => {
        if (!canvasRef.current || !sectionRef.current) return

        const canvas = canvasRef.current
        const parent = sectionRef.current

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 50)
        camera.position.z = 5

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

        const particlesCount = 140
        const positions = new Float32Array(particlesCount * 3)
        for (let i = 0; i < positions.length; i++) {
            positions[i] = (Math.random() - 0.5) * 12
        }

        const particlesGeometry = new THREE.BufferGeometry()
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.035,
            color: 0x10b981,
            transparent: true,
            opacity: 0.45
        })

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
        scene.add(particlesMesh)

        scene.add(new THREE.AmbientLight(0xffffff, 0.6))
        const light = new THREE.PointLight(0x10b981, 1)
        light.position.set(5, 5, 5)
        scene.add(light)

        const clock = new THREE.Clock()
        let rafId

        const animate = () => {
            const t = clock.getElapsedTime()
            particlesMesh.rotation.y = t * 0.03
            particlesMesh.rotation.x = Math.sin(t * 0.02) * 0.08
            renderer.render(scene, camera)
            rafId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            cancelAnimationFrame(rafId)
            window.removeEventListener('resize', resize)
            particlesGeometry.dispose()
            particlesMaterial.dispose()
            renderer.dispose()
        }
    }, [])

    return (
        <section
            ref={sectionRef}
            aria-labelledby="our-story-heading"
            className="relative w-full overflow-hidden py-16 md:py-24 min-h-[700px]"
        >
            {/* CANVAS */}
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                className="absolute inset-0 z-0 pointer-events-none"
            />

            {/* BACKGROUND */}
            <div className="absolute inset-0 z-10 bg-gradient-to-br from-black via-emerald-950 to-black" />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-emerald-950/70" />
            <div
                className="absolute inset-0 z-10 opacity-30"
                style={{
                    background: `
            radial-gradient(circle at 20% 30%, rgba(16,185,129,0.18), transparent 55%),
            radial-gradient(circle at 80% 70%, rgba(5,150,105,0.22), transparent 55%)
          `
                }}
            />

            {/* CONTENT */}
            <div className="relative z-30 max-w-6xl mx-auto px-4">
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2
                        id="our-story-heading"
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-gradient-to-r from-emerald-200 via-green-100 to-emerald-300 bg-clip-text mb-4"
                    >
                        Our Story
                    </h2>
                    <div className="h-1 w-24 mx-auto bg-gradient-to-r from-emerald-500 to-green-400 rounded-full" />
                </motion.div>

                {/* GRID */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* IMAGE */}
                    <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/50">
                        <Image
                            src="/home/founder.png"
                            alt="Arman and Naaz - Founders of ARNA Skin Care"
                            fill
                            className="object-cover object-center md:object-[50%_25%]"
                            priority
                        />
                    </div>

                    {/* TEXT CONTENT */}
                    <div className="space-y-6">
                        {/* Birth */}
                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            className="bg-white/5 backdrop-blur-md p-6 rounded-xl border-l-4 border-emerald-500"
                        >
                            <h3 className="text-xl md:text-2xl font-bold text-emerald-100 mb-3">
                                The Birth of ARNA
                            </h3>
                            <p className="text-emerald-50/95 leading-relaxed text-sm md:text-base">
                                A decade ago, my wife <span className="font-semibold text-emerald-300">Naaz</span> and
                                I, <span className="font-semibold text-emerald-300">Arman</span>, embarked on a journey
                                together as partners. From our names emerged{' '}
                                <span className="font-bold text-emerald-200">ARNA</span> — a blend of <span className="font-semibold text-emerald-300">AR</span>man and <span className="font-semibold text-emerald-300">NA</span>az, symbolizing our united vision for natural beauty.
                            </p>
                        </motion.div>

                        {/* Philosophy */}
                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            className="space-y-3"
                        >
                            <h3 className="text-xl md:text-2xl font-bold text-emerald-100">
                                Our Philosophy
                            </h3>
                            <p className="text-emerald-50/90 text-sm md:text-base">
                                At ARNA Skin Care, we believe in the power of nature combined with
                                personalized care. Our commitment is built on three pillars:
                            </p>

                            <ul className="space-y-2 text-emerald-50/90 text-sm md:text-base">
                                <li><span className="text-emerald-300 font-semibold">Quality:</span> 100% herbal ingredients</li>
                                <li><span className="text-emerald-300 font-semibold">Customization:</span> Tailored skincare</li>
                                <li><span className="text-emerald-300 font-semibold">Value:</span> Premium care at fair prices</li>
                            </ul>
                        </motion.div>

                        {/* Products */}
                        <motion.div
                            variants={itemVariants}
                            initial="hidden"
                            animate={isInView ? 'visible' : 'hidden'}
                            className="bg-emerald-900/40 p-5 rounded-xl border border-emerald-500/20"
                        >
                            <h4 className="text-emerald-200 font-bold mb-3">Our Natural Solutions</h4>
                            <div className="flex flex-wrap gap-2">
                                {['Glowing Skin', 'Healthy Hair', 'D-Tan Body Care'].map(item => (
                                    <span
                                        key={item}
                                        className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full text-xs md:text-sm font-medium"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurStory
