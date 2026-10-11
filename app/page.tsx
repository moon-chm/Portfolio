"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowDown, Code, Mail, User, Briefcase, FileText, Github, X, Menu, Smartphone, Sparkles, Globe, Layers, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
// Import Lenis & GSAP
import Lenis from "@studio-freight/lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const projectsData = [
  // --- Android & Mobile Applications (FIRST) ---
  {
    title: "CollabSphere",
    category: "android",
    categoryLabel: "Android / Mobile",
    description: "A premium, local-first team collaboration platform featuring a modern Jetpack Compose Android client and Ktor backend with PostgreSQL. Supports real-time messaging, Kanban task boards, notes, and seamless file sync.",
    tags: ["Android", "Jetpack Compose", "Kotlin", "Ktor", "PostgreSQL", "WebSockets"],
    image: "/collabsphere.jpg",
    projectUrl: null,
    githubUrl: "https://github.com/moon-chm/collabsphere",
  },
  {
    title: "Tracklyst – Coding & Placement Ecosystem",
    category: "android",
    categoryLabel: "Android / Mobile",
    description: "A 3-tier tracking ecosystem (Android faculty app, student web dashboard, and browser extension) monitoring real-time coding progress and placement readiness. Adopted by 70+ students across the college.",
    tags: ["Android", "Java", "TypeScript", "Next.js", "Firebase", "Chrome Extension"],
    image: "/tracklyst.png",
    projectUrl: "https://tracklyst-three.vercel.app",
    githubUrl: "https://github.com/moon-chm/tracklyst",
  },
  {
    title: "FarmDidi Order Manager",
    category: "android",
    categoryLabel: "Android / Mobile",
    description: "A modern Android application engineered for rural women entrepreneurs to easily manage customer orders, monitor inventory levels, and oversee fulfillment workflows in real-time.",
    tags: ["Android", "Kotlin", "Android Studio", "Firebase", "MVVM"],
    image: "/farmdidi.jpg",
    projectUrl: null,
    githubUrl: "https://github.com/moon-chm/FarmDidi",
  },
  {
    title: "Alz-AI Companion & Caregiver App",
    category: "android",
    categoryLabel: "Android / Mobile",
    description: "An Android application designed to assist Alzheimer's patients and caregivers. Features seamless photo uploads for disease progression analysis, daily cognitive tracking, and emergency alert mechanisms.",
    tags: ["Android", "Java", "Python", "FastAPI", "Azure", "Firebase"],
    image: "/alz.jpeg",
    projectUrl: null,
    githubUrl: "https://github.com/moon-chm/Alz-AI_app",
  },
  {
    title: "GuardianSOS – Emergency Safety App",
    category: "android",
    categoryLabel: "Android / Mobile",
    description: "A rapid-action Android emergency safety app featuring one-tap SOS activation, real-time GPS geolocation broadcasting, and automated SMS distress signals to emergency contacts.",
    tags: ["Android", "Java", "Google Maps API", "SMS Gateway", "GPS"],
    image: "/sosapp.jpg",
    projectUrl: null,
    githubUrl: "https://github.com/moon-chm/sosapp",
  },

  // --- Remaining Projects (AI / ML & Full-Stack Web) ---
  {
    title: "SMARAN – Smart Memory Assistance & Recall Network",
    category: "ai",
    categoryLabel: "AI & ML",
    description: "An AI-powered cognitive memory care platform utilizing hybrid RAG (Neo4j knowledge graph + FAISS vector search) and real-time voice NLP pipelines to assist dementia patients with associative memory recall.",
    tags: ["Python", "FastAPI", "Neo4j", "FAISS", "LangChain", "Docker", "LLMs"],
    image: "/smaran.png",
    projectUrl: null,
    githubUrl: "https://github.com/moon-chm/SMARAN",
  },
  {
    title: "Rural Girl's Empowerment Platform",
    category: "web",
    categoryLabel: "Web & Full-Stack",
    description: "GDG Hackathon Finalist project: a comprehensive web platform providing rural girls with digital education access, scholarship discovery, mentorship, and community stories.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "Firebase", "IBM Watson", "Gemini API"],
    image: "/rural.jpeg",
    projectUrl: "https://rural-girls-empowerment-platform.vercel.app/",
    githubUrl: "https://github.com/moon-chm/RuralGirls_Empowerment_Platform",
  },
  {
    title: "GreenXchange – Urban Greening Platform",
    category: "web",
    categoryLabel: "Web & Full-Stack",
    description: "A decentralized platform incentivizing urban community greening through AI plant recognition, computer vision growth monitoring, and an append-only reward ledger.",
    tags: ["Next.js", "Python", "Computer Vision", "AI", "PostgreSQL", "Vercel"],
    image: "/greenxchange.jpg",
    projectUrl: "https://green-xchange-ten.vercel.app",
    githubUrl: "https://github.com/moon-chm/GreenXchange",
  },
  {
    title: "MELODUB – AI Music Translation Pipeline",
    category: "ai",
    categoryLabel: "AI & ML",
    description: "An end-to-end AI music translation and dubbing pipeline that isolates vocal tracks, translates lyrical timing and rhythm, and synthesizes target language vocals with stem re-mastering.",
    tags: ["Python", "Whisper", "Librosa", "PyTorch", "Audio Processing", "AI/ML"],
    image: "/melodub.jpg",
    projectUrl: null,
    githubUrl: "https://github.com/moon-chm/MELODUB",
  },
  {
    title: "Sunbeam Institute AI Chatbot",
    category: "ai",
    categoryLabel: "AI & ML",
    description: "An AI institutional assistant that extracts information from campus web sources via web scraping, NLP, and Retrieval-Augmented Generation (RAG) to provide accurate, real-time responses.",
    tags: ["Python", "RAG", "LangChain", "NLP", "Embeddings", "Web Scraping"],
    image: "/sunbeam_chatbot.jpg",
    projectUrl: null,
    githubUrl: "https://github.com/moon-chm/Sunbeam_Chatbot",
  },
  {
    title: "EIDOS – Cognitive Proactive AI Assistant",
    category: "ai",
    categoryLabel: "AI & ML",
    description: "A privacy-first cognitive AI companion with a Python/FastAPI brain backend orchestrating mobile tasks, autonomous planning, and contextual vector memory graphs.",
    tags: ["Python", "FastAPI", "LangChain", "LLM Agents", "Vector Memory"],
    image: "/eidos.jpg",
    projectUrl: null,
    githubUrl: "https://github.com/moon-chm/EIDOS",
  },
  {
    title: "Portfolio Website",
    category: "web",
    categoryLabel: "Web & Full-Stack",
    description: "A modern, highly animated developer portfolio built with Next.js, Framer Motion, Lenis smooth scrolling, tailored cream aesthetic, and contact API pipeline.",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript", "Lenis"],
    image: "/port.png",
    projectUrl: "https://portfolio-lake-mu-66.vercel.app",
    githubUrl: "https://github.com/moon-chm/Portfolio",
  },
]

