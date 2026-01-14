// components/Testimonials.jsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
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
        text: 'We switched to ARNA herbal products in our salon and clients instantly noticed the difference.',
        highlight: 'Clients keep asking for ARNA.'
    },
    {
        name: 'Sara Ali',
        role: 'Working Professional',
        text: 'With my busy schedule, I needed simple but powerful skincare.',
        highlight: 'Customised care that works.'
    },
    {
        name: 'Vikram Singh',
        role: 'First-time User',
        text: 'Safe herbal products with visible results within weeks.',
        highlight: 'Safe and trustworthy.'
    },
    {
        name: 'Neha Sharma',
        role: 'Makeup Artist',
        text: 'Using ARNA as a base before makeup gives a smooth hydrated canvas.',
        highlight: 'Perfect makeup base.'
    }
]

const loopItems = [...testimonials, ...testimonials]

export default function Testimonials() {
    const canvasRef = useRef(null)
    const [paused, setPaused] = useState(false)
    const reduceMotion = useReducedMotion()

    /* ---------- Three.js background (unchanged look, safer lifecycle) ---------- */
    useEffect(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100)
        camera.position.z = 6

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true
        })

        const resize = () => {
            const parent = canvas.parentElement
            renderer.setSize(parent.offsetWidth, parent.offsetHeight)
            camera.aspect = parent.offsetWidth / parent.offsetHeight
            camera.updateProjectionMatrix()
        }

        resize()
        window.addEventListener('resize', resize)

        const geometry = new THREE.IcosahedronGeometry(0.5, 1)
        const material = new THREE.MeshPhongMaterial({
            color: 0x22c55e,
            transparent: true,
            opacity: 0.25
        })

        const spheres = Array.from({ length: 6 }).map(() => {
            const mesh = new THREE.Mesh(geometry, material)
            mesh.position.set(
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 3
            )
            scene.add(mesh)
            return mesh
        })

        scene.add(new THREE.AmbientLight(0xffffff, 0.8))
        const light = new THREE.PointLight(0x22c55e, 1)
        light.position.set(4, 6, 4)
        scene.add(light)

        let raf
        const clock = new THREE.Clock()

        const animate = () => {
            const t = clock.getElapsedTime()
            spheres.forEach((s, i) => {
                s.rotation.x += 0.004
                s.rotation.y += 0.005
                s.position.y = Math.sin(t + i) * 0.6
            })
            renderer.render(scene, camera)
            raf = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('resize', resize)
            geometry.dispose()
            material.dispose()
            renderer.dispose()
        }
    }, [])

    return (
        <section className="relative overflow-hidden bg-white py-20">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 -z-10 pointer-events-none"
            />

            <div className="max-w-6xl mx-auto px-4">
                {/* Header unchanged */}
                <div className="text-center mb-14">
                    <p className="text-xs tracking-[0.25em] text-emerald-500 uppercase mb-2">
                        Reviews
                    </p>
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">
                        What Our Customers Say
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Real stories from people who trusted ARNA Skin Care.
                    </p>
                </div>

                {/* Marquee */}
                <div
                    className="relative overflow-hidden"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <div
                        className={`
                            flex gap-6 w-max
                            testimonial-marquee
                            ${paused ? 'pause' : ''}
                        `}
                        style={{
                            perspective: '1200px'
                        }}
                    >
                        {loopItems.map((t, i) => (
                            <motion.article
                                key={i}
                                whileHover={{
                                    z: 40,
                                    scale: 1.04,
                                    rotateX: -6,
                                    rotateY: 6,
                                    translateZ: 60,
                                    boxShadow:
                                        '0 30px 70px rgba(15,23,42,0.25)'
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 260,
                                    damping: 18
                                }}
                                className="
                                    relative
                                    w-[280px] md:w-[320px]
                                    shrink-0
                                    rounded-2xl
                                    border border-emerald-50
                                    bg-white/90
                                    backdrop-blur
                                    p-6
                                    shadow-[0_18px_45px_rgba(15,23,42,0.07)]
                                    transform-gpu
                                "
                            >
                                <div className="mb-3 flex items-center gap-2 text-emerald-500 text-sm">
                                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-lg">
                                        “
                                    </span>
                                    <span className="text-[11px] uppercase tracking-[0.2em]">
                                        Verified Review
                                    </span>
                                </div>

                                <p className="text-gray-700 text-sm leading-relaxed mb-3 line-clamp-5">
                                    {t.text}
                                </p>

                                <p className="text-xs font-medium text-emerald-600 mb-4">
                                    {t.highlight}
                                </p>

                                <div className="mt-auto flex items-center justify-between pt-3 border-t border-emerald-50">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {t.name}
                                        </p>
                                        <p className="text-[11px] text-gray-500">
                                            {t.role}
                                        </p>
                                    </div>
                                    <span className="text-xs font-semibold text-emerald-700">
                                        ★ 4.9 / 5
                                    </span>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
