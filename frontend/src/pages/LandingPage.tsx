import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/Button';
import { ArrowRight, Shield, Brain, MessageSquare, TrendingUp, Users, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import GreenMotion from '../Assets/GREEN_MOTION.mp4';

export function LandingPage() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  
  const rotatingTexts = ["AI Guidance", "Scheme Navigation", "Agentic workflow"];
  const totalItems = rotatingTexts.length;

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % totalItems);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, totalItems]);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Header />
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-40">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/10 blur-[100px] rounded-full opacity-20 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          
          <h1 className="hero-title text-white mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Smarter Business
            Decisions with 
            <span 
              ref={containerRef}
              className="scroll-container cursor-pointer"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <span 
                className="scroll-text"
                style={{ transform: `translateY(-${index * 1.5}em)` }}
              >
                {rotatingTexts.map((text, i) => (
                  <span 
                    key={i} 
                    className="scroll-item text-[#00FFB2]"
                  >
                    {text}
                  </span>
                ))}
              </span>
            </span>
          </h1>
          
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Discover government programs, get personalized business advice, and navigate growth with our specialized AI agents.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Link to="/chat">
                <button className="btn-modern-glow w-full sm:w-auto">
                Start Free Trial <ArrowRight className="inline-block ml-2 w-6 h-5" />
                </button>
            </Link>
            <Button variant="ghost" size="lg" className="w-full sm:w-auto btn-glow">
              View Demo
            </Button>
          </div>

          {/* Hero Visual */}
          <div className="mt-20 relative animate-in fade-in zoom-in duration-1000 delay-500">
            <div className="glass-panel p-2 rounded-2xl max-w-5xl mx-auto shadow-2xl shadow-primary/10 border border-white/10 overflow-hidden">
               <video 
                 autoPlay 
                 loop 
                 muted 
                 playsInline
                 className="rounded-xl w-full h-auto opacity-80"
               >
                 <source src={GreenMotion} type="video/mp4" />
                 Your browser does not support the video tag.
               </video>
               {/* Overlay Gradients */}
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent h-full w-full rounded-2xl pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROP SECTION */}
      <section className="py-48 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard 
              icon={<Shield className="w-8 h-8 text-primary" />}
              title="Scheme Navigator"
              desc="Find relevant government programs in seconds with instant eligibility checks."
            />
            <ValueCard 
              icon={<Brain className="w-8 h-8 text-secondary" />}
              title="Smart Agents"
              desc="4 specialized agents for branding, marketing, finance, and research."
            />
            <ValueCard 
              icon={<MessageSquare className="w-8 h-8 text-primary" />}
              title="Modern Chat"
              desc="Clean, WhatsApp-like interface with history and quick actions."
            />
          </div>
        </div>
      </section>

      {/* 3. FEATURE BLOCKS */}
      <section id="features" className="py-48 bg-black relative">
        <div className="container mx-auto px-6">
          {/* Feature 1 */}
          <div className="flex flex-col md:flex-row items-center gap-24 mb-48">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full" />
                <div className="glass-panel p-8 rounded-3xl relative z-10 border border-white/10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">1</div>
                            <div>
                                <h4 className="font-bold">PMEGP Scheme</h4>
                                <p className="text-xs text-text-secondary">Subsidy up to 35%</p>
                            </div>
                            <div className="ml-auto text-primary text-sm">95% Match</div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 opacity-60">
                            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">2</div>
                            <div>
                                <h4 className="font-bold">Mudra Loan</h4>
                                <p className="text-xs text-text-secondary">Up to 10 Lakhs</p>
                            </div>
                            <div className="ml-auto text-secondary text-sm">82% Match</div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Find the right schemes <br />
                <span className="text-primary">in seconds.</span>
              </h2>
              <p className="text-text-secondary text-lg">
                Stop searching through endless government websites. Our AI analyzes your business profile and matches you with the top 3-5 schemes you're actually eligible for.
              </p>
              <ul className="space-y-4">
                {['Instant Eligibility Check', 'Direct Application Links', 'Document Checklist'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="w-5 h-5 text-primary" /> {item}
                  </li>
                ))}
              </ul>
              <Button>Try Scheme Finder</Button>
            </div>
          </div>

          {/* Feature 2 (Alternating) */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-24">
            <div className="flex-1">
               <div className="relative">
                <div className="absolute inset-0 bg-secondary/20 blur-[80px] rounded-full" />
                 <div className="grid grid-cols-2 gap-4 relative z-10">
                    <AgentCard icon={<Users />} title="Market Agent" color="text-blue-400" />
                    <AgentCard icon={<Brain />} title="Brand Agent" color="text-purple-400" />
                    <AgentCard icon={<TrendingUp />} title="Finance Agent" color="text-green-400" />
                    <AgentCard icon={<MessageSquare />} title="Marketing Agent" color="text-orange-400" />
                 </div>
               </div>
            </div>
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Your Personal Board <br />
                <span className="text-secondary">of Advisors.</span>
              </h2>
              <p className="text-text-secondary text-lg">
                Get expert advice on branding, marketing, finance, and market research. Our multi-agent system routes your query to the right specialist.
              </p>
              <ul className="space-y-4">
                {['Competitor Analysis', 'Brand Name Generation', 'Low-budget Marketing Ideas'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="w-5 h-5 text-secondary" /> {item}
                  </li>
                ))}
              </ul>
              <Button variant="secondary">Meet the Agents</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. METRICS */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32">
                <Metric number="10,000+" label="Queries Answered" />
                <Metric number="95%" label="User Satisfaction" />
                <Metric number="₹50Cr+" label="Loans Facilitated" />
            </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-black opacity-50" />
        <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white">
                Make smarter <br/> business decisions.
            </h2>
            <p className="text-xl text-text-secondary mb-12">No credit card required. Start growing today.</p>
            <Link to="/chat">
                <button className="btn-modern-glow px-12">Start Free</button>
            </Link>
        </div>
      </section>

      <Footer />
      <GlitchFooter />
    </div>
  );
}

