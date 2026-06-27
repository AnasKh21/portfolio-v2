import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Github = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-github"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-linkedin"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const numParticles = 60;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 2 + 1,
      });
    }

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(251, 111, 146, 0.3)';
        ctx.fill();

        particles.forEach((other) => {
          const dist = Math.hypot(p.x - other.x, p.y - other.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(251, 111, 146, ${0.1 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        });

        const distToMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (distToMouse < 180) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(251, 111, 146, ${0.3 * (1 - distToMouse / 180)})`;
          ctx.stroke();
          
          // Slight repulsion
          p.x += (p.x - mouse.x) * 0.01;
          p.y += (p.y - mouse.y) * 0.01;
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }} />;
};

const FloatingBubble = ({ children, delay = 0, style }) => (
  <motion.div
    style={{
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255, 255, 255, 0.9)',
      border: '1px solid var(--glass-border)',
      borderRadius: '50%',
      boxShadow: '0 8px 32px rgba(251, 111, 146, 0.15)',
      backdropFilter: 'blur(4px)',
      fontWeight: '800',
      color: 'var(--accent)',
      zIndex: 10,
      cursor: 'grab',
      ...style
    }}
    drag
    dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ cursor: 'grabbing', scale: 0.9 }}
    animate={{
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0]
    }}
    transition={{
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
      delay: delay
    }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const revealVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.main 
      className="page-home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <ParticleBackground />

      <div className="home-container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ position: 'relative' }}
        >
          {/* Photo with Floating Bubbles */}
          <motion.div variants={revealVariants} style={{ display: 'flex', justifyContent: 'center', position: 'relative', marginBottom: '2rem' }}>
            
            <FloatingBubble style={{ width: 70, height: 70, top: -20, left: -40, fontSize: '0.9rem' }} delay={0}>
              Python
            </FloatingBubble>
            
            <FloatingBubble style={{ width: 60, height: 60, top: 40, right: -30, fontSize: '0.85rem' }} delay={1}>
              Java
            </FloatingBubble>

            <FloatingBubble style={{ width: 80, height: 80, bottom: -10, left: -60, fontSize: '1.2rem' }} delay={2}>
              IA
            </FloatingBubble>

            <FloatingBubble style={{ width: 65, height: 65, bottom: 20, right: -50, fontSize: '0.9rem' }} delay={1.5}>
              RAG
            </FloatingBubble>

            <div className="hero-photo-wrapper">
              <img src="/anas_photo.jpeg" alt="Anas KHAYAR" />
            </div>
          </motion.div>

          <div className="reveal-mask">
            <motion.h1 variants={revealVariants} className="hero-title-big">
              {t('Ingénieur Logiciel', 'Software Engineer')}
            </motion.h1>
          </div>
          <div className="reveal-mask">
            <motion.h1 variants={revealVariants} className="hero-title-big indent">
              & {t('Architecte IA.', 'AI Architect.')}
            </motion.h1>
          </div>

          <motion.div variants={revealVariants} className="hero-socials" style={{ justifyContent: 'center' }}>
            <motion.a 
              href="https://github.com/AnasKh21" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              whileHover={{ scale: 1.1, rotate: 5, backgroundColor: 'var(--accent)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={24} />
            </motion.a>
            <motion.a 
              href="https://linkedin.com/in/anas-khayar-7004ab2bb/fr/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BI8iyn%2FriSFmNTiyZRS03TQ%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              whileHover={{ scale: 1.1, rotate: -5, backgroundColor: 'var(--accent)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={24} />
            </motion.a>
          </motion.div>

          <motion.div variants={revealVariants} className="hero-actions">
            <button 
              onClick={() => navigate('/parcours/pro')} 
              className="btn-primary magnetic"
            >
              {t('Explorer le parcours', 'Explore Experience')}
            </button>
            <a 
              href="https://agent-portfolio-446682453018.europe-west1.run.app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary magnetic"
            >
              {t("Discuter avec l'Agent", "Chat with my AI Agent")}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  );
}
