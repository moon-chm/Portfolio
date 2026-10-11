"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { ArrowDown, Code, Mail, User, Briefcase, FileText, ExternalLink, Github, X, Menu, Star, Smartphone, Sparkles, Globe, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
// Import Lenis
import Lenis from "@studio-freight/lenis"

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
    title: "MCQ Checking using AI (Android App)",
    category: "android",
    categoryLabel: "Android / Mobile",
    description: "An AI-powered Android app that automatically evaluates multiple-choice questions from scanned or captured answer sheets using on-device OCR and ML Kit, generating instant performance analytics.",
    tags: ["Android", "Kotlin", "ML Kit", "Firebase", "OCR", "Computer Vision"],
    image: "/mcq.png",
    projectUrl: null,
    githubUrl: "https://github.com/moon-chm",
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
  {
    title: "Tic-Tac-Toe Game App",
    category: "android",
    categoryLabel: "Android / Mobile",
    description: "An interactive Android game application designed with modern Material UI, smooth gameplay animations, scoreboard tracking, and multi-mode play.",
    tags: ["Android", "Java", "Android Studio", "Material Design"],
    image: "/bird.png",
    projectUrl: null,
    githubUrl: "https://github.com/moon-chm/tic-tac-toe_gameApp",
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
    title: "Job Portal (Full-Stack Web App)",
    category: "web",
    categoryLabel: "Web & Full-Stack",
    description: "A full-stack recruitment portal featuring tailored company and job-seeker dashboards, real-time application updates, authentication, and administrative oversight.",
    tags: ["HTML/CSS", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    image: "/job.png",
    projectUrl: "https://job-portal-iota-sand.vercel.app",
    githubUrl: "https://github.com/moon-chm/Job-portal",
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
  const lenisRef = useRef(null)

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // Animation duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      direction: 'vertical', // Scroll direction
      gestureDirection: 'vertical', // Gesture direction
      smooth: true, // Enable smooth scrolling
      mouseMultiplier: 1, // Mouse wheel multiplier
      smoothTouch: false, // Disable smooth scrolling on touch devices (better performance)
      touchMultiplier: 2, // Touch multiplier
      infinite: false, // Disable infinite scroll
    })

    // Store lenis instance in ref for cleanup and access
    lenisRef.current = lenis

    // Animation frame function for Lenis
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Cleanup function
    return () => {
      lenis.destroy()
    }
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

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])

  // Updated smooth scroll function for navigation using Lenis
  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element && lenisRef.current) {
      // Use Lenis scrollTo method for smooth scrolling
      const yOffset = -80 // Header height offset
      const elementPosition = element.offsetTop + yOffset

      lenisRef.current.scrollTo(elementPosition, {
        duration: 2, // Custom duration for navigation
        easing: (t) => t * (2 - t), // Custom easing for navigation
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#FEFAE0]" ref={ref}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFFFFF]/30 backdrop-blur-sm border-b border-[#D4A373]/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#D4A373] font-bold text-xl"
          >
            <span className="animate-colorChange">Hello, World!</span>
          </motion.div>
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex space-x-8"
          >
            {["Home", "About", "Skills", "Projects", "Experience", "Contact"].map((item, i) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-[#000000] hover:text-[#FFFFFF] transition-colors"
              >
                {item}
              </button>
            ))}
          </motion.nav>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:hidden"
          >
            <Button
              variant="ghost"
              className="text-[#D4A373] menu-button"
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
            className="fixed top-[72px] left-0 right-0 bg-[#FEFAE0] border-b border-[#D4A373]/20 shadow-lg z-40 mobile-menu"
          >
            <div className="container mx-auto py-4 px-4">
              <div className="flex flex-col space-y-4">
                {["Home", "About", "Skills", "Projects", "Experience", "Contact"].map((item, i) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-[#D4A373] hover:text-[#CCD5AE] transition-colors py-2 text-left"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#CCD5AE]/30" />
          <div className="h-full w-full bg-[url('/bg2.gif')] bg-cover bg-center" />
        </motion.div>

        <div className="container mx-auto px-4 z-20">
          <motion.div style={{ y: textY }} className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-[#D4A373] mb-6"
            >
              Hello, I'm <span className="text-[#CCD5AE]">Rohit</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-[#FFFFFF] mb-8"
            >
              A passionate developer crafting beautiful digital experiences
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                className="bg-[#D4A373] hover:bg-[#D4A373]/80 text-white"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
              </Button>
              <Button
                variant="outline"
                className="border-[#D4A373] text-[#D4A373] hover:bg-[#D4A373]/10"
                onClick={() => scrollToSection("contact")}
              >
                Contact Me
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
          onClick={() => scrollToSection("about")}
        >
          <ArrowDown className="text-[#D4A373] w-8 h-8" />
        </motion.div>
      </section>

      {/* About Section */}
      <Section id="about" title="About Me" icon={<User className="w-6 h-6" />}>
        <div className="relative grid md:grid-cols-2 gap-12 items-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative h-[600px] w-full"
          >
            <div className="absolute inset-0 translate-x-6 translate-y-6 border-4 border-[#D4A373] rounded-lg -z-10" />
            <div className="relative h-full w-full overflow-hidden rounded-lg">
              <Image src="/me.jpeg" alt="Profile" fill className="object-cover" priority />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-[#D4A373] mb-4">Who I Am</h3>
            <p className="text-[#D4A373]/80 mb-6">
              I'm a passionate developer with a keen eye for design and a love for creating seamless user experiences.
              With a background in both design and development, I bring a unique perspective to every project I work on.
            </p>
            <p className="text-[#D4A373]/80 mb-6">
              My journey in tech began when I discovered my passion for problem-solving and creativity. Since then, I've
              been on a continuous learning path, exploring new technologies and methodologies to enhance my skills.
            </p>
            <div className="flex flex-wrap gap-4">
              <Pill>Creative Thinker</Pill>
              <Pill>Problem Solver</Pill>
              <Pill>Detail Oriented</Pill>
              <Pill>Team Player</Pill>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" title="My Skills" icon={<Code className="w-6 h-6" />} className="bg-[#E9EDC9]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkillCard
            title="Frontend Development"
            skills={["React", "Next.js", "HTML/CSS", "JavaScript", "TypeScript", "Tailwind CSS"]}
            delay={0.1}
          />
          <SkillCard
            title="Backend Development"
            skills={["Node.js", "Express.js", "RESTful APIs", "Firebase", "PHP"]}
            delay={0.2}
          />
          <SkillCard
            title="Design & UI/UX Tools"
            skills={["Figma", "Canva", "TouchDesigner"]}
            delay={0.3}
          />
          <SkillCard
            title="Dev Tools & IDEs"
            skills={["Git & GitHub", "Postman", "Visual Studio Code", "Android Studio", "Binary Ninja"]}
            delay={0.4}
          />
          <SkillCard
            title="Cloud, Database & AI Services"
            skills={["IBM Watson", "Firebase", "Oracle", "Microsoft Azure", "SQL"]}
            delay={0.5}
          />
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="Featured Projects" icon={<Briefcase className="w-6 h-6" />}>
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { id: "all", label: "All Projects (Android First)", icon: <Layers className="w-4 h-4 mr-2" /> },
            { id: "android", label: "Android & Mobile Apps", icon: <Smartphone className="w-4 h-4 mr-2" /> },
            { id: "ai", label: "AI & Machine Learning", icon: <Sparkles className="w-4 h-4 mr-2" /> },
            { id: "web", label: "Web & Full-Stack", icon: <Globe className="w-4 h-4 mr-2" /> },
          ].map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                  isActive
                    ? "bg-[#D4A373] text-white shadow-md scale-105"
                    : "bg-white/80 text-[#D4A373] hover:bg-white hover:text-[#b88657] border border-[#D4A373]/20"
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData
            .filter((p) => activeCategory === "all" || p.category === activeCategory)
            .map((project, idx) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                tags={project.tags}
                image={project.image}
                categoryLabel={project.categoryLabel}
                delay={(idx % 4) * 0.05}
                projectUrl={project.projectUrl}
                githubUrl={project.githubUrl}
              />
            ))}
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience" title="Work Experience" icon={<FileText className="w-6 h-6" />} className="bg-[#FAEDCD]">
        <div className="space-y-12">
          <ExperienceItem
            title="GDG Hackathon Finalist"
            company="GDG on Campus, SGU"
            period="2025"
            description="Recognized as a finalist for building a comprehensive rural girl empowerment platform featuring a responsive website, WhatsApp-based shopping chatbot, and an emergency SOS mobile application. Spearheaded both frontend and backend development while collaborating on scalable, impactful tech solutions."
            delay={0.1}
          />
          <ExperienceItem
            title="Android Developer Intern"
            company="IGap Technologies"
            period="2023 – 2024"
            description="Developed and maintained Android applications with a focus on user-centric design and optimized performance. Worked closely with cross-functional teams to implement new features, resolve bugs, and improve overall app reliability."
            delay={0.2}
          />
          <ExperienceItem
            title="Gen-AI Intern"
            company="Sunbeam Infotech Private Limited(Pune)"
            period="2025 – 2026"
            description="Developed Generative AI workflows using LLMs, embeddings, and vector databases. Implemented data scraping, preprocessing, chunking, and retrieval pipelines while collaborating with cross-functional teams to build scalable AI-driven applications."
            delay={0.3}
          />
          <ExperienceItem
            title="President, DSSA Student Association"
            company="DKTE"
            period="2025 – 2026"
            description="Elected as DSSA President, where I demonstrated leadership by managing teams, coordinating events, and building strong collaboration between students and faculty to enhance learning beyond the classroom."
            delay={0.4}
          />
          <ExperienceItem
            title="President, ITESA Student Association"
            company="Sharad Institute of Technology Polytechnic, Yadrav"
            period="2023 – 2024"
            description="Elected as President of ITESA, where I led a team to plan and execute various technical and co-curricular events. Fostered student engagement, collaborated with faculty, and promoted a culture of innovation and learning across the department."
            delay={0.5}
          />
          <ExperienceItem
            title="Diploma in Information Technology"
            company="Sharad Institute of Technology Polytechnic, Yadrav"
            period=" 2021 –  2024"
            description="Completed a rigorous three-year diploma with an aggregate score of 88.63%. Gained hands-on experience and foundational expertise in software development, computer networks, database management, and IT systems through academic and project-based learning."
            delay={0.6}
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

function ProjectCard({
  title,
  description,
  tags,
  image,
  delay = 0,
  projectUrl,
  githubUrl,
  categoryLabel,
}: {
  title: string
  description: string
  tags: string[]
  image?: string
  delay?: number
  projectUrl?: string | null
  githubUrl?: string | null
  categoryLabel?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(delay, 0.2) }}
      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-[#D4A373]/25 flex flex-col"
    >
      <div className="relative h-60 w-full overflow-hidden bg-[#CCD5AE]/20">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        {categoryLabel && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-3 py-1 bg-[#D4A373] text-white rounded-full text-xs font-semibold shadow-md">
              {categoryLabel}
            </span>
          </div>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between bg-stone-900 text-white relative z-10">
        <div>
          <h3 className="text-xl font-bold mb-2 text-[#FEFAE0] group-hover:text-[#CCD5AE] transition-colors">{title}</h3>
          <p className="text-[#FEFAE0]/80 text-sm mb-4 leading-relaxed line-clamp-3">{description}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag, index) => (
              <span key={index} className="px-2.5 py-0.5 bg-[#D4A373]/30 border border-[#D4A373]/40 rounded-full text-xs font-medium text-[#FEFAE0]">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
          {projectUrl && (
            <a href={projectUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="default" className="bg-[#D4A373] hover:bg-[#D4A373]/80 text-white">
                <ExternalLink className="w-4 h-4 mr-1.5" /> View Project
              </Button>
            </a>
          )}
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Github className="w-4 h-4 mr-1.5" /> Code
              </Button>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function ExperienceItem({ title, company, period, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-[#D4A373]"
    >
      <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-[#D4A373] -translate-x-1.5" />
      <div className="mb-2">
        <h3 className="text-xl font-bold text-[#D4A373]">{title}</h3>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-[#D4A373]/80">
          <span>{company}</span>
          <span className="hidden sm:block">•</span>
          <span className="text-sm bg-[#D4A373]/10 px-2 py-1 rounded-full inline-block w-fit">{period}</span>
        </div>
      </div>
      <p className="text-[#D4A373]/80">{description}</p>
    </motion.div>
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