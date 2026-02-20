// components/OurStory.jsx
'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import * as THREE from 'three'
import { useGetOurStoryQuery } from '@/redux/slices/cmsSlice'
const OurStory = () => {
    const canvasRef = useRef(null)
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
    const { data } = useGetOurStoryQuery();
    const imageUrl = data?.image
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${data.image}`
        : "/home/founder.png";
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
            color: 0xb77f6b,
            transparent: true,
            opacity: 0.45
        })

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
        scene.add(particlesMesh)

        scene.add(new THREE.AmbientLight(0xffffff, 0.6))
        const light = new THREE.PointLight(0xb77f6b, 1)
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
            <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#14422c] via-[#1e5e3f] to-[#14422c]" />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            <div
                className="absolute inset-0 z-10 opacity-30"
                style={{
                    background: `
            radial-gradient(circle at 20% 30%, rgba(183,127,107,0.15), transparent 55%),
            radial-gradient(circle at 80% 70%, rgba(197,160,89,0.1), transparent 55%)
          `
                }}
            />

            {/* CONTENT */}
            <div className="relative z-30 max-w-7xl mx-auto px-6 lg:px-12">
                {/* HEADER SECTION - Enhanced with Decorative Element */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="relative text-center mb-16 md:mb-24"
                >
                    <span className="absolute -top-10 md:-top-12 left-1/2 -translate-x-1/2 text-6xl md:text-9xl font-serif text-white/[0.03] pointer-events-none select-none uppercase tracking-[0.2em] whitespace-nowrap">
                        Heritage
                    </span>
                    <h2
                        id="our-story-heading"
                        className="relative text-4xl md:text-7xl font-serif font-bold text-transparent bg-gradient-to-r from-[#d1a394] via-white to-[#b77f6b] bg-clip-text pb-4 leading-tight mb-2"
                    >
                        Our Story
                    </h2>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-[#b77f6b]" />
                        <span className="text-[#c5a059] text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-medium">Est. 2014</span>
                        <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-[#b77f6b]" />
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
                    {/* LEFT SIDE: IMAGE WITH FLOATING FRAME */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1.2, delay: 0.2 }}
                        className="lg:col-span-5 relative"
                    >
                        {/* Decorative Frames */}
                        <div className="absolute -inset-2 md:-inset-4 border border-[#b77f6b]/20 rounded-2xl transform -rotate-3 pointer-events-none" />
                        <div className="absolute -inset-2 md:-inset-4 border border-[#c5a059]/10 rounded-2xl transform rotate-2 pointer-events-none" />

                        <div className="relative h-[350px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl group">
                            <img
                                src={imageUrl}
                                alt="Founders of ARNA"
                                loading='lazy'
                                className="object-cover object-center transition-transform duration-1000 group-hover:scale-110"
                            />

                        </div>
                    </motion.div>

                    {/* RIGHT SIDE: RICH TEXT CONTENT */}
                    <div className="lg:col-span-7 space-y-10 lg:space-y-12">
                        {/* Narrative */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="relative text-center lg:text-left"
                        >
                            <span className="hidden lg:block text-6xl absolute -top-8 -left-6 text-[#b77f6b]/20 font-serif">“</span>
                            <h3 className="text-xl md:text-3xl font-serif text-white mb-6 leading-tight">
                                A blend of <span className="font-accent italic text-[#b77f6b]">AR</span><span className="font-accent italic">MAN</span> and <span className="font-accent italic text-[#b77f6b]">NA</span><span className="font-accent italic">AZ</span>,
                                <br />representing a shared vision for beauty.
                            </h3>
                            <p className="text-white/70 leading-relaxed text-sm md:text-lg font-light max-w-2xl mx-auto lg:mx-0">
                                A decade ago, we embarked on a journey to redefine skincare in India. What began as a personal quest for pure, herbal results evolved into <span className="text-[#b77f6b] font-medium">ARNA</span>. We didn't just want to sell products; we wanted to bottle the harmony of ancient botanical wisdom and modern precision.
                            </p>
                        </motion.div>

                        {/* Principles Display: From list to interactive cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { title: 'Quality', desc: '100% Sourced Actives', icon: '✦' },
                                { title: 'Tailored', desc: 'Personalized Solutions', icon: '❂' },
                                { title: 'Value', desc: 'Luxury within Reach', icon: '✧' }
                            ].map((pillar, idx) => (
                                <motion.div
                                    key={pillar.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.6 + (idx * 0.15) }}
                                    className="p-4 md:p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors group cursor-default text-center lg:text-left"
                                >
                                    <span className="text-[#c5a059] text-xl mb-2 md:mb-3 block group-hover:scale-125 transition-transform">{pillar.icon}</span>
                                    <h4 className="text-white font-semibold text-xs md:text-sm uppercase tracking-widest mb-1">{pillar.title}</h4>
                                    <p className="text-white/50 text-[10px] md:text-[11px] leading-tight">{pillar.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Sign-off & Solutions */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 1, delay: 1 }}
                            className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-center lg:justify-between gap-6 md:gap-8"
                        >
                            <div className="text-center lg:text-left">
                                <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] mb-4">Core Expertise</h4>
                                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                                    {['Botanical Glow', 'Healthy Roots', 'Pure Rituals'].map(tag => (
                                        <span key={tag} className="px-3 py-1.5 rounded-full bg-[#b77f6b]/20 border border-[#b77f6b]/30 text-[#d1a394] text-[9px] md:text-[10px] uppercase tracking-widest font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>


                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurStory
