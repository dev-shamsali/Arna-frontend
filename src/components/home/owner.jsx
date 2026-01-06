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

        // Create organic flowing particles
        const particlesGeometry = new THREE.BufferGeometry()
        const particlesCount = 200
        const posArray = new Float32Array(particlesCount * 3)

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 12
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.04,
            color: 0x10b981, // Emerald-500
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending
        })

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
        scene.add(particlesMesh)

        // Create 3D leaf-like shapes
        const leaves = []
        for (let i = 0; i < 12; i++) {
            const geometry = new THREE.OctahedronGeometry(0.25, 0)
            const material = new THREE.MeshPhongMaterial({
                color: i % 3 === 0 ? 0x059669 : i % 3 === 1 ? 0x047857 : 0x065f46,
                transparent: true,
                opacity: 0.25,
                wireframe: true
            })
            const mesh = new THREE.Mesh(geometry, material)

            mesh.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 6
            )

            leaves.push(mesh)
            scene.add(mesh)
        }

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
        scene.add(ambientLight)

        const pointLight1 = new THREE.PointLight(0x10b981, 1.5)
        pointLight1.position.set(5, 5, 5)
        scene.add(pointLight1)

        const pointLight2 = new THREE.PointLight(0x059669, 1)
        pointLight2.position.set(-5, -5, 3)
        scene.add(pointLight2)

        // Animation loop
        const clock = new THREE.Clock()

        const animate = () => {
            const elapsedTime = clock.getElapsedTime()

            // Rotate particles slowly
            particlesMesh.rotation.y = elapsedTime * 0.03
            particlesMesh.rotation.x = Math.sin(elapsedTime * 0.02) * 0.1

            // Animate leaves organically
            leaves.forEach((leaf, index) => {
                leaf.rotation.x = elapsedTime * 0.15 + index * 0.2
                leaf.rotation.y = elapsedTime * 0.1 + index * 0.15
                leaf.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.002
                leaf.position.x += Math.cos(elapsedTime * 0.3 + index) * 0.001
            })

            // Gentle camera sway
            camera.position.x = Math.sin(elapsedTime * 0.1) * 0.5
            camera.position.y = Math.cos(elapsedTime * 0.12) * 0.3

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
            window.removeEventListener('resize', handleResize)
            renderer.dispose()
        }
    }, [])

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    }

    const imageVariants = {
        hidden: { scale: 0.9, opacity: 0, rotateY: -15 },
        visible: {
            scale: 1,
            opacity: 1,
            rotateY: 0,
            transition: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    }

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden py-16 md:py-24"
        >
            {/* Three.js Canvas Background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 -z-30 h-full w-full"
                aria-hidden="true"
            />

            {/* Multi-layer Dark Green Gradient Background */}
            <div
                className="absolute inset-0 -z-20 bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-950"
                aria-hidden="true"
            />

            <div
                className="absolute inset-0 -z-20 bg-gradient-to-t from-green-950/80 via-transparent to-emerald-900/60"
                aria-hidden="true"
            />

            {/* Radial gradients for depth */}
            <div
                className="absolute inset-0 -z-10 opacity-40"
                style={{
                    background: `
                        radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.2) 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, rgba(5, 150, 105, 0.25) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(6, 95, 70, 0.15) 0%, transparent 60%)
                    `
                }}
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-6xl mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-gradient-to-r from-emerald-200 via-green-100 to-emerald-300 bg-clip-text mb-4">
                        Our Story
                    </h2>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: 96 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-1 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 mx-auto rounded-full"
                    />
                </motion.div>

                {/* Main Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center"
                >
                    {/* Image Section */}
                    <motion.div
                        variants={imageVariants}
                        className="relative order-2 md:order-1"
                    >
                        <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/50 group">
                            <Image
                                src="/home/founder.png"
                                alt="Arman and Naaz - Founders of Arna Skincare"
                                fill
                                className="object-cover object-center md:object-[50%_25%] transition-transform duration-700 group-hover:scale-110"
                                priority
                            />
                            {/* Overlay Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-gradient-to-br from-white/95 to-emerald-50/95 backdrop-blur-md px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl shadow-xl border border-emerald-200/30"
                            >
                                <p className="text-emerald-900 font-semibold text-base sm:text-lg">
                                    10+ Years of Excellence
                                </p>
                            </motion.div>

                            {/* Decorative corner accents */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-bl-full" />
                            <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-green-400/20 to-transparent rounded-tr-full" />
                        </div>

                        {/* Floating decorative element */}
                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                                rotate: [0, 3, 0]
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"
                            aria-hidden="true"
                        />
                    </motion.div>

                    {/* Story Content */}
                    <div className="space-y-5 md:space-y-6 order-1 md:order-2">
                        {/* Brand Origin */}
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, translateX: 5 }}
                            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md p-5 md:p-6 rounded-xl shadow-lg border-l-4 border-emerald-500 hover:border-green-400 transition-all duration-300"
                        >
                            <h3 className="text-xl md:text-2xl font-bold text-emerald-100 mb-3">
                                The Birth of ARNA
                            </h3>
                            <p className="text-gray-200 leading-relaxed text-sm md:text-base">
                                A decade ago, my wife <span className="font-semibold text-emerald-300">Naaz</span> and
                                I, <span className="font-semibold text-emerald-300">Arman</span>, embarked on a journey
                                together as partners. From our names emerged <span className="font-bold text-emerald-200 text-lg">ARNA</span> —
                                a blend of <span className="font-semibold text-emerald-300">AR</span>man and
                                Na<span className="font-semibold text-emerald-300">az</span>, symbolizing our united vision for natural beauty.
                            </p>
                        </motion.div>

                        {/* Mission */}
                        <motion.div variants={itemVariants} className="space-y-4">
                            <h3 className="text-xl md:text-2xl font-bold text-emerald-100">
                                Our Philosophy
                            </h3>
                            <p className="text-gray-200 leading-relaxed text-sm md:text-base">
                                At Arna Skincare, we believe in the power of nature combined with personalized care.
                                Our commitment is built on three pillars:
                            </p>

                            <div className="grid gap-3">
                                {[
                                    { label: 'Quality', text: '100% herbal and natural ingredients for face, hair, and body' },
                                    { label: 'Customization', text: 'Products tailored to your unique skin type' },
                                    { label: 'Value', text: 'Premium service at the best prices' }
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                        className="flex items-start space-x-3 group"
                                    >
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                                        <p className="text-gray-200 text-sm md:text-base">
                                            <span className="font-semibold text-emerald-300">{item.label}:</span> {item.text}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Product Range */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-gradient-to-br from-emerald-900/40 to-green-900/30 backdrop-blur-sm p-5 rounded-xl border border-emerald-500/20"
                        >
                            <h4 className="font-bold text-emerald-200 mb-3 text-base md:text-lg">Our Natural Solutions</h4>
                            <div className="flex flex-wrap gap-2">
                                {['Glowing Skin', 'Healthy Hair', 'D-Tan Body Care'].map((product, index) => (
                                    <motion.span
                                        key={product}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                                        whileHover={{ scale: 1.1, y: -3 }}
                                        className="bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 rounded-full text-xs md:text-sm font-medium text-white shadow-lg hover:shadow-emerald-500/50 cursor-pointer transition-shadow"
                                    >
                                        {product}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Bottom Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-12 md:mt-16 text-center"
                >
                    <blockquote className="text-xl md:text-2xl lg:text-3xl text-transparent bg-gradient-to-r from-emerald-200 via-green-100 to-emerald-200 bg-clip-text font-medium italic">
                        "Nature's wisdom, personalized for you"
                    </blockquote>
                    <p className="text-emerald-300 mt-3 text-sm md:text-base">— Arman & Naaz, Founders</p>
                </motion.div>

                {/* Bottom floating decorative elements */}
                <motion.div
                    animate={{
                        y: [0, 20, 0],
                        x: [0, 10, 0]
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-10 right-10 w-32 h-32 bg-green-500/5 rounded-full blur-3xl"
                    aria-hidden="true"
                />
            </div>
        </section>
    )
}

export default OurStory