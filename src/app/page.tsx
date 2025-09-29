"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code, 
  Database, 
  Smartphone, 
  Globe,
  ChevronDown,
  Star,
  Phone,
  ExternalLink as Leetcode,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Magnetic Button Component
function MagneticButton({ children, className = "", ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: rotateY,
        rotateX: rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
      {...props}
    >
      <motion.div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </motion.button>
  );
}

// Ripple Effect Component
function RippleButton({ children, className = "", onClick, asButton = true, ...props }) {
  const [ripples, setRipples] = useState([]);

  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now(),
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
    
    if (onClick) onClick(e);
  };

  const Component = asButton ? 'button' : 'div';

  return (
    <Component
      className={`relative overflow-hidden ${className}`}
      onClick={addRipple}
      {...props}
    >
      {children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </Component>
  );
}

export default function Home() {
  const skills = [
    { name: "Programming", icon: Code, items: ["Java", "Python", "C++", "SQL", "HTML/CSS", "C#", "Shell Scripting", "JavaScript"] },
    { name: "Infrastructure & DevOps", icon: Database, items: ["Docker", "Kubernetes (EKS)", "Terraform", "AWS CloudFormation", "CI/CD Pipelines", "Jenkins", "Linux/Unix"] },
    { name: "Frameworks & Libraries", icon: Globe, items: ["Spring Framework", "FastAPI", "Flask", "Django", "React.js", "Next.js", "Kafka", "Tailwind", "Unity"] },
    { name: "Databases & Storage", icon: Smartphone, items: ["PostgreSQL", "DynamoDB", "MongoDB", "Redis", "Elasticsearch", "GraphQL", "Vector Search (OpenSearch)"] },
    { name: "Cloud Platforms", icon: Globe, items: ["AWS (EC2, S3, Lambda, RDS, VPC, EKS, ECS, EFS, SNS, SQS, CloudWatch, CloudTrail, Systems Manager, KMS, Secrets Manager)", "Migration Services (Application Migration Service, Database Migration Service, Server Migration Service)", "Governance (AWS Organizations, Control Tower, Config, IAM, CloudFormation, CDK)", "CI/CD (CodePipeline, CodeBuild, CodeDeploy, Glue, DataBrew)", "GCP", "Azure"] },
    { name: "AI/ML & Data Engineering", icon: Code, items: ["OpenAI API","LLM","Agentic AI","LangChain", "Pandas", "NumPy", "Scikit-learn", "ETL Pipelines", "OpenCL", "PySpark", "TensorFlow"] }
  ];

  const projects = [
    {
      title: "LLM-Based Knowledge Graph Completion",
      description: "Crafted a two-phase framework (Candidate Generation and Corroboration) fine-tuned on MALT dataset with ~98% long-tail entities. Applied zero-shot learning strategies to boost robustness and achieved Best Paper recognition at ICICC 2025 from ~600 submissions.",
      tech: ["Python", "LLM", "NLP", "BERT", "Span-BERT", "Transformers", "Zero-Shot Learning"],
      github: "https://github.com/sravs99-44/long-tail-kbc-masters-project",
      imageSrc: "/kb.png",
      imageBg: "from-purple-800 to-indigo-600"
    },
    {
      title: "Cloud Infrastructure for Motion Analysis",
      description: "Architected scalable serverless cloud backend for mobile motion analysis using AWS Lambda, API Gateway, S3, and DynamoDB. Developed video analytics with YOLO, OpenPose, DeepSORT, and optical flow for exercise form tracking. Published at IEEE Cloud Summit 2024.",
      tech: ["AWS", "Lambda", "DynamoDB", "YOLO", "OpenPose", "DeepSORT", "PyTorch", "Serverless"],
      link: "https://www.researchgate.net/publication/383141689_A_Pilot_Study_for_Developing_Mobile_App_and_Cloud_Computing_for_Upper_Extremities_Motion_Analysis",
      imageSrc: "/cloud.png",
      imageBg: "from-blue-800 to-cyan-600"
    },
    {
      title: "Interactive 3D Gauss's Law Simulator",
      description: "Built interactive 3D visualizer in Unity where learners place positive/negative charges, select Gaussian surfaces (sphere/cube/cylinder), and see real-time electric field and flux updates. Implemented physics logic using Coulomb superposition and surface-integral flux approximation.",
      tech: ["Unity", "C#", "ShaderLab", "HLSL", "Physics Simulation", "3D Graphics"],
      github: "https://github.com/sravs99-44/Graphics-Final-Project",
      imageSrc: "/guass.png",
      imageBg: "from-yellow-800 to-orange-600"
    },
    {
      title: "Inspire Love App",
      description: "Developed an Android app using Kotlin for a non-profit organization where users receive random motivational quotes upon installation to inspire their lives. Built for the Love Foundation organization to spread positivity and encouragement through technology.",
      tech: ["Kotlin", "Android", "Kotlin Multiplatform", "Compose", "Mobile Development"],
      github: "https://github.com/sravs99-44/InspireLoveApp",
      imageSrc: "/insp.png",
      imageBg: "from-pink-800 to-rose-600"
    }
  ];

  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const projectsPerView = 2; // Number of projects to show at once
  const maxIndex = Math.max(0, projects.length - projectsPerView);

  const nextProject = () => {
    setCurrentProjectIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevProject = () => {
    setCurrentProjectIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <>
      <style jsx>{`
        .floating-particle {
          animation: float 6s ease-in-out infinite;
        }
        .floating-particle:nth-child(2) {
          animation-delay: -2s;
        }
        .floating-particle:nth-child(3) {
          animation-delay: -4s;
        }
        .floating-particle:nth-child(4) {
          animation-delay: -1s;
        }
        .floating-particle:nth-child(5) {
          animation-delay: -3s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px) rotate(90deg); opacity: 0.6; }
          50% { transform: translateY(-10px) translateX(-10px) rotate(180deg); opacity: 0.4; }
          75% { transform: translateY(-30px) translateX(5px) rotate(270deg); opacity: 0.7; }
        }
        .pulse-glow {
          animation: pulseGlow 4s ease-in-out infinite;
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
      `}</style>
      <div className="min-h-screen bg-[#0A192F] dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        {/* Floating Particles Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="floating-particle absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="floating-particle absolute top-40 right-20 w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="floating-particle absolute top-60 left-1/4 w-3 h-3 bg-blue-300 rounded-full"></div>
          <div className="floating-particle absolute top-80 right-1/3 w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
          <div className="floating-particle absolute top-32 left-2/3 w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
          <div className="floating-particle absolute top-96 left-1/2 w-1 h-1 bg-gray-500 rounded-full"></div>
          <div className="floating-particle absolute top-72 right-10 w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="floating-particle absolute top-48 left-1/5 w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
        </div>
        
        {/* Pulse Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full pulse-glow"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gray-500/10 rounded-full pulse-glow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-blue-400/10 rounded-full pulse-glow" style={{animationDelay: '1s'}}></div>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A192F]/95 backdrop-blur-md border-b border-gray-400/20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-white"
            >
              Sravani Malla
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["Experience", "Education", "Skills", "Certifications", "Projects", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text text-transparent">
                Sravani
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto"
            >
              Software Engineer with 3+ years of experience in full-stack development, scalable cloud architecture, and agentic AI. 
              I lead end-to-end cloud migrations, design reliable services, and leverage GenAI to transform complex business challenges into automated solutions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <MagneticButton>
                <RippleButton
                  asButton={false}
                  href="#experience"
                  className="px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 block"
                >
                  View My Experience
                </RippleButton>
              </MagneticButton>
              <MagneticButton>
                <RippleButton
                  asButton={false}
                  href="#contact"
                  className="px-8 py-4 border-2 border-gray-400 text-gray-300 rounded-full font-semibold hover:bg-gray-400 hover:text-gray-900 transition-all duration-300 block"
                >
                  Get In Touch
                </RippleButton>
              </MagneticButton>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex justify-center mt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown className="w-8 h-8 text-gray-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Professional Experience
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A journey of growth and impact across leading technology companies
            </p>
            <p className="text-sm text-gray-400 mt-4">
              💡 Hover over each experience to see detailed achievements
            </p>
          </motion.div>

          <div className="space-y-8">
            {/* WinWin Labs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-gray-400/20"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white p-2 flex items-center justify-center">
                    <Image 
                      src="/winwinlabs_logo.jpeg" 
                      alt="WinWin Labs" 
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-gray-400 transition-colors duration-300">Full Stack Engineer</h3>
                    <p className="text-lg text-gray-400 font-semibold">WinWin Labs</p>
                    <p className="text-gray-300">May 2025 - Current • MI, US</p>
                  </div>
                </div>
              </div>
              
              {/* Collapsed content */}
              <div className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <span>Built low-latency ingestion pipeline from MQTT into Supabase Edge Function and PostgreSQL with JSON schema validation, idempotency, and timezone normalization</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <span>Designed time series PostgreSQL schema using range partitioning and composite indexes, reducing query latency by 20%</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <span>Architected migration from Supabase to self-hosted stack on Coolify with minimal downtime and automated CI/CD</span>
                </li>
              </div>

              {/* Expanded content on hover */}
              <div className="mt-6 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-96 transition-all duration-500 overflow-hidden transform group-hover:translate-y-0 translate-y-2">
                <div className="border-t border-gray-400/30 pt-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Detailed Responsibilities:</h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span>Added ETL jobs for rolling aggregates and alert precomputations in near real time</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span>Deployed containerized services on Coolify with Docker, health checks, reverse proxy, and automatic TLS</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span>Automated CI/CD in GitHub Actions to test, run migrations, build and push images, create preview environments, and enable one click rollback</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span>Delivered typed REST APIs and a WebSocket stream for live updates, a Next.js dashboard with charts, Celsius and Fahrenheit toggle, and CRUD for thresholds and webhooks</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span>Added unit and integration tests and structured JSON logging for improved reliability and debugging</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* AWS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-gray-400/20"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white p-2 flex items-center justify-center">
                    <Image 
                      src="/amazon_web_services_logo.jpeg" 
                      alt="Amazon Web Services" 
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">Solutions Architect</h3>
                    <p className="text-lg text-gray-300 font-semibold">Amazon Web Services (AWS)</p>
                    <p className="text-gray-300">May 2024 – Aug 2024 • Seattle, US</p>
                  </div>
                </div>
              </div>
              
              {/* Collapsed content */}
              <div className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <span>Built end-to-end platform for Product Development Managers with React.js UI that cut manual effort by 72%</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <span>Designed RAG workflow on AWS Bedrock with Claude Sonnet/Haiku, Amazon Q, and Knowledge Bases, improving accuracy by 54%</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                  <span>Engineered data ingestion for URLs, PDFs, DOCX, images via AWS Glue/DataBrew into S3 with vector search in OpenSearch</span>
                </li>
              </div>

              {/* Expanded content on hover */}
              <div className="mt-6 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-96 transition-all duration-500 overflow-hidden transform group-hover:translate-y-0 translate-y-2">
                <div className="border-t border-gray-400/30 pt-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Detailed Responsibilities:</h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span>Established quality gates with precision, recall, and F1@k plus automated evaluation pipelines to quantify response quality and gate releases</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span>Implemented React.js UI backed by AWS API Gateway microservices and Route 53 routing with health checks and failover</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span>Instrumented with CloudWatch and automated CI/CD delivering a secure, compliant, and production-ready experience</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span>Stored structured data in Amazon RDS (Postgres + pgvector) and created k-NN/FAISS-powered indexes in Amazon OpenSearch</span>
          </li>
                    <li className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span>Designed Retrieval-Augmented Generation (RAG) workflow on AWS Bedrock leveraging foundation models with targeted fine-tuning to reduce hallucinations</span>
          </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* TCS */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="group bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-gray-400/20"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white p-2 flex items-center justify-center">
                    <Image 
                      src="/tata_consultancy_services_logo.jpeg" 
                      alt="Tata Consultancy Services" 
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">Software Engineer</h3>
                    <p className="text-lg text-gray-300 font-semibold">TATA Consultancy Services (TCS)</p>
                    <p className="text-gray-300">Jul 2021 - Jul 2023 • India</p>
                  </div>
                </div>
              </div>
              
              {/* Collapsed content */}
                <div className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-gray-300 mt-1 flex-shrink-0" />
                  <span>Owned backend microservices for e-commerce platform using Spring Boot + MySQL with Swagger-documented REST APIs</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-gray-300 mt-1 flex-shrink-0" />
                  <span>Decomposed legacy monolith into Dockerized services on Kubernetes with HPA autoscaling and rolling updates</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-gray-300 mt-1 flex-shrink-0" />
                  <span>Migrated two on-prem applications to AWS with Organizations, VPC segmentation, and IAM roles</span>
                </li>
              </div>

              {/* Expanded content on hover */}
              <div className="mt-6 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-96 transition-all duration-500 overflow-hidden transform group-hover:translate-y-0 translate-y-2">
                <div className="border-t border-gray-400/30 pt-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Detailed Responsibilities:</h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span>Implemented Kafka event-driven order flows for decoupled, peak-scale operations: order.created, payment.captured|failed, inventory.low_stock, shipment.dispatched|delivered, cart.abandoned</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span>Rehosted Windows servers onto EC2, created golden AMIs and PowerShell user-data scripts for idempotent provisioning and configuration</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span>Handled data pipelines with AWS Glue (Jobs/Workflows + Data Catalog) for ETL and AWS DataBrew for profiling/cleansing/validation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span>Moved data layers to managed services by replicating schemas and data into Amazon RDS and refactoring key workloads to DynamoDB</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span>Designed and validated a pragmatic disaster recovery strategy with multi-AZ foundations, backups and cross-region copies</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span>Implemented architecture using Terraform as IoC, with lambda codes in Python, Glue scripts in PySpark, YAML for SSM docs and maintained version control using GitLab</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span>Maintained least privilege permissions throughout infrastructure implementation and maintenance in all environments (Prod, Staging)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Star className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span>Designed secure VPC connectivity by placing apps in private subnets and routing egress via NAT Gateway, enforced strict port allow-list with SG/NACL rules</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-6 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Education
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Academic foundation in computer science and software engineering
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#0A192F] to-[#0A192F]/90 rounded-2xl p-8 text-white"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-white p-2 flex items-center justify-center">
                    <Image 
                      src="/pennstate_logo.jpeg" 
                      alt="Pennsylvania State University" 
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-2">Master of Science in Computer Science</h3>
                    <p className="text-xl font-semibold text-gray-300">The Pennsylvania State University</p>
                    <p className="text-gray-400">PA, US</p>
                  </div>
                </div>
                <div className="text-right mt-4 md:mt-0">
                  <p className="text-lg font-semibold">GPA: 3.60/4.00</p>
                  <p className="text-gray-400">Aug 2023 - May 2025</p>
                </div>
              </div>
              
              <div className="border-t border-gray-400 pt-6">
                <h4 className="text-lg font-semibold mb-4">Focus Areas:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-gray-400" />
                    <span>Advanced Database Management Systems</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-gray-400" />
                    <span>Advanced Data Structures & Algorithms</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-gray-400" />
                    <span>Machine Learning & AI</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-gray-400" />
                    <span>Operating Systems / Computer Networks</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Skills & Technologies
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A comprehensive toolkit for building modern, scalable applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-400/20"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <skill.icon className="w-6 h-6 text-gray-400" />
                  <h3 className="text-xl font-semibold text-white">
                    {skill.name}
                  </h3>
                </div>
                <div className="space-y-2">
                  {skill.items.map((item) => (
                    <div
                      key={item}
                      className="text-gray-300 text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-6 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Certifications & Achievements
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional certifications and academic achievements
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#0A192F] to-[#0A192F]/90 rounded-xl p-6 text-white text-center"
            >
              <h3 className="text-lg font-semibold mb-2">AWS Solutions Architect</h3>
              <p className="text-white/80 text-sm">Amazon Web Services</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-600 to-gray-500/90 rounded-xl p-6 text-white text-center"
            >
              <h3 className="text-lg font-semibold mb-2">Machine Learning</h3>
              <p className="text-white/80 text-sm">Stanford University</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-500 to-gray-400/90 rounded-xl p-6 text-white text-center"
            >
              <h3 className="text-lg font-semibold mb-2">Best Paper Award</h3>
              <p className="text-white/80 text-sm">ICICC 2025</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800 to-gray-600 rounded-xl p-6 text-white text-center"
            >
              <h3 className="text-lg font-semibold mb-2">IEEE Publication</h3>
              <p className="text-white/80 text-sm">Cloud Summit 2024</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Organizations Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Leadership & Organizations
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Active involvement in tech communities and leadership roles
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#0A192F] to-[#0A192F]/90 rounded-xl p-8 text-white text-center"
            >
              <h3 className="text-2xl font-bold mb-4">Women in Tech</h3>
              <p className="text-lg font-semibold mb-2">Vice-President</p>
              <p className="text-white/80">The Pennsylvania State University</p>
              <p className="text-white/70 text-sm mt-4">Leading initiatives to promote diversity and inclusion in technology</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-600 to-gray-500/90 rounded-xl p-8 text-white text-center"
            >
              <h3 className="text-2xl font-bold mb-4">Adobe Student Ambassador</h3>
              <p className="text-lg font-semibold mb-2">Student Ambassador</p>
              <p className="text-white/80">The Pennsylvania State University</p>
              <p className="text-white/70 text-sm mt-4">Representing Adobe&apos;s creative and digital solutions to the student community</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A showcase of my recent work and personal projects
            </p>
          </motion.div>

          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevProject}
              disabled={currentProjectIndex === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-400/20 text-white transition-all duration-300 ${
                currentProjectIndex === 0 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-700/80 hover:scale-110'
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextProject}
              disabled={currentProjectIndex >= maxIndex}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-400/20 text-white transition-all duration-300 ${
                currentProjectIndex >= maxIndex 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-700/80 hover:scale-110'
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Projects Carousel */}
            <div className="overflow-hidden px-16">
              <motion.div
                className="flex gap-8"
                animate={{ x: -currentProjectIndex * (100 / projectsPerView) + "%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex-shrink-0 w-full lg:w-1/2"
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-400/20 h-full">
                      <div className={`h-48 bg-gradient-to-br ${project.imageBg} flex items-center justify-center relative overflow-hidden`}>
                        {project.imageSrc ? (
                          <div className="w-full h-full flex items-center justify-center">
                            <Image 
                              src={project.imageSrc} 
                              alt={project.title}
                              width={400}
                              height={192}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="text-center text-white/90">
                            <div className="w-20 h-20 mx-auto bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                              <span className="text-4xl">{project.imageIcon}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-3">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-gray-400/20 text-gray-300 text-sm rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-4">
                          {project.github && (
                            <a
                              href={project.github}
                              className="flex items-center gap-2 text-gray-300 hover:text-gray-400 transition-colors"
                            >
                              <Github className="w-4 h-4" />
                              Code
                            </a>
                          )}
                          {project.link && (
                            <a
                              href={project.link}
                              className="flex items-center gap-2 text-gray-300 hover:text-gray-400 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Paper
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProjectIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentProjectIndex 
                      ? 'bg-gray-400 scale-125' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let&apos;s Work Together
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Ready to bring your ideas to life? Let&apos;s discuss your next project!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <MagneticButton>
                <RippleButton
                  asButton={false}
                  href="mailto:sravanimalla07@gmail.com"
                  className="flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-500 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                  Email
                </RippleButton>
              </MagneticButton>
              <MagneticButton>
                <RippleButton
                  asButton={false}
                  href="tel:+17176865861"
                  className="flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-400 text-gray-300 rounded-full font-semibold hover:bg-gray-400 hover:text-gray-900 transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                  Call
                </RippleButton>
              </MagneticButton>
              <MagneticButton>
                <RippleButton
                  asButton={false}
                  href="https://github.com/sravs99-44"
                  className="flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-400 text-gray-300 rounded-full font-semibold hover:bg-gray-400 hover:text-gray-900 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </RippleButton>
              </MagneticButton>
              <MagneticButton>
                <RippleButton
                  asButton={false}
                  href="https://www.linkedin.com/in/sravani-malla/"
                  className="flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-400 text-gray-300 rounded-full font-semibold hover:bg-gray-400 hover:text-gray-900 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </RippleButton>
              </MagneticButton>
              <MagneticButton>
                <RippleButton
                  asButton={false}
                  href="https://leetcode.com/u/sravanimalla1999/"
                  className="flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-400 text-gray-300 rounded-full font-semibold hover:bg-gray-400 hover:text-gray-900 transition-all duration-300"
                >
                  <Leetcode className="w-5 h-5" />
                  Leetcode
                </RippleButton>
              </MagneticButton>
            </div>

            <div className="text-center text-gray-300 mb-8">
              <p className="text-lg font-medium">+1 (717) 686-5861</p>
              <p className="text-sm">sravanimalla07@gmail.com</p>
            </div>

            <div className="text-gray-400">
              <p>© 2024 Sravani Malla. All rights reserved.</p>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  );
}
