import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Home, BookOpen, Compass, Library, User,
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import './App.css';

/* ═══════════════════════════════════════════
   COLOR PALETTE (from your reference)
   #050505 void  |  #111111 ink  |  #7A3A14 ember
   #C96A1B flame |  #F2B35C gold |  #6E7074 ash
   #B7B0C7 mist  |  #F5F1EA cream
   ═══════════════════════════════════════════ */

/* ───── Ambient Particles Background ───── */
function AmbientParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 6 + Math.random() * 6,
    size: 1 + Math.random() * 2,
    opacity: 0.1 + Math.random() * 0.4,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: `rgba(242, 179, 92, ${p.opacity})`,
            boxShadow: `0 0 ${p.size * 3}px rgba(242, 179, 92, ${p.opacity * 0.5})`,
          }}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

/* ───── Loading Screen ───── */
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + 1.5;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Circular progress */}
      <div className="relative w-32 h-32 mb-8">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(242,179,92,0.08)" strokeWidth="1.5" />
          <circle
            cx="60" cy="60" r="54" fill="none" stroke="#F2B35C" strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.1s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl text-gold">{Math.floor(progress)}%</span>
        </div>
      </div>
      <p className="font-serif italic text-sm text-gold/40 tracking-wide">Awakening...</p>
    </motion.div>
  );
}

