import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lock, Mail, X, User, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';

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
        if (mode === 'signup' && !name.trim()) {
            return 'Please enter your full name.';
        }

        if (!email.trim()) {
            return 'Please enter your email address.';
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.trim())) {
            return 'Please enter a valid email address.';
        }

        if (!password.trim()) {
            return 'Please enter your password.';
        }

        if (password.length < 6) {
            return 'Password should be at least 6 characters long.';
        }

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
                    if (ok && onAdminLogin) {
                        onAdminLogin();
                    } else {
                        setError('Admin access failed.');
                    }
                }, 600);
            })();
            return;
        }

        // Normal mock auth
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(mode === 'login' ? 'You have been securely signed in.' : 'Your account has been created.');

            if (onBack) {
                setTimeout(() => {
                    onBack();
                }, 800);
            }
        }, 700);
    };

    return (
        <div className="relative min-h-screen w-full bg-white text-black flex overflow-hidden font-sans">
            {/* Left Side: Visual Narrative */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-black overflow-hidden">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                    className="absolute inset-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1512914890251-2f96a9b0bbe2?auto=format&fit=crop&q=80&w=2000"
                        alt="Luxury Exterior"
                        className="w-full h-full object-cover opacity-80"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

                <div className="absolute bottom-20 left-20 z-10 max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <h1 className="text-6xl md:text-7xl font-black text-white leading-[1.1] mb-6 uppercase tracking-tight">
                            Elevated<br />
                            <span className="text-[var(--gold)]">Living.</span>
                        </h1>
                        <p className="text-white/60 text-lg font-light leading-relaxed">
                            Access the world's most exclusive real estate collection. Your journey to extraordinary living begins here.
                        </p>
                    </motion.div>
                </div>

                <div className="absolute top-20 left-20 w-12 h-[1px] bg-[var(--gold)]" />
            </div>

            {/* Right Side: Authentication Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-20 bg-white relative">
                {/* Back / Close Button */}
                <button
                    onClick={onBack}
                    className="absolute top-10 right-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors group z-20"
                >
                    <X size={20} className="text-black/40 group-hover:text-black transition-colors" />
                </button>

                <div className="w-full max-w-[440px]">
                    <div className="mb-12">
                        <div className="flex gap-10 mb-8 border-b border-black/[0.05]">
                            <button
                                onClick={() => setMode('login')}
                                className={`pb-4 text-sm font-bold uppercase tracking-[0.2em] transition-all relative ${mode === 'login' ? 'text-black' : 'text-black/20 hover:text-black/40'}`}
                            >
                                Sign In
                                {mode === 'login' && <motion.div layoutId="activeUnderline" className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[var(--gold)]" />}
                            </button>
                            <button
                                onClick={() => setMode('signup')}
                                className={`pb-4 text-sm font-bold uppercase tracking-[0.2em] transition-all relative ${mode === 'signup' ? 'text-black' : 'text-black/20 hover:text-black/40'}`}
                            >
                                Register
                                {mode === 'signup' && <motion.div layoutId="activeUnderline" className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[var(--gold)]" />}
                            </button>
                        </div>

                        <div className="min-h-[100px] flex flex-col justify-end">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={mode}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h2 className="text-4xl font-black tracking-tight mb-2 uppercase leading-none">
                                        {mode === 'login' ? 'Welcome Back' : 'Create Access'}
                                    </h2>
                                    <p className="text-black/40 font-medium">
                                        {mode === 'login'
                                            ? 'Enter your credentials to access your private portal.'
                                            : 'Step into the world of luxury. Sign up to start.'}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AnimatePresence mode="wait">
                            {mode === 'signup' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                    animate={{ opacity: 1, height: 'auto', marginTop: 0 }}
                                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="space-y-2 pb-2">
                                        <label className="text-[11px] font-bold uppercase tracking-widest text-black/40 ml-1">Full Name</label>
                                        <div className="relative group">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                                                <User className="text-black/20 group-focus-within:text-[var(--gold)] transition-colors" size={20} />
                                            </div>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Alexander Knight"
                                                className="w-full bg-black/[0.03] border-2 border-transparent focus:border-[var(--gold)]/30 focus:bg-white rounded-2xl py-5 pr-6 text-sm font-medium transition-all focus:outline-none"
                                                style={{ paddingLeft: '64px' }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-black/40 ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                                    <Mail className="text-black/20 group-focus-within:text-[var(--gold)] transition-colors" size={20} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="alex@example.com"
                                    className="w-full bg-black/[0.03] border-2 border-transparent focus:border-[var(--gold)]/30 focus:bg-white rounded-2xl py-5 pr-6 text-sm font-medium transition-all focus:outline-none"
                                    style={{ paddingLeft: '64px' }}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-black/40">Secure Password</label>
                                {mode === 'login' && <button type="button" className="text-[10px] uppercase font-bold text-[var(--gold)] hover:underline">Forgot?</button>}
                            </div>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                                    <Lock className="text-black/20 group-focus-within:text-[var(--gold)] transition-colors" size={20} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full bg-black/[0.03] border-2 border-transparent focus:border-[var(--gold)]/30 focus:bg-white rounded-2xl py-5 pr-6 text-sm font-medium transition-all focus:outline-none"
                                    style={{ paddingLeft: '64px' }}
                                />
                            </div>
                        </div>

                        <div className="pt-2 min-h-[20px]">
                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.p
                                        key="error"
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -4 }}
                                        className="text-xs font-medium text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3"
                                    >
                                        {error}
                                    </motion.p>
                                )}
                                {!error && success && (
                                    <motion.p
                                        key="success"
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -4 }}
                                        className="text-xs font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 flex items-center gap-2"
                                    >
                                        <CheckCircle2 size={14} className="text-emerald-500" />
                                        <span>{success}</span>
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="pt-2">
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                disabled={isSubmitting}
                                className={`w-full bg-black text-white h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-colors duration-500 shadow-xl shadow-black/10
                                    ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[var(--gold)]'}`}
                            >
                                {isSubmitting
                                    ? (mode === 'login' ? 'Authenticating…' : 'Creating Access…')
                                    : (mode === 'login' ? 'Proceed to Portal' : 'Create My Account')}
                                {!isSubmitting && <ArrowRight size={18} />}
                            </motion.button>
                        </div>
                    </form>

                    <div className="mt-12 pt-8 border-t border-black/[0.05]">
                        <div className="flex items-center gap-4 text-black/30">
                            <CheckCircle2 size={16} className="text-[var(--gold)]" />
                            <p className="text-[10px] uppercase font-bold tracking-widest leading-none">
                                256-Bit SSL Encrypted Connection
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ambient Detail - Gold Line */}
            <div className="absolute top-0 right-0 w-[4px] h-full bg-[var(--gold)]" />
        </div>
    );
};

export default Login;
