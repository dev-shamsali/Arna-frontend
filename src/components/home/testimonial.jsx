// components/Testimonials.jsx
'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import * as THREE from 'three'

const testimonials = [
    {
        name: 'Aisha Khan',
        role: 'Regular Customer',
        text: 'Arna Skin Care has completely transformed my skin. The herbal face range feels so gentle yet effective, and my glow has never been this natural.',
        highlight: 'Glowing skin, zero irritation.'
    },
    {
        name: 'Rahul Mehta',
        role: 'Salon Owner',
        text: 'We switched to ARNA herbal products in our salon and clients instantly noticed the difference. The d-tan and body care range are now our best sellers.',
        highlight: 'Clients keep asking for ARNA.'
    },
    {
        name: 'Sara Ali',
        role: 'Working Professional',
        text: 'With my busy schedule, I needed simple but powerful skincare. ARNA’s customized routine based on my skin type has made self-care easy.',
        highlight: 'Customised care that actually works.'
    },
    {
        name: 'Vikram Singh',
        role: 'First-time User',
        text: 'I was always scared of harsh chemicals. ARNA’s herbal hair and face products felt safe from day one and the results are visible within weeks.',
        highlight: 'Safe, herbal and trustworthy.'
    },
    {
        name: 'Neha Sharma',
        role: 'Makeup Artist',
        text: 'Using ARNA as a base before makeup gives my clients a smooth, hydrated canvas without any greasiness. Love that it’s herbal and lightweight.',
        highlight: 'Perfect base before makeup.'
    }
]

const Testimonials = () => {
    const canvasRef = useRef(null)
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    // Three.js subtle 3D background (white theme)
    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })

        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        camera.position.z = 6

        // Soft floating spheres
        const spheres = []
        const sphereGeometry = new THREE.IcosahedronGeometry(0.5, 1)
        const sphereColors = [0x22c55e, 0x16a34a, 0x4ade80]

        for (let i = 0; i < 6; i++) {
            const material = new THREE.MeshPhongMaterial({
                color: sphereColors[i % sphereColors.length],
                transparent: true,
                opacity: 0.25,
                shininess: 60
            })
            const mesh = new THREE.Mesh(sphereGeometry, material)
            mesh.position.set(
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4
            )
            spheres.push(mesh)
            scene.add(mesh)
        }

        // Light particles
        const particlesGeometry = new THREE.BufferGeometry()
        const particlesCount = 120
        const posArray = new Float32Array(particlesCount * 3)

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.03,
            color: 0x16a34a,
            transparent: true,
            opacity: 0.4
        })

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
        scene.add(particlesMesh)

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
        scene.add(ambientLight)

        const pointLight = new THREE.PointLight(0x22c55e, 1)
        pointLight.position.set(4, 6, 4)
        scene.add(pointLight)

        const clock = new THREE.Clock()

        const animate = () => {
            const elapsedTime = clock.getElapsedTime()

            spheres.forEach((sphere, index) => {
                sphere.rotation.x += 0.005 + index * 0.0005
                sphere.rotation.y += 0.006 + index * 0.0004
                sphere.position.y = Math.sin(elapsedTime * 0.5 + index) * 0.6
            })

            particlesMesh.rotation.y = elapsedTime * 0.03

            camera.position.x = Math.sin(elapsedTime * 0.1) * 0.4
            camera.position.y = Math.cos(elapsedTime * 0.1) * 0.3

            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }

        animate()

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            renderer.dispose()
        }
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden py-16 md:py-24 bg-white"
        >
            {/* 3D background canvas */}
            <canvas
                ref={canvasRef}
                className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
                aria-hidden="true"
            />

            {/* Soft radial background accents */}
            <div
                className="absolute inset-0 -z-20 opacity-40"
                style={{
                    background: `
            radial-gradient(circle at 10% 20%, rgba(34, 197, 94, 0.10) 0%, transparent 55%),
            radial-gradient(circle at 90% 80%, rgba(16, 185, 129, 0.12) 0%, transparent 55%),
            radial-gradient(circle at 50% 10%, rgba(22, 163, 74, 0.08) 0%, transparent 60%)
          `
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-10 md:mb-14"
                >
                    <p className="text-xs md:text-sm font-medium tracking-[0.25em] text-emerald-500 uppercase mb-3">
                        Reviews
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                        What Our Customers Say
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
                        Real stories from people who trusted{' '}
                        <span className="font-semibold text-emerald-600">ARNA Skin Care</span> for herbal, safe and
                        effective beauty care.
                    </p>
                </motion.div>

                {/* Scrollable testimonials row */}
                <div className="relative">
                    {/* gradient masks left/right */}
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-10 md:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-20" />
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-10 md:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-20" />

                    <div
                        className="
              flex gap-6 md:gap-8 
              overflow-x-auto 
              snap-x snap-mandatory 
              pb-4
              scrollbar-thin scrollbar-thumb-emerald-300/70 scrollbar-track-transparent
            "
                    >
                        {testimonials.map((t, index) => (
                            <motion.article
                                key={index}
                                className="
                  relative 
                  w-[260px] sm:w-[280px] md:w-[320px] 
                  shrink-0 
                  snap-center
                "
                                whileHover={{
                                    y: -8,
                                    rotateX: 2,
                                    rotateY: -2,
                                    boxShadow: '0 24px 60px rgba(15, 23, 42, 0.18)'
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            >
                                <div className="relative h-full rounded-2xl border border-emerald-50 bg-white/90 backdrop-blur-sm p-5 md:p-6 shadow-[0_18px_45px_rgba(15,23,42,0.07)] flex flex-col">
                                    {/* quote icon */}
                                    <div className="mb-3 flex items-center gap-2 text-emerald-500 text-sm">
                                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-lg">
                                            “
                                        </span>
                                        <span className="text-[11px] uppercase tracking-[0.2em] text-emerald-500">
                                            Verified Review
                                        </span>
                                    </div>

                                    <p className="text-gray-700 text-sm md:text-[15px] leading-relaxed mb-3 line-clamp-5">
                                        {t.text}
                                    </p>

                                    <p className="text-xs font-medium text-emerald-600 mb-4">
                                        {t.highlight}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between pt-3 border-t border-emerald-50">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                                            <p className="text-[11px] text-gray-500">{t.role}</p>
                                        </div>

                                        {/* 3D pill badge */}
                                        <div className="relative">
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-200 to-emerald-100 blur-[6px] opacity-70" />
                                            <div className="relative rounded-full bg-gradient-to-br from-white to-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700 shadow-sm">
                                                ★ 4.9 / 5
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>

                {/* Bottom subtle 3D text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-10 md:mt-12 text-center"
                >
                    <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400 mb-1">
                        Trusted By
                    </p>
                    <p
                        className="text-lg md:text-xl font-semibold text-emerald-800 md:text-emerald-900"
                        style={{
                            textShadow:
                                '0 1px 0 rgba(255,255,255,0.6), 0 6px 16px rgba(15,23,42,0.15)'
                        }}
                    >
                        Thousands of Happy ARNA Customers
                    </p>
                </motion.div>
            </div>
        </section>
    )
}

export default Testimonials
