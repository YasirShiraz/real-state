import React, { useState, useEffect, useRef } from 'react';
import { useData, type Property } from '../context/DataContext';
import { Plus, Trash2, Edit2, X, LogOut, Home, Settings, Search, LayoutGrid, List as ListIcon, DollarSign, Building, Image as ImageIcon, Menu, ChevronLeft, Lock, TrendingUp, RefreshCw, Eye, Save, Key, Globe, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Animated counter hook ── */
function useCounter(target: number, duration = 1200) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        let start = 0;
        const step = target / (duration / 16);
        const t = setInterval(() => {
            start += step;
            if (start >= target) { setVal(target); clearInterval(t); }
            else setVal(Math.floor(start));
        }, 16);
        return () => clearInterval(t);
    }, [target, duration]);
    return val;
}

/* ── Stat Card ── */
const StatCard: React.FC<{ title: string; value: number | string; rawValue: number; change: string; icon: React.FC<any>; gradient: string; accent: string; delay: number }> =
    ({ title, value, rawValue, change, icon: Icon, gradient, accent, delay }) => {
        const counted = useCounter(rawValue);
        return (
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay, duration: 0.5, ease: 'easeOut' }}
                className={`relative overflow-hidden rounded-3xl border border-white/8 p-1 group cursor-default`}
                style={{ background: gradient }}
            >
                <div className="absolute inset-0 bg-[#0a0a0a]/88 rounded-[22px]" />
                <div className="relative p-6 flex flex-col h-full justify-between min-h-[150px]">
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors">
                            <Icon size={22} className="text-white/60" />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-wider py-1 px-3 rounded-full bg-white/5 ${accent}`}>{change}</span>
                    </div>
                    <div>
                        <p className="text-white/35 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{title}</p>
                        <div className={`text-4xl font-bold tracking-tight ${accent}`}>
                            {typeof value === 'string' ? value.replace(/\d+/, String(counted)) : counted}
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

/* ── Input field helper ── */
const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-wider text-[var(--gold)]">{label}</label>
        {children}
    </div>
);
const inputCls = "w-full p-4 bg-black border border-white/10 rounded-xl focus:border-[var(--gold)]/60 outline-none text-white transition-colors text-sm";

/* ══════════════════════════════════════════════ */
const Admin: React.FC = () => {
    const {
        properties, addProperty, updateProperty, deleteProperty,
        isAuthenticated, login, logout,
        heroSlides, addHeroSlide, removeHeroSlide
    } = useData();

    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [activeTab, setActiveTab] = useState<'properties' | 'settings' | 'slider'>('properties');
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [newSlideUrl, setNewSlideUrl] = useState('');
    const [newSlideType, setNewSlideType] = useState<'video' | 'image'>('image');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
    const [settingsTab, setSettingsTab] = useState<'security' | 'site' | 'notifications'>('security');
    const [newPassword, setNewPassword] = useState('');
    const [settingsSaved, setSettingsSaved] = useState(false);
    const passwordRef = useRef<HTMLInputElement>(null);

    const initialFormState: Omit<Property, 'id'> = {
        title: '', price: '', location: '', beds: 0, baths: 0,
        sqft: 0, images: [], type: 'Apartment', status: 'For Sale', description: ''
    };
    const [formData, setFormData] = useState<Omit<Property, 'id'>>(initialFormState);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError(false);
        const success = await login(password);
        if (!success) { setLoginError(true); passwordRef.current?.focus(); }
    };

    const handleAdd = () => { addProperty(formData); setIsAdding(false); setFormData(initialFormState); };
    const handleAddSlide = () => {
        if (newSlideUrl) { addHeroSlide({ type: newSlideType, url: newSlideUrl }); setNewSlideUrl(''); setIsAdding(false); }
    };
    const handleUpdate = (id: number) => { updateProperty(id, formData); setIsEditing(null); setFormData(initialFormState); };
    const startEdit = (p: Property) => { setIsEditing(p.id); const { id, ...rest } = p; setFormData({ ...rest, images: p.images || [] }); };
    const closeForm = () => { setIsAdding(false); setIsEditing(null); setFormData(initialFormState); };
    const handleSaveSettings = () => { setSettingsSaved(true); setTimeout(() => setSettingsSaved(false), 2000); };

    const filteredProperties = properties.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalValue = properties.length * 45_000_000;
    const activeListings = properties.length;
    const soldProperties = 12;

    /* ── Login Screen ── */
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover opacity-15 grayscale" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/60 to-[#050505]" />
                    {/* Ambient blobs */}
                    <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[var(--gold)]/5 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
                </div>

                <button onClick={() => window.location.href = '/'}
                    className="absolute top-8 left-8 flex items-center gap-3 text-white/25 hover:text-white/70 transition-colors group z-20">
                    <div className="w-9 h-9 border border-white/10 rounded-full flex items-center justify-center group-hover:border-white/30 transition-colors">
                        <X size={14} />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.3em]">Exit</span>
                </button>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                    className="w-full max-w-[440px] relative z-10">
                    <div className="bg-white/[0.025] border border-white/8 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
                        <div className="text-center mb-10">
                            <motion.div animate={{ boxShadow: loginError ? '0 0 40px rgba(239,68,68,0.25)' : '0 0 40px rgba(212,175,55,0.08)' }}
                                className="w-18 h-18 w-[72px] h-[72px] bg-[var(--gold)]/8 rounded-full flex items-center justify-center mx-auto mb-6 border border-[var(--gold)]/15">
                                <Lock className={loginError ? 'text-red-400' : 'text-[var(--gold)]'} size={28} />
                            </motion.div>
                            <h1 className="text-2xl font-bold text-white mb-1 tracking-tight uppercase">Command Center</h1>
                            <p className="text-white/25 text-[9px] uppercase font-black tracking-[0.5em]">Restricted Access Protocol</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-white/35 uppercase tracking-[0.3em] ml-1">Administrative Key</label>
                                <motion.div animate={loginError ? { x: [0, -8, 8, -8, 8, 0] } : {}} transition={{ duration: 0.4 }}>
                                    <input ref={passwordRef} type="password" value={password}
                                        onChange={(e) => { setPassword(e.target.value); setLoginError(false); }}
                                        className={`w-full bg-white/5 border px-6 py-5 rounded-2xl text-white focus:bg-white/8 outline-none transition-all text-center tracking-[0.8em] font-bold text-lg placeholder:tracking-normal placeholder:text-white/10 ${loginError ? 'border-red-500/50 focus:border-red-500/70' : 'border-white/5 focus:border-[var(--gold)]/30'}`}
                                        placeholder="••••••••" />
                                </motion.div>
                                <AnimatePresence>
                                    {loginError && (
                                        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                            className="text-red-400 text-[10px] font-bold text-center mt-1">
                                            Invalid administrative key
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>

                            <button className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] hover:bg-[var(--gold)] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                                Verify Identity
                            </button>
                        </form>

                        <div className="mt-8 flex items-center justify-center gap-4 text-white/15">
                            <div className="h-[1px] w-8 bg-current" />
                            <span className="text-[8px] font-black uppercase tracking-[0.4em]">System Secured</span>
                            <div className="h-[1px] w-8 bg-current" />
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    /* ── Nav items ── */
    const navItems = [
        { id: 'properties', label: 'Properties', icon: LayoutGrid, badge: properties.length },
        { id: 'slider', label: 'Hero Slider', icon: ImageIcon, badge: heroSlides.length },
        { id: 'settings', label: 'Settings', icon: Settings, badge: null },
    ] as const;

    return (
        <div className="flex h-screen overflow-hidden bg-[#080808] text-white font-sans">
            {/* ── Sidebar ── */}
            <motion.aside initial={{ width: 280 }} animate={{ width: isSidebarOpen ? 280 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="flex-shrink-0 flex flex-col h-full z-20 overflow-hidden relative"
                style={{ background: 'linear-gradient(180deg,#111 0%,#0a0a0a 100%)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>

                {/* Sidebar glow */}
                <div className="absolute top-0 left-0 right-0 h-40 bg-[var(--gold)]/3 blur-[60px] pointer-events-none" />

                <div className="p-7 border-b border-white/5 min-w-[17.5rem] relative">
                    <span className="text-[var(--gold)] font-black tracking-[0.25em] uppercase text-[9px] block mb-1">Ma Estate</span>
                    <h2 className="text-xl font-bold tracking-tight text-white">DASHBOARD</h2>
                    <div className="mt-3 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[9px] text-white/30 uppercase font-black tracking-widest">System Online</span>
                    </div>
                </div>

                <nav className="flex-1 p-5 space-y-1.5 min-w-[17.5rem]">
                    {navItems.map(({ id, label, icon: Icon, badge }) => (
                        <button key={id} onClick={() => setActiveTab(id)}
                            className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-200 group relative ${activeTab === id ? 'bg-[var(--gold)] text-black shadow-[0_4px_20px_rgba(212,175,55,0.25)]' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}>
                            <Icon size={18} strokeWidth={activeTab === id ? 2.5 : 1.5} />
                            <span className="text-[11px] font-black uppercase tracking-[0.12em]">{label}</span>
                            {badge !== null && (
                                <span className={`ml-auto text-[9px] font-black px-2 py-0.5 rounded-full ${activeTab === id ? 'bg-black/20 text-black' : 'bg-white/8 text-white/40'}`}>
                                    {badge}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-5 border-t border-white/5 min-w-[17.5rem] space-y-2">
                    <button onClick={() => window.location.href = '/'}
                        className="w-full flex items-center justify-center gap-2.5 p-3 text-white/30 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/8">
                        <Home size={15} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">View Site</span>
                    </button>
                    <button onClick={() => setShowLogoutModal(true)}
                        className="w-full flex items-center justify-center gap-2.5 p-3 text-red-400/70 hover:text-red-300 hover:bg-red-500/8 rounded-xl transition-all border border-transparent hover:border-red-500/15">
                        <LogOut size={15} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Terminate Session</span>
                    </button>
                </div>
            </motion.aside>

            {/* ── Logout Modal ── */}
            <AnimatePresence>
                {showLogoutModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-6">
                        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-[#111] border border-white/10 p-10 rounded-[2.5rem] w-full max-w-sm text-center shadow-2xl">
                            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <LogOut className="text-red-500" size={26} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">SECURE LOGOUT</h3>
                            <p className="text-white/35 text-sm leading-relaxed mb-8">
                                Terminate your administrative session. All unsaved changes will be lost.
                            </p>
                            <div className="flex flex-col gap-3">
                                <button onClick={() => { logout(); setShowLogoutModal(false); }}
                                    className="w-full bg-red-500 text-white font-black uppercase tracking-[0.2em] text-[10px] py-4 rounded-2xl hover:bg-red-600 transition-all">
                                    Confirm Termination
                                </button>
                                <button onClick={() => setShowLogoutModal(false)}
                                    className="w-full bg-white/5 text-white/40 font-black uppercase tracking-[0.2em] text-[10px] py-4 rounded-2xl hover:bg-white/10 transition-all">
                                    Stay Logged In
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Delete Confirm Modal ── */}
            <AnimatePresence>
                {deleteConfirm !== null && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-6">
                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                            className="bg-[#111] border border-red-500/20 p-8 rounded-3xl w-full max-w-sm text-center shadow-2xl">
                            <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
                                <Trash2 className="text-red-500" size={22} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Delete Asset?</h3>
                            <p className="text-white/35 text-sm mb-7">This action cannot be undone. The property will be permanently removed.</p>
                            <div className="flex gap-3">
                                <button onClick={() => setDeleteConfirm(null)}
                                    className="flex-1 py-3.5 bg-white/5 text-white/50 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors">Cancel</button>
                                <button onClick={() => { deleteProperty(deleteConfirm!); setDeleteConfirm(null); }}
                                    className="flex-1 py-3.5 bg-red-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-red-600 transition-colors">Delete</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Main Content ── */}
            <main className="flex-1 overflow-y-auto h-full relative">
                {/* Sticky Header */}
                <header className="sticky top-0 z-10 backdrop-blur-xl bg-[#080808]/80 border-b border-white/5 px-8 py-5 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white/40 hover:text-white">
                            {isSidebarOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                {activeTab === 'properties' ? 'Portfolio Overview' : activeTab === 'slider' ? 'Hero Visuals' : 'System Configuration'}
                            </h1>
                            <p className="text-white/30 text-xs">
                                Welcome back, Admin &mdash; <span className="text-[var(--gold)]">system optimal</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/8 rounded-xl px-4 py-2">
                            <RefreshCw size={13} className="text-white/30" />
                            <span className="text-[10px] text-white/30 font-bold uppercase tracking-wider">Live</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                    </div>
                </header>

                <div className="p-8 lg:p-12 space-y-8">

                    {/* ── PROPERTIES TAB ── */}
                    {activeTab === 'properties' && (
                        <>
                            {/* Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                <StatCard title="Total Assets" value={activeListings} rawValue={activeListings} change="+2 this month"
                                    icon={Building} gradient="linear-gradient(135deg,rgba(99,102,241,0.35),rgba(168,85,247,0.25))"
                                    accent="text-indigo-300" delay={0} />
                                <StatCard title="Portfolio Value" value={`AED ${(totalValue / 1_000_000).toFixed(1)}M`}
                                    rawValue={Math.round(totalValue / 1_000_000)} change="AED"
                                    icon={DollarSign} gradient="linear-gradient(135deg,rgba(212,175,55,0.35),rgba(251,146,60,0.2))"
                                    accent="text-[var(--gold)]" delay={0.08} />
                                <StatCard title="Properties Sold" value={soldProperties} rawValue={soldProperties} change="+12% YoY"
                                    icon={TrendingUp} gradient="linear-gradient(135deg,rgba(16,185,129,0.3),rgba(20,184,166,0.2))"
                                    accent="text-emerald-400" delay={0.16} />
                            </div>

                            {/* Toolbar */}
                            <div className="flex flex-col xl:flex-row justify-between items-center gap-4 bg-black/50 border border-white/8 p-2.5 rounded-2xl backdrop-blur-xl">
                                <div className="relative w-full xl:w-80 group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 group-focus-within:text-[var(--gold)] transition-colors" size={16} />
                                    <input placeholder="Search assets..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-white/5 border border-white/8 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-[var(--gold)]/40 transition-colors" />
                                </div>
                                <div className="flex gap-2.5 w-full xl:w-auto">
                                    <div className="bg-black border border-white/8 rounded-xl p-1 flex gap-1">
                                        {(['grid', 'list'] as const).map(m => (
                                            <button key={m} onClick={() => setViewMode(m)}
                                                className={`p-2.5 rounded-lg transition-all ${viewMode === m ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white'}`}>
                                                {m === 'grid' ? <LayoutGrid size={16} /> : <ListIcon size={16} />}
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={() => { setIsAdding(true); setFormData(initialFormState); }}
                                        className="flex-1 xl:flex-none bg-[var(--gold)] text-black px-7 py-2.5 rounded-xl flex items-center justify-center gap-2 font-black uppercase text-[10px] tracking-widest hover:bg-white transition-all shadow-[0_0_25px_rgba(212,175,55,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95">
                                        <Plus size={16} strokeWidth={3} /> New Asset
                                    </button>
                                </div>
                            </div>

                            {/* Empty state */}
                            {filteredProperties.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-24 text-center">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-5">
                                        <Building size={36} className="text-white/20" />
                                    </div>
                                    <p className="text-white/30 font-bold uppercase tracking-wider text-sm">No properties found</p>
                                    <p className="text-white/15 text-xs mt-1">{searchTerm ? 'Try a different search term' : 'Add your first asset using the button above'}</p>
                                </div>
                            )}

                            {/* Grid / List */}
                            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5' : 'space-y-3'}>
                                {filteredProperties.map((property, i) =>
                                    viewMode === 'grid' ? (
                                        <motion.div key={property.id} layout initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="bg-[#111] group rounded-3xl overflow-hidden border border-white/5 hover:border-[var(--gold)]/40 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1.5 relative">
                                            <div className="h-52 overflow-hidden relative">
                                                <img src={(property.images?.[0]) || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800'}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={property.title} />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                                <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider backdrop-blur-md border ${property.status === 'For Sale' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300' : 'bg-blue-500/20 border-blue-500/30 text-blue-300'}`}>
                                                    {property.status}
                                                </div>
                                                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                                                    <span className="text-[8px] font-bold text-white/70 uppercase">{property.type}</span>
                                                </div>
                                                {property.images && property.images.length > 1 && (
                                                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                                                        <Eye size={9} className="text-white/60" />
                                                        <span className="text-[8px] text-white/70 font-bold">+{property.images.length - 1}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-5">
                                                <h3 className="font-bold text-white text-sm mb-0.5 line-clamp-1">{property.title}</h3>
                                                <p className="text-white/35 text-[10px] uppercase tracking-wider mb-3">{property.location}</p>
                                                <p className="text-[var(--gold)] font-bold text-lg mb-4">{property.price}</p>
                                                <div className="grid grid-cols-3 gap-1 text-center border-t border-white/8 pt-3 mb-4">
                                                    {[['Beds', property.beds], ['Baths', property.baths], ['SqFt', property.sqft]].map(([l, v]) => (
                                                        <div key={String(l)}>
                                                            <span className="block text-white font-bold text-sm">{v}</span>
                                                            <span className="text-[9px] text-white/25 uppercase">{l}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => startEdit(property)}
                                                        className="flex-1 py-2.5 bg-white/5 hover:bg-[var(--gold)]/15 hover:text-[var(--gold)] rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5">
                                                        <Edit2 size={12} /> Edit
                                                    </button>
                                                    <button onClick={() => setDeleteConfirm(property.id)}
                                                        className="w-10 py-2.5 bg-red-500/8 hover:bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center transition-colors">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div key={property.id} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                            className="bg-[#111] p-4 rounded-2xl border border-white/5 hover:border-white/10 flex items-center gap-5 transition-all group">
                                            <img src={(property.images?.[0]) || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=400'}
                                                className="w-20 h-20 rounded-xl object-cover flex-shrink-0" alt={property.title} />
                                            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3 items-center min-w-0">
                                                <div className="min-w-0">
                                                    <h3 className="font-bold text-white truncate">{property.title}</h3>
                                                    <p className="text-white/35 text-xs uppercase tracking-wider truncate">{property.location}</p>
                                                </div>
                                                <p className="text-[var(--gold)] font-bold text-sm">{property.price}</p>
                                                <div className="hidden md:flex flex-wrap gap-3 text-xs text-white/50">
                                                    <span>{property.beds} Beds</span><span>{property.baths} Baths</span><span>{property.sqft} ft²</span>
                                                </div>
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => startEdit(property)} className="p-2.5 hover:bg-white/10 rounded-lg transition-colors"><Edit2 size={15} /></button>
                                                    <button onClick={() => setDeleteConfirm(property.id)} className="p-2.5 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"><Trash2 size={15} /></button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                )}
                            </div>
                        </>
                    )}

                    {/* ── SLIDER TAB ── */}
                    {activeTab === 'slider' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-1">Hero Section Media</h2>
                                    <p className="text-white/30 text-sm">{heroSlides.length} slides active on landing page</p>
                                </div>
                                <button onClick={() => setIsAdding(true)}
                                    className="bg-[var(--gold)] text-black px-5 py-2.5 rounded-xl flex items-center gap-2 font-black uppercase text-[10px] tracking-widest hover:bg-white transition-colors">
                                    <Plus size={15} /> Add Slide
                                </button>
                            </div>

                            {heroSlides.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-24 text-center">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-5">
                                        <ImageIcon size={36} className="text-white/20" />
                                    </div>
                                    <p className="text-white/30 font-bold uppercase tracking-wider text-sm">No slides yet</p>
                                    <p className="text-white/15 text-xs mt-1">Add your first hero slide above</p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {heroSlides.map((slide, index) => (
                                    <motion.div key={slide.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.06 }}
                                        className="group relative rounded-2xl overflow-hidden border border-white/8 bg-[#111]">
                                        <div className="h-44">
                                            {slide.type === 'video'
                                                ? <video src={slide.url} className="w-full h-full object-cover" />
                                                : <img src={slide.url} className="w-full h-full object-cover" alt={`Slide ${index + 1}`} />}
                                        </div>
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button onClick={() => removeHeroSlide(slide.id)}
                                                className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <div className="absolute top-2 left-2 px-2.5 py-0.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                                            <span className="text-[9px] font-bold uppercase text-white">{slide.type}</span>
                                        </div>
                                        <div className="absolute bottom-2 right-2 px-2.5 py-0.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                                            <span className="text-[9px] font-bold text-white/60">#{index + 1}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ── SETTINGS TAB ── */}
                    {activeTab === 'settings' && (
                        <div className="space-y-8 max-w-2xl">
                            <div>
                                <h2 className="text-xl font-bold mb-1">System Configuration</h2>
                                <p className="text-white/30 text-sm">Manage site-wide settings and administrative access.</p>
                            </div>

                            {/* Settings sub-tabs */}
                            <div className="flex gap-1 bg-white/5 border border-white/8 p-1 rounded-2xl w-fit">
                                {([
                                    { id: 'security', label: 'Security', icon: Key },
                                    { id: 'site', label: 'Site Info', icon: Globe },
                                    { id: 'notifications', label: 'Alerts', icon: Bell },
                                ] as const).map(({ id, label, icon: Icon }) => (
                                    <button key={id} onClick={() => setSettingsTab(id)}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${settingsTab === id ? 'bg-[var(--gold)] text-black' : 'text-white/40 hover:text-white'}`}>
                                        <Icon size={13} /> {label}
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                {settingsTab === 'security' && (
                                    <motion.div key="security" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                        className="space-y-5 bg-white/[0.025] border border-white/8 rounded-3xl p-8">
                                        <h3 className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2"><Key size={15} className="text-[var(--gold)]" /> Access Credentials</h3>
                                        <Field label="New Admin Password">
                                            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
                                                placeholder="Enter new password..." className={inputCls} />
                                        </Field>
                                        <Field label="Confirm Password">
                                            <input type="password" placeholder="Repeat new password..." className={inputCls} />
                                        </Field>
                                        <div className="bg-[var(--gold)]/8 border border-[var(--gold)]/20 rounded-xl p-4">
                                            <p className="text-[var(--gold)] text-xs font-bold">Note: Password changes are applied to the backend configuration. Ensure your backend server is running.</p>
                                        </div>
                                        <button onClick={handleSaveSettings}
                                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${settingsSaved ? 'bg-emerald-500 text-white' : 'bg-[var(--gold)] text-black hover:bg-white'}`}>
                                            <Save size={14} /> {settingsSaved ? 'Saved!' : 'Update Password'}
                                        </button>
                                    </motion.div>
                                )}
                                {settingsTab === 'site' && (
                                    <motion.div key="site" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                        className="space-y-5 bg-white/[0.025] border border-white/8 rounded-3xl p-8">
                                        <h3 className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2"><Globe size={15} className="text-[var(--gold)]" /> Site Information</h3>
                                        <Field label="Site Name"><input defaultValue="Ma Estate" className={inputCls} /></Field>
                                        <Field label="Contact Email"><input defaultValue="contact@maestate.com" className={inputCls} /></Field>
                                        <Field label="Phone Number"><input defaultValue="+971 50 000 0000" className={inputCls} /></Field>
                                        <Field label="Address">
                                            <textarea defaultValue="Dubai, United Arab Emirates" className={`${inputCls} min-h-[80px] resize-none`} />
                                        </Field>
                                        <button onClick={handleSaveSettings}
                                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${settingsSaved ? 'bg-emerald-500 text-white' : 'bg-[var(--gold)] text-black hover:bg-white'}`}>
                                            <Save size={14} /> {settingsSaved ? 'Saved!' : 'Save Changes'}
                                        </button>
                                    </motion.div>
                                )}
                                {settingsTab === 'notifications' && (
                                    <motion.div key="notifs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                        className="space-y-5 bg-white/[0.025] border border-white/8 rounded-3xl p-8">
                                        <h3 className="font-bold text-white uppercase tracking-wider text-sm flex items-center gap-2"><Bell size={15} className="text-[var(--gold)]" /> Notification Settings</h3>
                                        {[
                                            { label: 'New property inquiries', desc: 'Get notified when a client submits an inquiry' },
                                            { label: 'Portfolio updates', desc: 'Alerts when properties are added or removed' },
                                            { label: 'System alerts', desc: 'Critical system and security notifications' },
                                        ].map(({ label, desc }) => (
                                            <div key={label} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                                                <div>
                                                    <p className="text-white text-sm font-bold">{label}</p>
                                                    <p className="text-white/30 text-xs mt-0.5">{desc}</p>
                                                </div>
                                                <button className="w-12 h-6 bg-[var(--gold)]/80 rounded-full flex items-center justify-end pr-1 transition-colors relative">
                                                    <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                                                </button>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </main>

            {/* ── Property / Slide Form Modal ── */}
            <AnimatePresence>
                {(isAdding || isEditing !== null) && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <motion.div initial={{ scale: 0.95, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 30 }}
                            className="bg-[#111] rounded-3xl border border-white/10 w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-[0_40px_80px_rgba(0,0,0,0.7)]">

                            {/* Modal header */}
                            <div className="p-7 border-b border-white/8 flex justify-between items-center bg-white/[0.025] sticky top-0 z-10 backdrop-blur-xl rounded-t-3xl">
                                <div>
                                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                                        {activeTab === 'slider' ? (isAdding ? 'Add New Slide' : '') : (isAdding ? 'Acquire New Asset' : 'Edit Asset')}
                                    </h3>
                                    <p className="text-white/30 text-xs mt-0.5">Fill in the details below to update the portfolio.</p>
                                </div>
                                <button onClick={closeForm} className="p-2.5 hover:bg-white/10 rounded-full transition-colors">
                                    <X size={20} className="text-white" />
                                </button>
                            </div>

                            {/* Slider form */}
                            {activeTab === 'slider' ? (
                                <div className="p-8 space-y-6">
                                    <Field label="Media Type">
                                        <div className="flex gap-3">
                                            {(['image', 'video'] as const).map(t => (
                                                <button key={t} onClick={() => setNewSlideType(t)}
                                                    className={`flex-1 py-3 rounded-xl border font-black text-xs uppercase tracking-wider transition-colors ${newSlideType === t ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]' : 'border-white/10 text-white/40 hover:border-white/20'}`}>
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </Field>
                                    <Field label="Media URL / Upload">
                                        <div className="flex items-center gap-3">
                                            <input value={newSlideUrl} onChange={(e) => setNewSlideUrl(e.target.value)}
                                                className={`${inputCls} flex-1`} placeholder={newSlideType === 'video' ? 'Paste video URL...' : 'Paste image URL...'} />
                                            {newSlideType === 'image' && (
                                                <label className="cursor-pointer bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 transition-all">
                                                    <ImageIcon size={18} className="text-[var(--gold)]" />
                                                    <input type="file" className="hidden" accept="image/*" multiple onChange={async (e) => {
                                                        const files = Array.from(e.target.files || []);
                                                        if (!files.length) return;
                                                        const fd = new FormData();
                                                        files.forEach(f => fd.append('images', f));
                                                        try {
                                                            const res = await fetch('http://localhost:5000/api/upload', { method: 'POST', body: fd });
                                                            const data = await res.json();
                                                            if (data.urls?.length > 1) { data.urls.forEach((u: string) => addHeroSlide({ type: 'image', url: u })); setIsAdding(false); }
                                                            else if (data.urls?.[0]) setNewSlideUrl(data.urls[0]);
                                                        } catch { alert('Upload failed.'); }
                                                    }} />
                                                </label>
                                            )}
                                        </div>
                                    </Field>
                                    {newSlideUrl && (
                                        <div className="rounded-2xl overflow-hidden border border-white/10 h-44 bg-black">
                                            {newSlideType === 'video' ? <video src={newSlideUrl} className="w-full h-full object-cover" controls /> : <img src={newSlideUrl} className="w-full h-full object-cover" alt="Preview" />}
                                        </div>
                                    )}
                                    <button onClick={handleAddSlide} className="w-full py-4 bg-[var(--gold)] text-black rounded-xl font-black uppercase tracking-widest hover:bg-white transition-colors">
                                        Add to Slider
                                    </button>
                                </div>
                            ) : (
                                /* Property form */
                                <>
                                    <div className="p-8 space-y-7">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Field label="Property Title">
                                                <input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
                                                    className={inputCls} placeholder="e.g. The Royal Penthouse" />
                                            </Field>
                                            <Field label="Price (AED)">
                                                <input value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })}
                                                    className={inputCls} placeholder="e.g. AED 45,000,000" />
                                            </Field>
                                            <Field label="Location">
                                                <input value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })}
                                                    className={inputCls} placeholder="District, City" />
                                            </Field>
                                            <Field label="Asset Type">
                                                <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}
                                                    className={`${inputCls} appearance-none`}>
                                                    {['Apartment', 'Villa', 'Penthouse', 'Duplex', 'Mansion', 'Townhouse'].map(t => <option key={t}>{t}</option>)}
                                                </select>
                                            </Field>
                                            <Field label="Status">
                                                <div className="flex gap-3">
                                                    {(['For Sale', 'For Rent'] as const).map(s => (
                                                        <button key={s} type="button" onClick={() => setFormData({ ...formData, status: s })}
                                                            className={`flex-1 py-3.5 rounded-xl border font-black text-xs uppercase tracking-wider transition-colors ${formData.status === s ? (s === 'For Sale' ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300' : 'border-blue-500 bg-blue-500/15 text-blue-300') : 'border-white/8 text-white/35 hover:border-white/20'}`}>
                                                            {s}
                                                        </button>
                                                    ))}
                                                </div>
                                            </Field>
                                            <div />
                                        </div>

                                        <Field label="Description">
                                            <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                                                className={`${inputCls} min-h-[120px] resize-none`} placeholder="Describe the unique features..." />
                                        </Field>

                                        <div className="grid grid-cols-3 gap-5">
                                            <Field label="Bedrooms">
                                                <input type="number" value={formData.beds} onChange={e => setFormData({ ...formData, beds: Number(e.target.value) })} className={inputCls} />
                                            </Field>
                                            <Field label="Bathrooms">
                                                <input type="number" value={formData.baths} onChange={e => setFormData({ ...formData, baths: Number(e.target.value) })} className={inputCls} />
                                            </Field>
                                            <Field label="Area (ft²)">
                                                <input type="number" value={formData.sqft} onChange={e => setFormData({ ...formData, sqft: Number(e.target.value) })} className={inputCls} />
                                            </Field>
                                        </div>

                                        <Field label={`Images (${(formData.images || []).length} uploaded)`}>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 p-4 bg-black border border-white/8 rounded-xl text-white/30 text-sm">
                                                        {(formData.images || []).length > 0 ? `${formData.images.length} image${formData.images.length > 1 ? 's' : ''} selected` : 'No images uploaded'}
                                                    </div>
                                                    <label className="cursor-pointer bg-[var(--gold)] text-black font-bold px-5 py-4 rounded-xl transition-all hover:bg-white flex items-center gap-2 text-sm">
                                                        <Plus size={16} /> Upload
                                                        <input type="file" className="hidden" accept="image/*" multiple onChange={async (e) => {
                                                            const files = Array.from(e.target.files || []);
                                                            if (!files.length) return;
                                                            const fd = new FormData();
                                                            files.forEach(f => fd.append('images', f));
                                                            try {
                                                                const res = await fetch('http://localhost:5000/api/upload', { method: 'POST', body: fd });
                                                                const data = await res.json();
                                                                if (data.urls) setFormData({ ...formData, images: [...formData.images, ...data.urls] });
                                                            } catch { alert('Upload failed.'); }
                                                        }} />
                                                    </label>
                                                </div>
                                                {(formData.images || []).length > 0 && (
                                                    <div className="grid grid-cols-3 gap-3">
                                                        <AnimatePresence>
                                                            {formData.images.map((img, idx) => (
                                                                <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                                                                    className="relative rounded-xl overflow-hidden border border-white/10 aspect-video group">
                                                                    <img src={img} className="w-full h-full object-cover" alt="" />
                                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                        <button onClick={() => { const imgs = [...formData.images]; imgs.splice(idx, 1); setFormData({ ...formData, images: imgs }); }}
                                                                            className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"><Trash2 size={13} /></button>
                                                                    </div>
                                                                    {idx === 0 && <div className="absolute top-1.5 left-1.5 bg-[var(--gold)] text-black text-[7px] font-black uppercase px-1.5 py-0.5 rounded">Cover</div>}
                                                                </motion.div>
                                                            ))}
                                                        </AnimatePresence>
                                                    </div>
                                                )}
                                            </div>
                                        </Field>
                                    </div>

                                    <div className="p-6 border-t border-white/8 bg-white/[0.02] flex justify-end gap-3 rounded-b-3xl sticky bottom-0 backdrop-blur-xl">
                                        <button onClick={closeForm} className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-white/35 hover:text-white transition-colors">Discard</button>
                                        <button onClick={() => isAdding ? handleAdd() : handleUpdate(isEditing!)}
                                            className="px-8 py-3 bg-[var(--gold)] text-black rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-lg">
                                            {isAdding ? 'Establish Asset' : 'Save Changes'}
                                        </button>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Admin;