/**
 * GlitchFooter Component
 * 
 * Implements a refined, targeted glitch effect with localized cursor tracking.
 * - Effect Scope: 100x100px area (50px radius mask)
 * - Motion: 200ms delayed tracking with 10px offset and ease-out
 * - Animation: 0.5Hz frequency, max 5px displacement, 300ms transitions
 * - Visuals: Subtle RGB split, noise texture, brightness fluctuations
 */
function GlitchFooter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: -1000, y: -1000 });
  const [targetPos, setTargetPos] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);
  const [scrollIntensity, setScrollIntensity] = useState(0);
  const requestRef = useRef<number>();
  const lastScrollY = useRef(0);

  // Handle scroll-based intensity
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY.current);
      setScrollIntensity(Math.min(delta / 50, 1)); // Scale intensity based on scroll speed
      lastScrollY.current = currentScrollY;
      
      // Decay intensity
      setTimeout(() => setScrollIntensity(0), 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Canvas-based pixel glitch effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const pixelSize = 4;
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Always have a base intensity of 0.2, increase on hover or scroll
      const intensity = Math.max(0.2, isHovering ? 0.8 : scrollIntensity);
      const cols = Math.ceil(canvas.width / pixelSize);
      const rows = Math.ceil(canvas.height / pixelSize);

      for (let i = 0; i < 100 * intensity; i++) {
        const x = Math.floor(Math.random() * cols) * pixelSize;
        const y = Math.floor(Math.random() * rows) * pixelSize;
        const w = pixelSize * (Math.random() > 0.8 ? 4 : 1);
        const h = pixelSize;

        ctx.fillStyle = Math.random() > 0.5 ? '#00FFB2' : '#00C9FF';
        ctx.globalAlpha = Math.random() * 0.4 * intensity;
        ctx.fillRect(x, y, w, h);
      }

      animationId = requestAnimationFrame(render);
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', resize);
    resize();
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [isHovering, scrollIntensity]);

  // Smooth cursor tracking with delay and easing
  useEffect(() => {
    const updatePosition = (time: number) => {
      if (!isHovering) return;

      const easing = 0.15; // Ease-out factor
      const offset = 10; // 10px offset

      setCursorPos(prev => {
        const dx = (targetPos.x + offset) - prev.x;
        const dy = (targetPos.y + offset) - prev.y;
        
        return {
          x: prev.x + dx * easing,
          y: prev.y + dy * easing
        };
      });

      requestRef.current = requestAnimationFrame(updatePosition);
    };

    if (isHovering) {
      requestRef.current = requestAnimationFrame(updatePosition);
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isHovering, targetPos]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setTargetPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setCursorPos({ x: -1000, y: -1000 });
        setTargetPos({ x: -1000, y: -1000 });
      }}
      className="w-full bg-emerald-500 py-0 flex items-center justify-center overflow-hidden group cursor-default border-t border-black/5 relative"
      style={{
        '--cursor-x': `${cursorPos.x}px`,
        '--cursor-y': `${cursorPos.y}px`,
        '--glitch-radius': '120px',
        '--pixel-distort': isHovering ? '4px' : '0px',
      } as React.CSSProperties}
    >
      {/* Background Pixel Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
      />

      <div className="relative w-full h-[32vw] md:h-[28vw] flex items-center justify-center pointer-events-none">
        {/* Glitch Layers - Behind the main text - Always Visible */}
        <div className={`absolute inset-0 z-10 glitch-transition opacity-100`}>
          {/* Enhanced RGB Split - Red */}
          <h1 className="absolute inset-0 text-[32vw] font-[1000] text-white-500/40 leading-[0.7] tracking-[-0.08em] select-none w-full text-center animate-rgb-split-r animate-matrix-glitch-1">
            MAYA
          </h1>
          {/* Enhanced RGB Split - Blue */}
          <h1 className="absolute inset-0 text-[32vw] font-[1000] text-white-500/40 leading-[0.7] tracking-[-0.08em] select-none w-full text-center animate-rgb-split-b animate-matrix-glitch-2">
            MAYA
          </h1>
          
          {/* Additional Pixelated Distort Layer */}
          <div className="absolute inset-0 flex items-center justify-center animate-pixel-move">
            <h1 className="text-[32vw] font-[1000] text-primary/20 leading-[0.7] tracking-[-0.08em] select-none w-full text-center">
              MAYA
            </h1>
          </div>
        </div>

        {/* Base Layer - Static Black MAYA - Always on Top for readability */}
        <h1 className="text-[32vw] font-[1000] text-black leading-[0.7] tracking-[-0.08em] select-none relative z-20 w-full text-center">
          MAYA
        </h1>

        {/* Overlays - Above everything - Always Visible */}
        <div className={`absolute inset-0 z-30 pointer-events-none glitch-transition opacity-100`}>
          {/* Enhanced Noise Texture Overlay */}
          <div className="absolute inset-0 opacity-15 mix-blend-overlay animate-noise-jitter bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
          
          {/* Enhanced Scanline */}
          <div className="absolute h-[20%] w-full bg-black/5 blur-sm animate-scanline-move" />
        </div>

        {/* CRT Mesh - Always Visible */}
        <div className={`absolute inset-0 z-40 bg-[radial-gradient(rgba(0,0,0,0.15)_0.5px,transparent_0.5px)] bg-[length:4px_4px] glitch-transition opacity-100`} />
      </div>
    </div>
  );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="glass-panel p-8 rounded-2xl hover:bg-white/5 transition-all duration-500 group relative overflow-hidden border border-white/5 hover:border-primary/40 hover:-translate-y-1 shadow-2xl hover:shadow-primary/10">
      {/* Abstract Glow Background - Always moving */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-20 group-hover:opacity-50 transition-opacity duration-700">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,255,178,0.15)_0%,transparent_70%)] animate-glow-slow" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,201,255,0.1)_0%,transparent_70%)] animate-glow-slow [animation-delay:-5s]" />
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300 border border-white/5 group-hover:border-primary/20 group-hover:bg-primary/10 group-hover:shadow-[0_0_20px_rgba(0,255,178,0.2)]">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-text-secondary leading-relaxed group-hover:text-white/90 transition-colors duration-300">{desc}</p>
      </div>
    </div>
  );
}

function AgentCard({ icon, title, color }: { icon: React.ReactNode, title: string, color: string }) {
    return (
        <div className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center gap-4 hover:-translate-y-2 transition-transform duration-300">
            <div className={`p-3 rounded-full bg-white/5 ${color}`}>{icon}</div>
            <span className="font-medium text-white">{title}</span>
        </div>
    )
}

function Metric({ number, label }: { number: string, label: string }) {
    return (
        <div className="flex flex-col items-center text-center">
            <div className="metric-number mb-1">{number}</div>
            <div className="text-[10px] md:text-xs font-medium text-white/40 uppercase tracking-[0.2em]">{label}</div>
        </div>
    )
}
