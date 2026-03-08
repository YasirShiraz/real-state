import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lock, Mail, X, User, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useData } from '../context/DataContext';
import Logo from './Logo';

interface LoginProps {
    onBack?: () => void;
    onAdminLogin?: () => void;
}

const Login: React.FC<LoginProps> = ({ onBack, onAdminLogin }) => {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { login } = useData();

    const validate = () => {
        if (mode === 'signup' && !name.trim()) return 'Please enter your full name.';
        if (!email.trim()) return 'Please enter your email address.';
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.trim())) return 'Please enter a valid email address.';
        if (!password.trim()) return 'Please enter your password.';
        if (password.length < 6) return 'Password should be at least 6 characters long.';
        return null;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            setSuccess(null);
            return;
        }

        setError(null);
        setIsSubmitting(true);

        // Admin portal shortcut
        if (mode === 'login' && email.trim() === 'admin@gmail.com' && password === 'admin@123') {
            (async () => {
                const ok = await login(password);
                setTimeout(() => {
                    setIsSubmitting(false);
                    if (ok && onAdminLogin) onAdminLogin();
                    else setError('Access Denied: Administrative credentials invalid.');
                }, 1200);
            })();
            return;
        }

        // Normal mock auth
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(mode === 'login' ? 'Authentication successful.' : 'Account created successfully.');
            if (onBack) {
                setTimeout(() => onBack(), 1000);
            }
        }, 1500);
    };

    return (
        <div className="relative min-h-screen w-full bg-[#050505] text-white flex overflow-hidden selection:bg-[var(--gold)] selection:text-black">
            {/* Left Side: Cinematic Narrative */}
            <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden border-r border-white/5">
                <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000"
                        alt="Luxury Estate"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent z-10" />
                </motion.div>

                {/* Animated Branding Overlay */}
                <div className="absolute top-12 left-12 z-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 }}
                    >
                        <Logo isDark={true} className="scale-110 origin-left" />
                    </motion.div>
                </div>

                <div className="absolute bottom-16 left-16 z-20 max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.8 }}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <span className="text-[var(--gold)] text-[10px] font-black uppercase tracking-[0.6em] block">Exclusive Portfolio</span>
                            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.9]">
                                Beyond <br />
                                <span className="italic font-serif font-light opacity-80">Expectation.</span>
                            </h2>
                        </div>
                        <p className="text-white/40 text-base font-medium leading-relaxed max-w-sm">
                            Step into the most exclusive real estate market in the world. Sophistication meets transparency.
                        </p>
                    </motion.div>
                </div>

                {/* Ambient Decorative Elements */}
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--gold)]/10 blur-[120px] pointer-events-none" />
            </div>

            {/* Right Side: High-End Form */}
            <div className="w-full lg:w-[45%] flex flex-col items-center justify-center px-10 py-12 md:px-16 md:py-16 relative bg-[#0a0a0a]">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={onBack}
                    className="absolute top-10 right-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all group z-30"
                >
                    <X size={20} className="text-white/40 group-hover:text-white transition-colors" />
                </motion.button>

                <div className="w-full max-w-[420px] space-y-12">
                    {/* Mobile Logo Only */}
                    <div className="lg:hidden mb-8">
                        <Logo isDark={true} className="scale-75 origin-left" />
                    </div>

                    {/* Header Controls */}
                    <div className="space-y-10">
                        <div className="flex gap-12 border-b border-white/5">
                            {(['login', 'signup'] as const).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setMode(t)}
                                    className={`pb-5 text-[11px] font-black uppercase tracking-[0.4em] transition-all relative ${mode === t ? 'text-white' : 'text-white/20 hover:text-white/40'}`}
                                >
                                    {t === 'login' ? 'Sign In' : 'Register'}
                                    {mode === t && (
                                        <motion.div
                                            layoutId="authTab"
                                            className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[var(--gold)] shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-3">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={mode}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-2">
                                        {mode === 'login' ? 'Welcome' : 'New Access'}
                                    </h1>
                                    <p className="text-white/30 text-sm font-medium tracking-wide">
                                        {mode === 'login'
                                            ? 'Enter your private credentials to continue.'
                                            : 'Initialize your global real estate portal access.'}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5 mb-6">
                        <AnimatePresence mode="wait">
                            {mode === 'signup' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-2 overflow-hidden"
                                >
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Full Name</label>
                                    <div className="relative group">
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-20 group-focus-within:opacity-100 transition-opacity">
                                            <User size={18} className="text-[var(--gold)]" />
                                        </div>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Alexander Knight"
                                            className="w-full bg-white/[0.03] border border-white/5 focus:border-[var(--gold)]/30 rounded-2xl py-5 pr-6 text-sm font-medium transition-all outline-none"
                                            style={{ paddingLeft: '60px' }}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-20 group-focus-within:opacity-100 transition-opacity">
                                    <Mail size={18} className="text-[var(--gold)]" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="private@maestate.com"
                                    className="w-full bg-white/[0.03] border border-white/5 focus:border-[var(--gold)]/30 rounded-2xl py-5 pr-6 text-sm font-medium transition-all outline-none"
                                    style={{ paddingLeft: '60px' }}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Secure Password</label>
                                {mode === 'login' && <button type="button" className="text-[9px] uppercase font-black text-[var(--gold)] hover:text-white transition-colors tracking-widest">Forgot?</button>}
                            </div>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-20 group-focus-within:opacity-100 transition-opacity">
                                    <Lock size={18} className="text-[var(--gold)]" />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full bg-white/[0.03] border border-white/5 focus:border-[var(--gold)]/30 rounded-2xl py-5 pr-6 text-sm font-medium transition-all outline-none"
                                    style={{ paddingLeft: '60px' }}
                                />
                            </div>
                        </div>

                        {/* Status Messages */}
                        <AnimatePresence mode="wait">
                            {(error || success) && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className={`p-4 rounded-xl border text-xs font-bold flex items-center gap-3 ${error ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}
                                >
                                    {error ? <X size={14} /> : <CheckCircle2 size={14} />}
                                    {error || success}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="mt-8">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isSubmitting}
                                className={`w-full py-4 px-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 transition-all duration-300 relative group
                                    ${isSubmitting ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-white text-black hover:bg-[var(--gold)] hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)]'}`}
                            >
                                <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-0.5">
                                    {isSubmitting ? 'Authenticating' : (mode === 'login' ? 'Access Portal' : 'Initialize Account')}
                                </span>
                                {!isSubmitting && <ArrowRight size={15} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />}
                            </motion.button>
                        </div>
                    </form>

                    {/* Footer Utility */}
                    <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3 text-white/20">
                            <ShieldCheck size={16} className="text-[var(--gold)]" />
                            <span className="text-[9px] font-black uppercase tracking-widest">End-to-End Encryption</span>
                        </div>
                        <button
                            onClick={onAdminLogin}
                            className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-[var(--gold)] transition-colors"
                        >
                            Admin Portal
                        </button>
                    </div>
                </div>

                {/* Vertical Decorative Bar */}
                <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[var(--gold)]/30 to-transparent" />
            </div>
        </div>
    );
};

export default Login;
