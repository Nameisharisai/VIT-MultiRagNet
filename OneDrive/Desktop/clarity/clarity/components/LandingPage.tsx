import React, { useEffect, useRef, useState } from 'react';

interface LandingPageProps {
  onEnter: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    { 
      icon: '🎯', 
      title: 'Pattern-Based Learning', 
      desc: 'Master 15+ DSA patterns with structured learning paths',
      stat: '100+',
      statLabel: 'LeetCode Problems'
    },
    { 
      icon: '🧠', 
      title: 'AI-Powered Teaching', 
      desc: 'Get personalized explanations and adaptive challenges',
      stat: '∞',
      statLabel: 'Practice Sessions'
    },
    { 
      icon: '📊', 
      title: 'Progress Tracking', 
      desc: 'XP system, streaks, and visual learning paths',
      stat: '15+',
      statLabel: 'Learning Patterns'
    },
    { 
      icon: '💼', 
      title: 'Interview Ready', 
      desc: 'STAR method, technical discussions, and more',
      stat: '50+',
      statLabel: 'Company Tags'
    },
  ];

  const stats = [
    { value: '100+', label: 'LeetCode Problems' },
    { value: '15+', label: 'DSA Patterns' },
    { value: '12+', label: 'Aptitude Topics' },
    { value: '8+', label: 'Communication Frameworks' },
  ];

  const companies = ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Apple', 'Bloomberg', 'LinkedIn', 'Uber', 'Goldman Sachs', 'Netflix'];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Canvas animation for background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    let frame: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(16, 12, 8, 0.1)';
      ctx.fillRect(0, 0, w, h);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(178, 190, 181, ${p.alpha})`;
        ctx.fill();

        // Draw connections
        particles.forEach((p2, j) => {
          if (i >= j) return;
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(178, 190, 181, ${0.1 * (1 - dist / 120)})`;
            ctx.stroke();
          }
        });
      });

      frame = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#100C08] text-white overflow-hidden relative">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-60" />

      {/* Gradient Overlays */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#B2BEB5]/5 to-transparent z-0"></div>
      <div className="fixed bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-[#100C08] to-transparent z-10"></div>

      {/* Content */}
      <div className="relative z-20">
        {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#B2BEB5] to-[#8A9A8D] rounded-xl flex items-center justify-center">
                <span className="text-black font-black text-lg">C</span>
              </div>
              <span className="text-xl font-bold tracking-[0.2em] uppercase">Clarity</span>
            </div>
            <div className="flex items-center gap-8">
              <span className="text-[10px] uppercase tracking-widest text-[#475569] font-bold hidden md:block">SDE Interview Prep</span>
              <button 
                onClick={onEnter}
                className="px-6 py-2.5 bg-[#B2BEB5] text-black text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-all"
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
          <div className={`text-center max-w-5xl transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#B2BEB5]/10 border border-[#B2BEB5]/20 rounded-full mb-8">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] uppercase tracking-widest text-[#B2BEB5] font-bold">AI-Powered Learning Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
              <span className="text-white">Master DSA</span>
              <br />
              <span className="text-[#B2BEB5]">Like Never Before</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-[#94a3b8] max-w-2xl mx-auto mb-12 leading-relaxed">
              A comprehensive interview preparation platform with <span className="text-[#B2BEB5] font-semibold">pattern-based learning</span>, 
              real LeetCode problems, and AI-powered teaching for DSA, Aptitude, and Communication skills.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button 
                onClick={onEnter}
                className="px-10 py-4 bg-[#B2BEB5] text-black text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-all shadow-lg shadow-[#B2BEB5]/20 hover:shadow-[#B2BEB5]/40"
              >
                Start Learning Free →
              </button>
              <button className="px-10 py-4 border border-white/10 text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:border-[#B2BEB5] hover:text-[#B2BEB5] transition-all">
                View SDE Sheet
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, i) => (
                <div key={i} className={`transition-all duration-700 delay-${500 + i * 100} ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="text-3xl md:text-4xl font-bold text-[#B2BEB5] mb-1">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-[#475569] font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-white/40 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#B2BEB5] font-bold mb-4 block">Why Clarity?</span>
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                Built for <span className="text-[#B2BEB5]">Real Results</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <div 
                  key={i}
                  className={`p-8 rounded-2xl border transition-all duration-500 cursor-pointer ${
                    activeFeature === i 
                      ? 'bg-[#B2BEB5]/10 border-[#B2BEB5]/50 scale-105' 
                      : 'bg-[#1C1C1C]/50 border-white/5 hover:border-white/20'
                  }`}
                  onMouseEnter={() => setActiveFeature(i)}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#475569] mb-6">{feature.desc}</p>
                  <div className="pt-4 border-t border-white/5">
                    <div className="text-2xl font-bold text-[#B2BEB5]">{feature.stat}</div>
                    <div className="text-[9px] uppercase tracking-widest text-[#475569]">{feature.statLabel}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Path Section */}
        <section className="py-32 px-6 bg-gradient-to-b from-transparent via-[#1C1C1C]/30 to-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-[10px] uppercase tracking-[0.4em] text-amber-500 font-bold mb-4 block">Complete SDE Sheet</span>
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4">
                Structured <span className="text-amber-500">Learning Path</span>
              </h2>
              <p className="text-[#475569] max-w-xl mx-auto">From Arrays to Advanced Graphs - a complete roadmap with 100+ handpicked problems</p>
            </div>

            <div className="relative">
              {/* Path visualization */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { level: 'Foundation', patterns: ['Arrays & Strings', 'Two Pointers', 'Hashing'], color: 'emerald' },
                  { level: 'Intermediate', patterns: ['Sliding Window', 'Binary Search', 'Linked Lists', 'Stacks & Queues', 'Trees'], color: 'amber' },
                  { level: 'Advanced', patterns: ['Heaps', 'Backtracking', 'Dynamic Programming', 'Graphs'], color: 'rose' },
                ].map((section, i) => (
                  <div key={i} className="relative">
                    <div className={`p-6 rounded-2xl bg-[#1C1C1C]/50 border border-${section.color}-500/20`}>
                      <div className={`inline-block px-3 py-1 bg-${section.color}-500/10 text-${section.color}-500 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4`}>
                        {section.level}
                      </div>
                      <div className="space-y-3">
                        {section.patterns.map((pattern, j) => (
                          <div key={j} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                            <div className={`w-2 h-2 rounded-full bg-${section.color}-500`}></div>
                            <span className="text-sm font-medium text-white">{pattern}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {i < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[2px] bg-white/10"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Company Tags Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#475569] font-bold">Problems from top companies</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {companies.map((company, i) => (
                <div 
                  key={i}
                  className="px-6 py-3 bg-[#1C1C1C]/50 border border-white/5 rounded-full text-sm font-medium text-[#94a3b8] hover:border-[#B2BEB5]/30 hover:text-white transition-all cursor-default"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6">
              Ready to <span className="text-[#B2BEB5]">Level Up?</span>
            </h2>
            <p className="text-lg text-[#475569] mb-12 max-w-xl mx-auto">
              Join thousands of developers preparing for their dream job with Clarity's structured approach.
            </p>
            <button 
              onClick={onEnter}
              className="px-12 py-5 bg-gradient-to-r from-[#B2BEB5] to-[#8A9A8D] text-black text-sm font-bold uppercase tracking-widest rounded-xl hover:from-white hover:to-[#B2BEB5] transition-all shadow-lg shadow-[#B2BEB5]/20"
            >
              Start Your Journey →
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#B2BEB5] to-[#8A9A8D] rounded-lg flex items-center justify-center">
                <span className="text-black font-black text-sm">C</span>
              </div>
              <span className="text-sm font-bold tracking-widest uppercase">Clarity</span>
            </div>
            <div className="text-[10px] text-[#475569] uppercase tracking-widest font-bold">
              Built for Engineers, by Engineers
            </div>
          </div>
        </footer>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
};