/* ───── Navigation ───── */
function Navigation({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const items = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'read', label: 'READ', icon: BookOpen },
    { id: 'explore', label: 'EXPLORE', icon: Compass },
    { id: 'library', label: 'LIBRARY', icon: Library },
    { id: 'profile', label: 'PROFILE', icon: User },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center gap-2 md:gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                isActive
                  ? 'text-gold bg-gold/10'
                  : 'text-cream/40 hover:text-gold/70 hover:bg-white/[0.02]'
              }`}
            >
              <Icon size={15} strokeWidth={1.5} />
              <span className="font-display text-[10px] tracking-[0.2em] hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ───── Hero Section ───── */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(201,106,27,0.2) 0%, rgba(122,58,20,0.08) 40%, transparent 70%)' }} />
      </div>

      <motion.div style={{ opacity, y }} className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Chapter label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-display text-[10px] tracking-[0.4em] text-gold/50 mb-6"
        >
          II : THE AWAKENING — ATMOSPHERIC ARC
        </motion.p>

        {/* Sufi figure with double rounded frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-10"
        >
          {/* Outer glow */}
          <div className="absolute inset-0 gold-glow rounded-[2.5rem] animate-pulse-glow" />

          {/* Double frame */}
          <div className="frame-double">
            <div className="relative w-64 h-[22rem] sm:w-72 sm:h-[26rem] rounded-[1.4rem] overflow-hidden">
              <img
                src="/images/sufi-hero.png"
                alt="The Sufi"
                className="w-full h-full object-cover object-top"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-void/30" />
            </div>
          </div>

          {/* Corner dots */}
          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full bg-gold/50" />
          <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-gold/50" />
          <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 rounded-full bg-gold/50" />
          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 rounded-full bg-gold/50" />
        </motion.div>

        {/* 11:11 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-display text-6xl sm:text-7xl md:text-8xl text-gold text-glow-gold tracking-[0.15em] mb-4"
        >
          11:11
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="font-serif italic text-lg sm:text-xl text-cream/70 mb-2"
        >
          The Awakening
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="font-serif italic text-sm text-cream/40 max-w-xs mb-10"
        >
          &ldquo;You were never meant to fit in. You were born to awaken.&rdquo;
        </motion.p>

        {/* Ornament divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="divider-ornament w-48 mb-8"
        />

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex gap-4"
        >
          <button className="btn-primary">ENTER</button>
          <button className="btn-ghost">EXPLORE</button>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ───── Three Act Arc ───── */
function ThreeActArc() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeArc, setActiveArc] = useState<number | null>(null);

  const acts = [
    {
      title: 'THE DESCENT',
      chapters: 'Chapters 1 — 11',
      desc: 'Wind over a single cello. Ney as breath. A heartbeat with no rhythm.',
      keyword: 'DISSOLUTION',
      bg: 'radial-gradient(circle at 50% 60%, rgba(17,25,40,0.5) 0%, transparent 60%)',
      circleColor: 'rgba(17,25,40,0.3)',
      borderColor: 'rgba(183,176,199,0.15)',
    },
    {
      title: 'THE MIRROR',
      chapters: 'Chapters 12 — 22',
      desc: 'Glass harmonics. The cello doubled, denied against itself. Metallic reverb.',
      keyword: 'RECOGNITION',
      bg: 'radial-gradient(circle at 50% 60%, rgba(110,112,116,0.2) 0%, transparent 60%)',
      circleColor: 'rgba(110,112,116,0.15)',
      borderColor: 'rgba(183,176,199,0.2)',
    },
    {
      title: 'THE ASCENSION',
      chapters: 'Chapters 23 — 33',
      desc: 'The full Sufi ensemble. Daf in rhythm. Ney soaring. A voice, at last.',
      keyword: 'AWAKENING',
      bg: 'radial-gradient(circle at 50% 60%, rgba(201,106,27,0.25) 0%, rgba(242,179,92,0.1) 40%, transparent 70%)',
      circleColor: 'rgba(242,179,92,0.15)',
      borderColor: 'rgba(242,179,92,0.25)',
    },
  ];

  return (
    <section id="explore" ref={ref} className="relative py-32 md:py-40 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="font-display text-[10px] tracking-[0.4em] text-gold/40 mb-4">THE JOURNEY</p>
          <h2 className="font-display text-2xl md:text-3xl text-cream/90 tracking-[0.1em]">Atmospheric Arc</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {acts.map((act, i) => (
            <motion.div
              key={act.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center py-12 px-6 cursor-pointer group"
              onMouseEnter={() => setActiveArc(i)}
              onMouseLeave={() => setActiveArc(null)}
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{ background: act.bg, opacity: activeArc === i ? 1 : 0.5 }}
              />

              <p className="font-display text-[9px] tracking-[0.5em] text-cream/30 mb-6 relative z-10">
                ACT {['ONE', 'TWO', 'THREE'][i]}
              </p>

              <h3 className="font-display text-xl md:text-2xl text-cream/90 tracking-[0.12em] mb-3 relative z-10 group-hover:text-gold transition-colors duration-500">
                {act.title}
              </h3>

              <p className="font-body text-[10px] text-cream/30 tracking-wide mb-8 relative z-10">{act.chapters}</p>

              {/* Center circle */}
              <div
                className="w-16 h-16 rounded-full mb-8 relative z-10 transition-all duration-500 group-hover:scale-110"
                style={{
                  background: act.circleColor,
                  border: `1px solid ${act.borderColor}`,
                  boxShadow: activeArc === i ? `0 0 30px ${act.circleColor}` : 'none',
                }}
              />

              <p className="font-serif italic text-xs text-cream/35 leading-relaxed max-w-[200px] mb-6 relative z-10">
                {act.desc}
              </p>

              <div className="divider-ornament w-24 mb-4 relative z-10" />

              <p className="font-display text-[10px] tracking-[0.3em] text-gold/40 relative z-10">{act.keyword}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── Chapter Preview ───── */
function ChapterPreview({
  romanNum, numeral, movement, movementTitle, title,
  lines, quote, reflectionPrompt, prevChapter, nextChapter,
  trackName
}: {
  romanNum: string; numeral: string; movement: string; movementTitle: string;
  title: string; lines: string[]; quote: string; reflectionPrompt: string;
  prevChapter: string; nextChapter: string; trackName: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="read" ref={ref} className="relative py-32 md:py-40 overflow-hidden">
      {/* Side light beams */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-gold/5 to-transparent" />
        <div className="absolute top-0 right-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-gold/5 to-transparent" />
      </div>

      <div className="relative max-w-2xl mx-auto px-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-16"
        >
          <div className="flex items-center gap-4">
            <span className="font-display text-3xl md:text-4xl text-gold/80 tracking-wider">{romanNum}</span>
            <div className="h-8 w-[1px] bg-gold/20" />
            <div className="text-left">
              <p className="font-display text-[8px] tracking-[0.3em] text-cream/30">{movement}</p>
              <p className="font-serif italic text-sm text-cream/50">{movementTitle}</p>
            </div>
          </div>
          <span className="font-display text-xs text-cream/20">{numeral}</span>
        </motion.div>

        {/* Chapter number large */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl sm:text-6xl md:text-7xl text-gold text-glow-gold tracking-[0.1em] mb-12"
        >
          {romanNum}
        </motion.h2>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-serif italic text-xl text-cream/60 mb-16"
        >
          {title}
        </motion.p>

        {/* Lines */}
        <div className="space-y-4 mb-16">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`font-serif italic text-lg md:text-xl leading-relaxed ${i % 2 === 0 ? 'text-gold/70' : 'text-cream/60'}`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Chapter label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-[9px] tracking-[0.4em] text-cream/25 mb-6"
        >
          CHAPTER {romanNum} · {title.toUpperCase().replace(/ /g, ' ')}
        </motion.p>

        {/* Ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          className="divider-ornament w-40 mx-auto mb-16"
        />

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-serif italic text-sm text-gold/50 mb-2">— {quote}</p>
        </motion.div>

        {/* Reflection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 md:p-10"
        >
          <p className="font-display text-[9px] tracking-[0.4em] text-cream/30 mb-4">PAUSE · REFLECT</p>
          <p className="font-serif italic text-lg text-cream/70 mb-6">{reflectionPrompt}</p>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-4" />
          <p className="font-serif italic text-xs text-cream/25">The first thought that crossed your mind...</p>
        </motion.div>

        {/* Chapter navigation */}
        <div className="flex items-center justify-between mt-16 text-[10px] font-display tracking-[0.2em] text-cream/25">
          <span className="hover:text-gold/50 cursor-pointer transition-colors flex items-center gap-2">
            <ChevronLeft size={12} /> {prevChapter}
          </span>
          <span className="hover:text-gold/50 cursor-pointer transition-colors flex items-center gap-2">
            {nextChapter} <ChevronRight size={12} />
          </span>
        </div>
      </div>

      {/* Audio track name */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-6">
        <div className="glass rounded-full px-5 py-2 flex items-center gap-3">
          <Play size={12} className="text-gold/60" />
          <span className="font-display text-[9px] tracking-[0.2em] text-cream/40">{trackName}</span>
        </div>
      </div>
    </section>
  );
}

/* ───── Quote Section ───── */
function QuoteSection() {
  return (
    <section id="library" className="relative py-32 md:py-40 flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(201,106,27,0.15) 0%, transparent 60%)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-lg mx-auto px-6 text-center"
      >
        <span className="font-display text-5xl text-gold/15 block mb-4">&ldquo;</span>
        <p className="font-serif italic text-xl md:text-2xl text-cream/70 leading-relaxed mb-6">
          The mind is a prison only if you don&apos;t know you hold the key.
        </p>
        <div className="divider-ornament w-32 mx-auto mb-6" />
        <p className="font-display text-[10px] tracking-[0.3em] text-cream/30">— THE AWAKENING</p>
      </motion.div>
    </section>
  );
}

/* ───── Audio Player (Fixed Bottom) ───── */
function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(35);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.3));
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="glass rounded-2xl overflow-hidden">
        {/* Progress bar */}
        <div className="h-[2px] bg-cream/5 cursor-pointer group">
          <div className="h-full bg-gradient-to-r from-flame to-gold relative" style={{ width: `${progress}%` }}>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-3">
          {/* Album art */}
          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
            <img src="/images/sufi-hero.png" alt="" className="w-full h-full object-cover" />
          </div>

          {/* Track info */}
          <div className="flex-1 min-w-0">
            <p className="font-display text-[10px] tracking-[0.15em] text-cream/70 truncate">The Awakening</p>
            <p className="font-body text-[9px] text-cream/30 truncate">Chapter 3</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button className="w-7 h-7 flex items-center justify-center text-cream/30 hover:text-gold transition-colors">
              <SkipBack size={14} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center hover:bg-gold/25 transition-colors"
            >
              {isPlaying ? <Pause size={14} className="text-gold" /> : <Play size={14} className="text-gold ml-0.5" />}
            </button>
            <button className="w-7 h-7 flex items-center justify-center text-cream/30 hover:text-gold transition-colors">
              <SkipForward size={14} />
            </button>
          </div>

          {/* Waveform (visible on hover) */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 60 }}
                exit={{ opacity: 0, width: 0 }}
                className="hidden sm:flex items-center gap-[2px] overflow-hidden"
              >
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-[2px] rounded-full bg-gold/40"
                    animate={{
                      height: isPlaying ? [4, 12 + Math.random() * 12, 4] : 4,
                    }}
                    transition={{
                      duration: 0.5 + Math.random() * 0.5,
                      repeat: Infinity,
                      delay: i * 0.05,
                    }}
                    style={{ height: 4 }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Volume */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-7 h-7 flex items-center justify-center text-cream/30 hover:text-gold transition-colors"
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ───── Footer ───── */
function Footer() {
  return (
    <footer id="profile" className="relative py-20 pb-32">
      <div className="max-w-md mx-auto px-6 text-center">
        <div className="divider-ornament w-full mb-10" />
        <p className="font-display text-2xl text-gold/20 tracking-[0.2em] mb-4">11:11</p>
        <p className="font-serif italic text-xs text-cream/25 mb-8">
          The Dark Side of An Enlightened Sufi&apos;s Mind
        </p>
        <div className="flex justify-center gap-6 text-[10px] font-display tracking-[0.2em] text-cream/20">
          <span className="hover:text-gold/50 cursor-pointer transition-colors">TWITTER</span>
          <span className="hover:text-gold/50 cursor-pointer transition-colors">INSTAGRAM</span>
          <span className="hover:text-gold/50 cursor-pointer transition-colors">BEHANCE</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'read', 'explore', 'library', 'profile'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-void text-cream selection:bg-gold/25">
      <AmbientParticles />

      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navigation active={activeSection} />

          <HeroSection />

          <ThreeActArc />

          {/* Chapter VII Preview */}
          <ChapterPreview
            romanNum="VII"
            numeral="07"
            movement="MOVEMENT II · THE ASCENSION"
            movementTitle="The Trapped"
            title="The Trapped"
            lines={[
              "I have never thought of you!",
              "How are you on my mind?",
            ]}
            quote="Can you hear me? I want back my wings!"
            reflectionPrompt="What did you feel?"
            prevChapter="VI  THE EYES"
            nextChapter="VIII  THE DAYDREAM"
            trackName="TREMBLING  BREATH + TABLA"
          />

          <QuoteSection />

          {/* Chapter XXIV Preview */}
          <ChapterPreview
            romanNum="XXIV"
            numeral="24"
            movement="MOVEMENT V · THE RETURN"
            movementTitle="The Trapped"
            title="The Return"
            lines={[
              "Call me back to you whenever you want",
              "Call me back, calm me, it's whatever you want",
            ]}
            quote="I was finally given my freedom — I had never felt this way before"
            reflectionPrompt="What did you feel?"
            prevChapter="VI  THE EYES"
            nextChapter="XXVI  THE DAYDREAM"
            trackName="TRIUMPHANT  NEY + BELL"
          />

          <Footer />

          <AudioPlayer />
        </>
      )}
    </div>
  );
}