export default function Portfolio() {
  const { toast } = useToast()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeSection, setActiveSection] = useState("home")
  const [showBackToTop, setShowBackToTop] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const aboutSectionRef = useRef<HTMLDivElement | null>(null)
  const showcaseSectionRef = useRef<HTMLDivElement | null>(null)
  const showcaseTrackRef = useRef<HTMLDivElement | null>(null)
  const experienceContainerRef = useRef<HTMLDivElement | null>(null)

  // Initialize responsive Lenis & GSAP ScrollTrigger Synchronization
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // Update ScrollTrigger on every Lenis scroll tick
    lenis.on('scroll', ScrollTrigger.update)

    // Wire Lenis raf into GSAP ticker for synchronized 60-120fps motion
    const updateGsapTicker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateGsapTicker)
    gsap.ticker.lagSmoothing(0)

    // 1. Senior Design Hero Entrance Sequence
    const heroCtx = gsap.context(() => {
      const heroTl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.15,
      })

      heroTl
        .fromTo(
          ".hero-title-line",
          { yPercent: 120, opacity: 0, rotateX: 20 },
          { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.1, stagger: 0.14, ease: "power3.out" }
        )
        .fromTo(
          ".hero-cta-group",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
          "-=0.6"
        )
        .fromTo(
          ".hero-scroll-indicator",
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        )
    }, heroRef)

    // 2. About Me 3D Assemble Magic (Flying components dock into place on scroll)
    const aboutCtx = gsap.context(() => {
      const section = aboutSectionRef.current
      if (!section) return

      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "top 25%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      })

      // Photo frame flies from left with rotation & perspective
      aboutTl
        .fromTo(
          ".about-photo-frame",
          { opacity: 0, x: -120, y: 60, rotationY: -35, rotationZ: -8, scale: 0.85 },
          { opacity: 1, x: 0, y: 0, rotationY: 0, rotationZ: 0, scale: 1, duration: 1.1 }
        )
        // Accent border offset snaps into place
        .fromTo(
          ".about-photo-border",
          { opacity: 0, x: 30, y: -30, scale: 1.1 },
          { opacity: 1, x: 24, y: 24, scale: 1, duration: 0.9, ease: "back.out(1.7)" },
          "-=0.8"
        )
        // Bio text blocks swoop in with staggered assembly
        .fromTo(
          ".about-text-block",
          { opacity: 0, x: 80, y: 40, rotationX: 25 },
          { opacity: 1, x: 0, y: 0, rotationX: 0, duration: 0.9, stagger: 0.12 },
          "-=0.9"
        )
        // Floating credential stat chips fly in from different 3D angles
        .fromTo(
          ".about-stat-chip",
          { opacity: 0, y: 50, scale: 0.7, rotationZ: (i) => (i % 2 === 0 ? -12 : 12) },
          { opacity: 1, y: 0, scale: 1, rotationZ: 0, duration: 0.8, stagger: 0.1, ease: "back.out(2)" },
          "-=0.6"
        )
        // Trait pills fly up and magnetize into position
        .fromTo(
          ".about-pill-item",
          { opacity: 0, y: 30, scale: 0.6 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: "back.out(2.2)" },
          "-=0.5"
        )
    }, aboutSectionRef)

    // 3. Horizontal Scroll Showcase (Desktop Only, Responsive Cleanup)
    const showcaseCtx = gsap.context(() => {
      const track = showcaseTrackRef.current
      const section = showcaseSectionRef.current

      if (!track || !section) return

      const mm = gsap.matchMedia()

      mm.add("(min-width: 1024px)", () => {
        const getScrollDistance = () => {
          return track.scrollWidth - window.innerWidth + 120
        }

        const totalScroll = getScrollDistance()
        if (totalScroll > 0) {
          gsap.to(track, {
            x: () => -getScrollDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${getScrollDistance()}`,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          })
        }
      })
    }, showcaseSectionRef)

    // 4. Work Experience Interactive Timeline GSAP Magic
    const experienceCtx = gsap.context(() => {
      const container = experienceContainerRef.current
      if (!container) return

      // Animate vertical progress line drawn down the spine as you scroll
      gsap.fromTo(
        ".timeline-stem-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
            end: "bottom 85%",
            scrub: true,
          },
        }
      )

      // Staggered reveal of experience cards with subtle 3D tilt and elevation
      const items = gsap.utils.toArray<HTMLElement>(".experience-card-item")
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })
    }, experienceContainerRef)

    return () => {
      heroCtx.revert()
      aboutCtx.revert()
      showcaseCtx.revert()
      experienceCtx.revert()
      gsap.ticker.remove(updateGsapTicker)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // Active section scroll spy and Back-to-Top toggle
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)

      const sections = ["home", "about", "skills", "projects", "experience", "contact"]
      const scrollPosition = window.scrollY + 200

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest(".mobile-menu") && !event.target.closest(".menu-button")) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [mobileMenuOpen])

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [mobileMenuOpen])

  // Scoped hero parallax for maximum frame rate
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  // Butter-smooth section navigation
  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      if (lenisRef.current) {
        const yOffset = -70
        const elementPosition = element.offsetTop + yOffset
        lenisRef.current.scrollTo(elementPosition, {
          duration: 0.9,
          easing: (t) => 1 - Math.pow(1 - t, 3),
        })
      } else {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#FEFAE0]">
      {/* Header with Active State & Glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FEFAE0]/80 backdrop-blur-md border-b border-[#D4A373]/25 shadow-sm transition-all">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="cursor-pointer font-bold text-xl text-[#D4A373] tracking-tight"
            onClick={() => scrollToSection("home")}
          >
            <span className="bg-gradient-to-r from-[#D4A373] to-[#b88657] bg-clip-text text-transparent">Rohit.dev</span>
          </motion.div>
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex space-x-2"
          >
            {["Home", "About", "Skills", "Projects", "Experience", "Contact"].map((item) => {
              const isCurrent = activeSection === item.toLowerCase()
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isCurrent
                      ? "bg-[#D4A373] text-white shadow-sm font-semibold"
                      : "text-stone-700 hover:text-[#D4A373] hover:bg-[#D4A373]/10"
                  }`}
                >
                  {item}
                </button>
              )
            })}
          </motion.nav>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:hidden"
          >
            <Button
              variant="ghost"
              className="text-[#D4A373] menu-button hover:bg-[#D4A373]/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[60px] left-0 right-0 bg-[#FEFAE0]/95 backdrop-blur-md border-b border-[#D4A373]/30 shadow-xl z-40 mobile-menu"
          >
            <div className="container mx-auto py-4 px-4">
              <div className="flex flex-col space-y-2">
                {["Home", "About", "Skills", "Projects", "Experience", "Contact"].map((item) => {
                  const isCurrent = activeSection === item.toLowerCase()
                  return (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className={`py-2 px-4 rounded-lg text-left text-sm font-medium transition-colors ${
                        isCurrent
                          ? "bg-[#D4A373] text-white"
                          : "text-stone-800 hover:text-[#D4A373] hover:bg-[#D4A373]/10"
                      }`}
                    >
                      {item}
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#CCD5AE]/20 via-[#1e1b18]/50 to-black/70" />
          <div className="h-full w-full bg-[url('/bg2.gif')] bg-cover bg-center" />
        </motion.div>

        <div className="container mx-auto px-4 z-20">
          <motion.div style={{ y: textY }} className="max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Cinematic Masked Headline */}
            <div className="hero-line-mask mb-2">
              <h1 className="hero-title-line text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#FEFAE0] tracking-tight leading-none">
                Hello, I'm <span className="text-[#D4A373]">Rohit</span>
              </h1>
            </div>

            <div className="hero-line-mask mb-6">
              <h2 className="hero-title-line text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#CCD5AE] tracking-tight">
                Android & AI Systems Engineer
              </h2>
            </div>

            {/* CTAs */}
            <div className="hero-cta-group mt-6 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-[#D4A373] hover:bg-[#b88657] text-white px-8 py-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={() => scrollToSection("projects")}
              >
                Explore Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-black/30 hover:bg-white/10 border-white/30 text-[#FEFAE0] px-8 py-6 rounded-full font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={() => scrollToSection("contact")}
              >
                Let's Talk
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="hero-scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer flex flex-col items-center gap-1 group"
          onClick={() => scrollToSection("about")}
        >
          <span className="text-[11px] tracking-widest uppercase font-semibold text-[#FEFAE0]/70 group-hover:text-[#D4A373] transition-colors">
            Scroll to explore
          </span>
          <ArrowDown className="text-[#D4A373] w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </motion.div>
      </section>

      {/* About Section with GSAP 3D Assembly Magic */}
      <Section id="about" title="About Me" icon={<User className="w-6 h-6" />}>
        <div ref={aboutSectionRef} className="about-assemble-stage relative grid md:grid-cols-12 gap-12 items-center z-10 py-6">
          {/* Left Column: Flying 3D Photo & Dynamic Snapping Offset Border */}
          <div className="md:col-span-5 relative">
            <div className="relative mx-auto max-w-[380px] md:max-w-none h-[480px] sm:h-[540px] w-full">
              {/* Offset Accent Border that snaps into position */}
              <div className="about-photo-border absolute inset-0 border-4 border-[#D4A373] rounded-2xl -z-10" />

              {/* Main Photo Frame that glides in from perspective angle */}
              <div className="about-photo-frame relative h-full w-full overflow-hidden rounded-2xl shadow-2xl border border-white/40 bg-white">
                <Image
                  src="/me.jpeg"
                  alt="Rohit Kumbhar"
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating Stat Badge 1: Experience */}
              <div className="about-stat-chip absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md border border-[#D4A373]/30 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 z-20">
                <div className="w-10 h-10 rounded-xl bg-[#FAEDCD] flex items-center justify-center text-[#D4A373] font-bold text-lg">
                  🚀
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Engineering Focus</p>
                  <p className="text-sm font-bold text-stone-800">Android & Gen-AI</p>
                </div>
              </div>

              {/* Floating Stat Badge 2: Adopted Products */}
              <div className="about-stat-chip absolute -top-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md border border-[#D4A373]/30 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 z-20">
                <div className="w-10 h-10 rounded-xl bg-[#CCD5AE]/40 flex items-center justify-center text-emerald-700 font-bold text-lg">
                  ⚡
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Active Adoption</p>
                  <p className="text-sm font-bold text-stone-800">70+ Campus Users</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Flying Bio Blocks & Magnetized Trait Pills */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-6">
            <div className="about-text-block">
              <span className="inline-block text-xs uppercase tracking-widest font-bold px-3 py-1 bg-[#D4A373]/15 text-[#D4A373] rounded-full border border-[#D4A373]/30 mb-3">
                Craftsmanship & Architecture
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#D4A373] tracking-tight">
                Architecting Native Mobile Platforms & Cognitive Systems
              </h3>
            </div>

            <div className="about-text-block space-y-4 text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
              <p>
                I am a mobile developer and AI enthusiast driven by a simple philosophy: software should be blazingly fast, rock-solid in architecture, and visually delightful.
              </p>
              <p>
                From building production Android applications at <strong className="text-stone-900 font-semibold">Webtech Developers</strong> to engineering agentic RAG and Knowledge Graph pipelines at <strong className="text-stone-900 font-semibold">Sunbeam Infotech</strong>, I bridge native mobile craftsmanship with scalable backend ecosystems.
              </p>
            </div>

            {/* Trait Pills that fly in and dock */}
            <div className="about-text-block pt-2">
              <p className="text-xs font-bold uppercase tracking-widest text-[#D4A373] mb-3">Core Pillars</p>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Clean MVVM Architecture",
                  "Local-First & Offline Sync",
                  "Jetpack Compose & Kotlin",
                  "Agentic RAG & Graph NLP",
                  "High-FPS Micro-Interactions",
                  "Team & Student Leadership",
                ].map((trait) => (
                  <span
                    key={trait}
                    className="about-pill-item inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-stone-800 text-xs sm:text-sm font-semibold shadow-sm border border-[#D4A373]/30 hover:border-[#D4A373] hover:shadow-md transition-all duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" title="My Skills" icon={<Code className="w-6 h-6" />} className="bg-[#E9EDC9]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkillCard
            title="Android & Mobile Development"
            skills={[
              "Kotlin & Java",
              "Jetpack Compose",
              "Android Studio & SDK",
              "MVVM Architecture",
              "Coroutines & Flow",
              "Retrofit & REST APIs",
              "Room DB & SQLite",
              "Material 3 UI",
            ]}
            delay={0.1}
          />
          <SkillCard
            title="Generative AI & Machine Learning"
            skills={[
              "LangChain & LlamaIndex",
              "Retrieval-Augmented Gen (RAG)",
              "Vector Databases (FAISS)",
              "Neo4j Knowledge Graphs",
              "Python & FastAPI",
              "LLM Integration & Prompting",
              "NLP & Web Scraping",
            ]}
            delay={0.2}
          />
          <SkillCard
            title="Frontend Development"
            skills={["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5 / CSS3", "Framer Motion"]}
            delay={0.3}
          />
          <SkillCard
            title="Backend & Databases"
            skills={["Node.js & Express.js", "Ktor (Kotlin Backend)", "PostgreSQL", "MongoDB", "Firebase & Firestore", "RESTful APIs"]}
            delay={0.4}
          />
          <SkillCard
            title="Dev Tools & IDEs"
            skills={["Git & GitHub", "Android Studio", "Postman", "Visual Studio Code", "Docker", "Gradle", "Binary Ninja"]}
            delay={0.5}
          />
          <SkillCard
            title="Cloud, Design & UI/UX"
            skills={["Firebase", "Microsoft Azure", "IBM Watson", "Figma", "Canva", "Wireframing & Prototyping"]}
            delay={0.6}
          />
        </div>
      </Section>

      {/* GSAP Scroll-Driven Horizontal Showcase (Single Unified Showcase for All Projects) */}
      <section
        id="projects"
        ref={showcaseSectionRef}
        className="relative bg-[#FAEDCD] text-[#D4A373] py-24 overflow-hidden border-y border-[#D4A373]/30"
      >
        <div className="container mx-auto px-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4A373] text-white text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
              <Briefcase className="w-3.5 h-3.5" /> Portfolio Showcase
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#D4A373] tracking-tight">
              Featured <span className="text-[#CCD5AE] drop-shadow-sm">Projects</span>
            </h2>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="container mx-auto px-6 mb-10 flex flex-wrap gap-2.5">
          {[
            { id: "all", label: `All (${projectsData.length})`, icon: <Layers className="w-4 h-4 mr-2" /> },
            { id: "android", label: `Android & Mobile (${projectsData.filter(p => p.category === "android").length})`, icon: <Smartphone className="w-4 h-4 mr-2" /> },
            { id: "ai", label: `AI & Machine Learning (${projectsData.filter(p => p.category === "ai").length})`, icon: <Sparkles className="w-4 h-4 mr-2" /> },
            { id: "web", label: `Web & Full-Stack (${projectsData.filter(p => p.category === "web").length})`, icon: <Globe className="w-4 h-4 mr-2" /> },
          ].map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id)
                  setTimeout(() => ScrollTrigger.refresh(), 50)
                }}
                className={`flex items-center px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-sm active:scale-95 ${
                  isActive
                    ? "bg-[#D4A373] text-white shadow-md font-semibold scale-105"
                    : "bg-white/90 text-[#b88657] hover:bg-white hover:text-[#8a5d3b] border border-[#D4A373]/30"
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Track Container (Hardware Accelerated) */}
        <div className="px-6 md:px-12 overflow-x-auto lg:overflow-x-visible">
          <div ref={showcaseTrackRef} className="showcase-track flex gap-8 pb-6">
            {projectsData
              .filter((p) => activeCategory === "all" || p.category === activeCategory)
              .map((project, index) => (
                <div
                  key={project.title}
                  className="w-[85vw] sm:w-[480px] lg:w-[540px] flex-shrink-0 bg-white border border-[#D4A373]/30 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl flex flex-col group hover:border-[#D4A373] transition-all duration-300"
                >
                  <div className="relative h-60 sm:h-64 w-full overflow-hidden bg-[#CCD5AE]/20">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-[#FEFAE0] rounded-full text-xs font-semibold shadow-sm">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1 bg-[#D4A373] text-white rounded-full text-xs font-semibold shadow-md">
                        {project.categoryLabel}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between bg-stone-900 text-white">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#FEFAE0] mb-3 group-hover:text-[#CCD5AE] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-[#FEFAE0]/85 text-sm leading-relaxed mb-5 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 bg-[#D4A373]/25 border border-[#D4A373]/40 rounded-full text-xs font-medium text-[#FEFAE0]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full bg-white/10 hover:bg-[#D4A373] hover:border-[#D4A373] hover:text-white border-white/20 text-[#FEFAE0] flex items-center justify-center transition-all duration-300"
                          >
                            <Github className="w-4 h-4 mr-2" /> View Code
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Experience Section with GSAP Dynamic Stem Timeline */}
      <Section id="experience" title="Work Experience" icon={<FileText className="w-6 h-6" />} className="bg-[#FEFAE0]">
        <div ref={experienceContainerRef} className="relative max-w-4xl mx-auto pl-6 sm:pl-10 space-y-12">
          {/* Background Timeline Spine */}
          <div className="absolute left-2.5 sm:left-4 top-2 bottom-2 w-1 bg-[#D4A373]/20 rounded-full" />
          {/* GSAP Scrubbed Animated Progress Spine */}
          <div className="timeline-stem-fill absolute left-2.5 sm:left-4 top-2 bottom-2 w-1 bg-gradient-to-b from-[#D4A373] via-[#b88657] to-[#CCD5AE] rounded-full shadow-sm" />

          <ExperienceItem
            title="Gen-AI Intern"
            company="Sunbeam Infotech Private Limited, Pune"
            period="2025 – 2026"
            description="Developed Generative AI workflows using LLMs, embeddings, and vector databases (RAG pipelines). Implemented automated data scraping, preprocessing, semantic chunking, and context retrieval systems while collaborating with cross-functional teams to build scalable AI-driven applications."
            roleType="AI & RAG Systems"
          />
          <ExperienceItem
            title="Android Developer Intern"
            company="Webtech Developers, Pune"
            period="2024 – 2025"
            description="Engineered and optimized Android applications with modern architecture and responsive UI components. Integrated REST APIs, managed background services, and implemented clean MVVM design patterns to deliver reliable mobile user experiences."
            roleType="Android Architecture"
          />
          <ExperienceItem
            title="Android Developer Intern"
            company="IGap Technologies"
            period="2023 – 2024"
            description="Developed and maintained Android applications with a focus on user-centric design and optimized performance. Worked closely with cross-functional teams to implement new features, resolve bugs, and improve overall app reliability."
            roleType="Mobile Engineering"
          />
          <ExperienceItem
            title="GDG Hackathon Finalist"
            company="GDG on Campus, SGU"
            period="2025"
            description="Recognized as a finalist for building a comprehensive rural girl empowerment platform featuring a responsive website, WhatsApp-based shopping chatbot, and an emergency SOS mobile application. Spearheaded both frontend and backend development while collaborating on scalable, impactful tech solutions."
            roleType="Hackathon Finalist"
          />
          <ExperienceItem
            title="President, DSSA Student Association"
            company="DKTE"
            period="2025 – 2026"
            description="Elected as DSSA President, where I demonstrated leadership by managing teams, coordinating events, and building strong collaboration between students and faculty to enhance learning beyond the classroom."
            roleType="Leadership"
          />
          <ExperienceItem
            title="President, ITESA Student Association"
            company="Sharad Institute of Technology Polytechnic, Yadrav"
            period="2023 – 2024"
            description="Elected as President of ITESA, where I led a team to plan and execute various technical and co-curricular events. Fostered student engagement, collaborated with faculty, and promoted a culture of innovation and learning across the department."
            roleType="Leadership"
          />
          <ExperienceItem
            title="Diploma in Information Technology"
            company="Sharad Institute of Technology Polytechnic, Yadrav"
            period="2021 – 2024"
            description="Completed a rigorous three-year diploma with an aggregate score of 88.63%. Gained hands-on experience and foundational expertise in software development, computer networks, database management, and IT systems through academic and project-based learning."
            roleType="Education"
          />
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" title="Get In Touch" icon={<Mail className="w-6 h-6" />} className="bg-[#CCD5AE]">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div variants={fadeInVariants}>
            <h3 className="text-2xl font-bold text-[#D4A373] mb-4">Let's Connect</h3>
            <p className="text-[#D4A373]/80 mb-6">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-[#D4A373] p-3 rounded-full">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-[#D4A373]">Email</p>
                  <p className="text-[#D4A373]/80">rohitak1865@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-[#D4A373] p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-[#D4A373]">LinkedIn</p>
                  <p className="text-[#D4A373]/80">Rohit Kumbhar</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-[#D4A373] p-3 rounded-full">
                  <Github className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-[#D4A373]">GitHub</p>
                  <p className="text-[#D4A373]/80">moon-chm</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div variants={fadeInVariants}>
            <ContactForm />
          </motion.div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-[#D4A373] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-6 md:mb-0"
            >
              <h2 className="text-2xl font-bold">Rohit Kumbhar</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex space-x-6"
            >
              <a
                href="https://www.linkedin.com/in/rohitkumbhar1865/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FEFAE0] transition-transform transform hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="sr-only ">LinkedIn</span>
              </a>
              <a
                href="https://github.com/moon-chm"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FEFAE0] transition-colors"
              >
                <Github className="w-6 h-6 transition-transform transform hover:scale-110" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://x.com/Ro_kumbhar1865"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FEFAE0] transition-colors transition-transform transform hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://www.instagram.com/iam_rohhh/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FEFAE0] transition-colors transition-transform transform hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37a4 4 0 1 1-4.63-4.63 4 4 0 0 1 4.63 4.63z"></path>
                  <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </a>

              <a href="mailto:rohitak1865@gmail.com" className="hover:text-[#FEFAE0] transition-colors">
                <Mail className="w-6 h-6 transition-transform transform hover:scale-110" />
                <span className="sr-only">Email</span>
              </a>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="border-t border-white/20 mt-8 pt-8 text-center text-white/60 text-sm"
          >
            © {new Date().getFullYear()} Rohit. All rights reserved.
          </motion.div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollToSection("home")}
            className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-[#D4A373] text-white shadow-xl hover:bg-[#b88657] transition-all focus:outline-none focus:ring-2 focus:ring-[#D4A373] focus:ring-offset-2 border border-white/20"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

// Reusable Components
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function Section({ id, title, icon, children, className = "" }) {
  return (
    <section id={id} className={`py-20 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center mb-12"
          >
            <div className="bg-[#D4A373] p-3 rounded-full text-white mb-4">{icon}</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#D4A373]">{title}</h2>
            <div className="w-20 h-1 bg-[#D4A373] mt-4 rounded-full" />
          </motion.div>
          {children}
        </div>
      </div>
    </section>
  )
}

function Pill({ children }) {
  return (
    <span className="inline-block px-4 py-2 rounded-full bg-[#FAEDCD] text-[#D4A373] text-sm font-medium">
      {children}
    </span>
  )
}

function SkillCard({ title, skills, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <h3 className="text-xl font-bold text-[#D4A373] mb-4">{title}</h3>
      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <li key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#D4A373]" />
            <span className="text-[#D4A373]/80">{skill}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}


function ExperienceItem({
  title,
  company,
  period,
  description,
  roleType,
}: {
  title: string
  company: string
  period: string
  description: string
  roleType?: string
}) {
  return (
    <div className="experience-card-item relative pl-6 sm:pl-10 group">
      {/* Animated Timeline Milestone Node with Ambient Glow */}
      <div className="absolute -left-[19px] sm:-left-[31px] top-6 w-6 h-6 rounded-full bg-white border-2 border-[#D4A373] flex items-center justify-center shadow-md group-hover:scale-125 group-hover:border-[#CCD5AE] transition-all duration-300 z-10">
        <div className="w-2.5 h-2.5 rounded-full bg-[#D4A373] group-hover:bg-[#CCD5AE] transition-colors" />
      </div>

      {/* Modern Card Shell */}
      <div className="bg-white/95 rounded-2xl p-6 sm:p-7 border border-[#D4A373]/25 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A373]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#D4A373] tracking-tight group-hover:text-[#b88657] transition-colors">
              {title}
            </h3>
            <p className="text-sm sm:text-base font-semibold text-stone-700 mt-0.5">
              {company}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {roleType && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#CCD5AE]/40 text-stone-800 border border-[#CCD5AE]">
                {roleType}
              </span>
            )}
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#FAEDCD] text-[#D4A373] border border-[#D4A373]/30">
              {period}
            </span>
          </div>
        </div>

        <p className="text-stone-600 text-sm sm:text-base leading-relaxed pt-2 border-t border-[#D4A373]/15">
          {description}
        </p>
      </div>
    </div>
  )
}

function TestimonialCard({ quote, author, position, delay = 0 }) {
  return (
    <motion.div
      variants={fadeInVariants}
      transition={{ delay }}
      className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#D4A373]/20 mb-4"
      >
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
      </svg>
      <p className="text-[#D4A373]/80 mb-6 italic">{quote}</p>
      <div>
        <p className="font-bold text-[#D4A373]">{author}</p>
        <p className="text-sm text-[#D4A373]/60">{position}</p>
      </div>
    </motion.div>
  )
}

// Contact Form with validation and submission
function ContactForm() {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      console.log("Submitting form data:", data)

      // Make API call to send email
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      console.log("API response:", result)

      if (!response.ok || !result.success) {
        const errorMsg = result.error || result.details || 'Failed to send message'
        toast({
          title: "Failed to send message",
          description: errorMsg,
          variant: "destructive",
        })
        return
      }

      // Show success message
      toast({
        title: "Message sent successfully!",
        description: result.message || "Thank you for your message. I'll get back to you soon.",
        variant: "default",
      })

      // Reset form
      reset()
    } catch (error: any) {
      console.warn("Error submitting form:", error?.message || error)

      // Show error message
      toast({
        title: "Failed to send message",
        description: error?.message || "Your message couldn't be sent. Please try again later.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-[#D4A373]">
            Name
          </label>
          <input
            id="name"
            type="text"
            className={`w-full px-4 py-3 rounded-lg border ${errors.name ? "border-red-500" : "border-[#D4A373]/20"} bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4A373]`}
            placeholder="Your Name"
            {...register("name", { required: "Name is required" })}
          />
          {typeof errors.name?.message === "string" && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-[#D4A373]">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-[#D4A373]/20"} bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4A373]`}
            placeholder="Your Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-[#D4A373]">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? "border-red-500" : "border-[#D4A373]/20"} bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4A373]`}
          placeholder="Subject"
          {...register("subject", { required: "Subject is required" })}
        />
        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-[#D4A373]">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className={`w-full px-4 py-3 rounded-lg border ${errors.message ? "border-red-500" : "border-[#D4A373]/20"} bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#D4A373]`}
          placeholder="Your Message"
          {...register("message", {
            required: "Message is required",
            minLength: {
              value: 10,
              message: "Message must be at least 10 characters",
            },
          })}
        ></textarea>
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>
      <Button type="submit" className="w-full bg-[#D4A373] hover:bg-[#D4A373]/80 text-white" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  )
}