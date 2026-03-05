import React, { useState } from 'react';
import { useData, type Property } from '../context/DataContext';
import { Plus, Trash2, Edit2, X, LogOut, Home, Settings, Search, LayoutGrid, List as ListIcon, DollarSign, Building, Image as ImageIcon, Menu, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Admin: React.FC = () => {
    const {
        properties,
        addProperty,
        updateProperty,
        deleteProperty,
        isAuthenticated,
        login,
        logout,
        heroSlides,
        addHeroSlide,
        removeHeroSlide
    } = useData();

    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState<'properties' | 'settings' | 'slider'>('properties');
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchTerm, setSearchTerm] = useState('');
    const [newSlideUrl, setNewSlideUrl] = useState('');
    const [newSlideType, setNewSlideType] = useState<'video' | 'image'>('image');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Form State
    const initialFormState: Omit<Property, 'id'> = {
        title: '',
        price: '',
        location: '',
        beds: 0,
        baths: 0,
        sqft: 0,
        images: [],
        type: 'Apartment',
        status: 'For Sale',
        description: ''
    };
    const [formData, setFormData] = useState<Omit<Property, 'id'>>(initialFormState);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(password);
        if (!success) {
            alert('Invalid Password');
        }
    };

    const handleAdd = () => {
        addProperty(formData);
        setIsAdding(false);
        setFormData(initialFormState);
    };

    const handleAddSlide = () => {
        if (newSlideUrl) {
            addHeroSlide({ type: newSlideType, url: newSlideUrl });
            setNewSlideUrl('');
            setIsAdding(false);
        }
    };

    const handleUpdate = (id: number) => {
        updateProperty(id, formData);
        setIsEditing(null);
        setFormData(initialFormState);
    };

    const startEdit = (property: Property) => {
        setIsEditing(property.id);
        const { id, ...rest } = property;
        setFormData({
            ...rest,
            images: property.images || []
        });
    };

    const filteredProperties = properties.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate Stats
    const totalValue = properties.length * 45000000; // Mock calculation
    const activeListings = properties.length;
    const soldProperties = 12; // Mock

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-black/40 backdrop-blur-xl p-12 rounded-3xl border border-white/10 w-full max-w-lg relative z-10 shadow-2xl"
                >
                    <div className="mb-10 text-center">
                        <div className="w-16 h-16 bg-[var(--gold)] rounded-full mx-auto mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                            <Settings className="text-black" size={32} />
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">COMMAND CENTER</h1>
                        <p className="text-white/40 text-sm uppercase tracking-[0.2em]">Restricted Access Area</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-[var(--gold)] uppercase tracking-widest ml-1">Access Key</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 p-5 rounded-xl text-white focus:border-[var(--gold)] focus:bg-white/10 outline-none transition-all text-center tracking-[0.5em] text-lg placeholder:tracking-normal"
                                placeholder="••••••••"
                            />
                        </div>
                        <button className="w-full bg-[var(--gold)] text-black py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                            Authenticate
                        </button>
                    </form>
                    <div className="mt-8 text-center">
                        <span className="text-white/20 text-[10px] uppercase tracking-widest border-b border-white/10 pb-1">Secure Connection</span>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex h-screen overflow-hidden bg-[#0a0a0a] text-white font-sans selection:bg-[var(--gold)] selection:text-black">
            {/* Sidebar */}
            <motion.aside
                initial={{ width: 288 }}
                animate={{ width: isSidebarOpen ? 288 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="flex-shrink-0 bg-black border-r border-white/5 flex flex-col h-full z-20 overflow-hidden relative"
            >
                <div className="p-8 border-b border-white/5 flex justify-between items-start min-w-[18rem]">
                    <div>
                        <span className="text-[var(--gold)] font-black tracking-[0.2em] uppercase text-xs block mb-2">Ma Estate</span>
                        <h2 className="text-2xl font-bold tracking-tighter text-white">DASHBOARD</h2>
                    </div>
                </div>

                <nav className="flex-1 p-6 space-y-2 min-w-[18rem]">
                    <button
                        onClick={() => setActiveTab('properties')}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group ${activeTab === 'properties' ? 'bg-[var(--gold)] text-black shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                    >
                        <LayoutGrid size={20} className={activeTab === 'properties' ? 'stroke-2' : 'stroke-1'} />
                        <span className="text-sm font-bold uppercase tracking-wider">Properties</span>
                        {activeTab === 'properties' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-black/30" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('slider')}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group ${activeTab === 'slider' ? 'bg-[var(--gold)] text-black shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                    >
                        <ImageIcon size={20} className={activeTab === 'slider' ? 'stroke-2' : 'stroke-1'} />
                        <span className="text-sm font-bold uppercase tracking-wider">Hero Slider</span>
                        {activeTab === 'slider' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-black/30" />}
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group ${activeTab === 'settings' ? 'bg-[var(--gold)] text-black shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
                    >
                        <Settings size={20} className={activeTab === 'settings' ? 'stroke-2' : 'stroke-1'} />
                        <span className="text-sm font-bold uppercase tracking-wider">Settings</span>
                    </button>
                </nav>

                <div className="p-6 border-t border-white/5 min-w-[18rem]">
                    <button
                        onClick={() => {
                            const confirmed = window.confirm('Are you sure you want to terminate this admin session?');
                            if (confirmed) {
                                logout();
                            }
                        }}
                        className="w-full flex items-center justify-center gap-3 p-4 text-red-400 hover:text-white hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20"
                    >
                        <LogOut size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest">Terminate Session</span>
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-10 lg:p-16 h-full relative">
                {/* Header */}
                <header className="flex justify-between items-end mb-16">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white/50 hover:text-white"
                        >
                            {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
                        </button>
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-[-0.03em]">
                                {activeTab === 'properties' ? 'Portfolio Overview' : activeTab === 'slider' ? 'Hero Visuals' : 'System Configuration'}
                            </h1>
                            <p className="text-white/40 text-lg font-light">
                                Welcome back, Admin. System is running at <span className="text-[var(--gold)]">optimal performance</span>.
                            </p>
                        </div>
                    </div>
                </header>

                {activeTab === 'properties' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {[
                            { title: 'Total Assets', value: activeListings, change: '+2 this month', icon: Building, color: 'from-blue-500/20 to-purple-500/20', text: 'text-white' },
                            { title: 'Portfolio Value', value: `${(totalValue / 1000000).toFixed(1)}M`, change: 'AED Currency', icon: DollarSign, color: 'from-[var(--gold)]/20 to-orange-500/20', text: 'text-[var(--gold)]' },
                            { title: 'Properties Sold', value: soldProperties, change: '+12% vs last year', icon: Home, color: 'from-emerald-500/20 to-teal-500/20', text: 'text-white' }
                        ].map((stat, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={i}
                                className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${stat.color} p-1 backdrop-blur-xl group`}
                            >
                                <div className="absolute inset-0 bg-[#0a0a0a]/90 rounded-[22px]" />
                                <div className="relative p-6 flex flex-col h-full justify-between">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors">
                                            <stat.icon size={24} className="text-white/70" />
                                        </div>
                                        <div className={`text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full bg-white/5 ${i === 1 ? 'text-white/50' : 'text-emerald-400'}`}>
                                            {stat.change}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-white/40 text-xs font-bold uppercase tracking-[0.2em] mb-2">{stat.title}</h3>
                                        <div className={`text-4xl lg:text-5xl font-bold ${stat.text} tracking-tight`}>{stat.value}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {activeTab === 'properties' ? (
                    <div className="space-y-8">
                        {/* Toolbar */}
                        <div className="flex flex-col xl:flex-row justify-between items-center gap-6 bg-black border border-white/10 p-2 rounded-2xl sticky top-0 z-10 backdrop-blur-xl">
                            <div className="relative w-full xl:w-96 group">
                                <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold)]/20 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity rounded-xl blur-md" />
                                <div className="relative bg-[#111] border border-white/10 rounded-xl flex items-center overflow-hidden transition-colors group-focus-within:border-[var(--gold)]/50">
                                    <Search className="ml-4 text-white/30 group-focus-within:text-[var(--gold)] transition-colors" size={20} />
                                    <input
                                        placeholder="Search assets..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full bg-transparent border-none py-4 px-4 text-white placeholder:text-white/20 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 w-full xl:w-auto">
                                <div className="bg-[#111] border border-white/10 rounded-xl p-1.5 flex gap-1">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-3 rounded-lg transition-all duration-300 ${viewMode === 'grid' ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                                    >
                                        <LayoutGrid size={20} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-3 rounded-lg transition-all duration-300 ${viewMode === 'list' ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                                    >
                                        <ListIcon size={20} />
                                    </button>
                                </div>

                                <button
                                    onClick={() => { setIsAdding(true); setFormData(initialFormState); }}
                                    className="flex-1 xl:flex-none bg-[var(--gold)] text-black px-8 py-3 rounded-xl flex items-center justify-center gap-3 font-black uppercase text-xs tracking-widest hover:bg-white transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95"
                                >
                                    <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
                                        <Plus size={14} strokeWidth={3} />
                                    </div>
                                    <span>New Asset</span>
                                </button>
                            </div>
                        </div>

                        {/* Editor Modal */}
                        <AnimatePresence>
                            {(isAdding || isEditing) && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                                >
                                    <motion.div
                                        initial={{ scale: 0.95, opacity: 0, y: 50 }}
                                        animate={{ scale: 1, opacity: 1, y: 0 }}
                                        exit={{ scale: 0.95, opacity: 0, y: 50 }}
                                        className="bg-[#111] rounded-3xl border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
                                    >
                                        <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/5">
                                            <div>
                                                <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{isAdding ? 'Acquire New Asset' : 'Edit Asset Configuration'}</h3>
                                                <p className="text-white/40 text-sm mt-1">Fill in the details below to update the portfolio.</p>
                                            </div>
                                            <button onClick={() => { setIsAdding(false); setIsEditing(null); }} className="p-3 hover:bg-white/10 rounded-full transition-colors">
                                                <X size={24} className="text-white" />
                                            </button>
                                        </div>

                                        <div className="p-10 space-y-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-3">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Property Title</label>
                                                    <input
                                                        value={formData.title}
                                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                                        className="w-full p-4 bg-black border border-white/10 rounded-xl focus:border-[var(--gold)] outline-none text-white transition-colors"
                                                        placeholder="e.g. The Royal Penthouse"
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Price (AED)</label>
                                                    <input
                                                        value={formData.price}
                                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                                        className="w-full p-4 bg-black border border-white/10 rounded-xl focus:border-[var(--gold)] outline-none text-white transition-colors"
                                                        placeholder="e.g. AED 45,000,000"
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Location</label>
                                                    <input
                                                        value={formData.location}
                                                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                                                        className="w-full p-4 bg-black border border-white/10 rounded-xl focus:border-[var(--gold)] outline-none text-white transition-colors"
                                                        placeholder="District, City"
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Asset Type</label>
                                                    <select
                                                        value={formData.type}
                                                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                                                        className="w-full p-4 bg-black border border-white/10 rounded-xl focus:border-[var(--gold)] outline-none text-white transition-colors appearance-none"
                                                    >
                                                        <option>Apartment</option>
                                                        <option>Villa</option>
                                                        <option>Penthouse</option>
                                                        <option>Duplex</option>
                                                        <option>Mansion</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Property Description</label>
                                                <textarea
                                                    value={formData.description}
                                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                                    className="w-full p-4 bg-black border border-white/10 rounded-xl focus:border-[var(--gold)] outline-none text-white transition-colors min-h-[150px] resize-none"
                                                    placeholder="Describe the unique features and lifestyle of this residence..."
                                                />
                                            </div>

                                            <div className="grid grid-cols-3 gap-6">
                                                <div className="space-y-3">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Bedrooms</label>
                                                    <input
                                                        type="number"
                                                        value={formData.beds}
                                                        onChange={e => setFormData({ ...formData, beds: Number(e.target.value) })}
                                                        className="w-full p-4 bg-black border border-white/10 rounded-xl focus:border-[var(--gold)] outline-none text-white transition-colors"
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Bathrooms</label>
                                                    <input
                                                        type="number"
                                                        value={formData.baths}
                                                        onChange={e => setFormData({ ...formData, baths: Number(e.target.value) })}
                                                        className="w-full p-4 bg-black border border-white/10 rounded-xl focus:border-[var(--gold)] outline-none text-white transition-colors"
                                                    />
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Area (Sq. Ft)</label>
                                                    <input
                                                        type="number"
                                                        value={formData.sqft}
                                                        onChange={e => setFormData({ ...formData, sqft: Number(e.target.value) })}
                                                        className="w-full p-4 bg-black border border-white/10 rounded-xl focus:border-[var(--gold)] outline-none text-white transition-colors"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Property Images ({(formData.images || []).length})</label>
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex-1 p-4 bg-black border border-white/10 rounded-xl text-white/30 text-sm overflow-hidden whitespace-nowrap">
                                                            {(formData.images || []).length > 0 ? `${formData.images.length} images selected` : 'No images uploaded'}
                                                        </div>
                                                        <label className="cursor-pointer bg-[var(--gold)] text-black font-bold px-6 py-4 rounded-xl transition-all hover:bg-white flex items-center gap-2">
                                                            <Plus size={18} />
                                                            <span>Upload Multi</span>
                                                            <input
                                                                type="file"
                                                                className="hidden"
                                                                accept="image/*"
                                                                multiple
                                                                onChange={async (e) => {
                                                                    const files = Array.from(e.target.files || []);
                                                                    if (files.length > 0) {
                                                                        const uploadData = new FormData();
                                                                        files.forEach(file => uploadData.append('images', file));
                                                                        try {
                                                                            const res = await fetch('http://localhost:5000/api/upload', {
                                                                                method: 'POST',
                                                                                body: uploadData,
                                                                            });
                                                                            const data = await res.json();
                                                                            if (data.urls) {
                                                                                setFormData({ ...formData, images: [...formData.images, ...data.urls] });
                                                                            }
                                                                        } catch (error) {
                                                                            console.error('Upload failed:', error);
                                                                            alert('Upload failed.');
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        </label>
                                                    </div>

                                                    {formData.images && formData.images.length > 0 && (
                                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                                            <AnimatePresence>
                                                                {(formData.images || []).map((img, idx) => (
                                                                    <motion.div
                                                                        key={idx}
                                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                                        animate={{ opacity: 1, scale: 1 }}
                                                                        exit={{ opacity: 0, scale: 0.9 }}
                                                                        className="relative rounded-xl overflow-hidden border border-white/10 aspect-video shadow-xl group"
                                                                    >
                                                                        <img src={img} className="w-full h-full object-cover" alt="Preview" />
                                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                            <button
                                                                                onClick={() => {
                                                                                    const newImages = [...formData.images];
                                                                                    newImages.splice(idx, 1);
                                                                                    setFormData({ ...formData, images: newImages });
                                                                                }}
                                                                                className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                                                                            >
                                                                                <Trash2 size={16} />
                                                                            </button>
                                                                        </div>
                                                                        {idx === 0 && (
                                                                            <div className="absolute top-2 left-2 px-2 py-0.5 bg-[var(--gold)] text-black text-[8px] font-black uppercase rounded">Cover</div>
                                                                        )}
                                                                    </motion.div>
                                                                ))}
                                                            </AnimatePresence>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-8 border-t border-white/10 bg-white/5 flex justify-end gap-4 rounded-b-3xl">
                                            <button
                                                onClick={() => { setIsAdding(false); setIsEditing(null); }}
                                                className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
                                            >
                                                Discard
                                            </button>
                                            <button
                                                onClick={() => isAdding ? handleAdd() : handleUpdate(isEditing!)}
                                                className="px-10 py-4 bg-[var(--gold)] text-black rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-lg"
                                            >
                                                {isAdding ? 'Establish Asset' : 'Save Configurations'}
                                            </button>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Property Grid/List View */}
                        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
                            {filteredProperties.map(property => (
                                viewMode === 'grid' ? (
                                    <motion.div
                                        key={property.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-[#111] group rounded-3xl overflow-hidden border border-white/5 hover:border-[var(--gold)]/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative"
                                    >
                                        <div className="h-64 overflow-hidden relative">
                                            <img src={(property.images && property.images[0]) || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200'} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={property.title} />
                                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-wider text-white">
                                                {property.status}
                                            </div>
                                            {property.images && property.images.length > 1 && (
                                                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 text-[8px] font-bold text-white">
                                                    +{property.images.length - 1} Photos
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="font-bold text-lg text-white mb-1 line-clamp-1">{property.title}</h3>
                                                    <p className="text-white/40 text-xs uppercase tracking-wider">{property.location}</p>
                                                </div>
                                            </div>
                                            <div className="text-[var(--gold)] font-bold text-xl mb-6">{property.price}</div>

                                            <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4 mb-6">
                                                <div className="text-center">
                                                    <span className="block text-white font-bold">{property.beds}</span>
                                                    <span className="text-[10px] text-white/30 uppercase">Beds</span>
                                                </div>
                                                <div className="text-center border-l border-white/10">
                                                    <span className="block text-white font-bold">{property.baths}</span>
                                                    <span className="text-[10px] text-white/30 uppercase">Baths</span>
                                                </div>
                                                <div className="text-center border-l border-white/10">
                                                    <span className="block text-white font-bold">{property.sqft}</span>
                                                    <span className="text-[10px] text-white/30 uppercase">SqFt</span>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => startEdit(property)}
                                                    className="flex-1 py-3 bg-white/5 hover:bg-white/20 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <Edit2 size={14} /> Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteProperty(property.id)}
                                                    className="w-12 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl flex items-center justify-center transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key={property.id}
                                        layout
                                        className="bg-[#111] p-4 rounded-2xl border border-white/5 flex items-center gap-6 hover:bg-white/5 transition-colors"
                                    >
                                        <img src={(property.images && property.images[0]) || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200'} className="w-24 h-24 rounded-xl object-cover" alt={property.title} />
                                        <div className="flex-1 grid grid-cols-4 gap-4 items-center">
                                            <div>
                                                <h3 className="font-bold text-white text-lg">{property.title}</h3>
                                                <p className="text-white/40 text-xs uppercase tracking-wider">{property.location}</p>
                                            </div>
                                            <div className="text-[var(--gold)] font-bold">{property.price}</div>
                                            <div className="flex gap-4 text-sm text-white/60">
                                                <span>{property.beds} Beds</span>
                                                <span>{property.baths} Baths</span>
                                                <span>{property.sqft} SqFt</span>
                                            </div>
                                            <div className="flex justify-end gap-3">
                                                <button onClick={() => startEdit(property)} className="p-3 hover:bg-white/10 rounded-lg">
                                                    <Edit2 size={18} />
                                                </button>
                                                <button onClick={() => deleteProperty(property.id)} className="p-3 hover:bg-red-500/10 text-red-500 rounded-lg">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            ))}
                        </div>
                    </div>
                ) : activeTab === 'slider' ? (
                    <div className="space-y-8">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">Hero Section Content</h2>
                                <p className="text-white/40 text-sm">Manage background videos and images for the landing page.</p>
                            </div>
                            <button
                                onClick={() => setIsAdding(true)}
                                className="bg-[var(--gold)] text-black px-6 py-3 rounded-xl flex items-center gap-2 font-bold uppercase text-xs tracking-widest hover:bg-white transition-colors"
                            >
                                <Plus size={16} /> Add Slide
                            </button>
                        </div>

                        {/* Add Slide Modal */}
                        <AnimatePresence>
                            {isAdding && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                                >
                                    <motion.div
                                        initial={{ scale: 0.95, opacity: 0, y: 50 }}
                                        animate={{ scale: 1, opacity: 1, y: 0 }}
                                        exit={{ scale: 0.95, opacity: 0, y: 50 }}
                                        className="bg-[#111] rounded-3xl border border-white/10 w-full max-w-lg shadow-2xl p-8"
                                    >
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-xl font-bold text-white uppercase tracking-tight">Add New Slide</h3>
                                            <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                                <X size={24} className="text-white" />
                                            </button>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Media Type</label>
                                                <div className="flex gap-4">
                                                    <button
                                                        onClick={() => setNewSlideType('image')}
                                                        className={`flex-1 py-3 rounded-xl border ${newSlideType === 'image' ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]' : 'border-white/10 text-white/50'} font-bold text-xs uppercase tracking-wider transition-colors`}
                                                    >
                                                        Image
                                                    </button>
                                                    <button
                                                        onClick={() => setNewSlideType('video')}
                                                        className={`flex-1 py-3 rounded-xl border ${newSlideType === 'video' ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]' : 'border-white/10 text-white/50'} font-bold text-xs uppercase tracking-wider transition-colors`}
                                                    >
                                                        Video
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[var(--gold)]">Media URL / Upload</label>
                                                <div className="flex items-center gap-4">
                                                    <input
                                                        value={newSlideUrl}
                                                        onChange={(e) => setNewSlideUrl(e.target.value)}
                                                        className="flex-1 p-4 bg-black border border-white/10 rounded-xl focus:border-[var(--gold)] outline-none text-white transition-colors text-sm"
                                                        placeholder={newSlideType === 'video' ? "Paste video URL..." : "Paste URL or upload image..."}
                                                    />
                                                    {newSlideType === 'image' && (
                                                        <label className="cursor-pointer bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 transition-all group">
                                                            <ImageIcon size={20} className="text-[var(--gold)] group-hover:scale-110 transition-transform" />
                                                            <input
                                                                type="file"
                                                                className="hidden"
                                                                accept="image/*"
                                                                multiple
                                                                onChange={async (e) => {
                                                                    const files = Array.from(e.target.files || []);
                                                                    if (files.length > 0) {
                                                                        const uploadData = new FormData();
                                                                        files.forEach(file => uploadData.append('images', file));
                                                                        try {
                                                                            const res = await fetch('http://localhost:5000/api/upload', {
                                                                                method: 'POST',
                                                                                body: uploadData,
                                                                            });
                                                                            const data = await res.json();

                                                                            if (data.urls && data.urls.length > 1) {
                                                                                // Multiple images: add all as slides immediately
                                                                                data.urls.forEach((url: string) => {
                                                                                    addHeroSlide({ type: 'image', url });
                                                                                });
                                                                                setIsAdding(false);
                                                                                alert(`${data.urls.length} slides added!`);
                                                                            } else if (data.urls && data.urls[0]) {
                                                                                setNewSlideUrl(data.urls[0]);
                                                                            }
                                                                        } catch (error) {
                                                                            console.error('Upload failed:', error);
                                                                            alert('Upload failed.');
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                        </label>
                                                    )}
                                                </div>
                                            </div>

                                            {newSlideUrl && (
                                                <div className="rounded-xl overflow-hidden border border-white/10 h-48 bg-black">
                                                    {newSlideType === 'video' ? (
                                                        <video src={newSlideUrl} className="w-full h-full object-cover" controls />
                                                    ) : (
                                                        <img src={newSlideUrl} className="w-full h-full object-cover" alt="Preview" />
                                                    )}
                                                </div>
                                            )}

                                            <button
                                                onClick={handleAddSlide}
                                                className="w-full py-4 bg-[var(--gold)] text-black rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-colors"
                                            >
                                                Add to Slider
                                            </button>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {heroSlides.map((slide, index) => (
                                <div key={slide.id} className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#111]">
                                    <div className="h-48">
                                        {slide.type === 'video' ? (
                                            <video src={slide.url} className="w-full h-full object-cover" />
                                        ) : (
                                            <img src={slide.url} className="w-full h-full object-cover" alt={`Slide ${index}`} />
                                        )}
                                    </div>
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <button
                                            onClick={() => removeHeroSlide(slide.id)}
                                            className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                    <div className="absolute top-2 left-2 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-white">{slide.type}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <Settings size={48} className="text-[var(--gold)]" />
                        </div>
                        <h3 className="text-2xl font-bold uppercase tracking-wider text-white mb-2">System Configuration</h3>
                        <p className="text-white/40 max-w-md">Global site configuration module is currently initializing. <br /> Access restricted to maintenance protocol.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Admin;
