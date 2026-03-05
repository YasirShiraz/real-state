import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ServicesValuation: React.FC = () => {
    const { t, isRTL } = useLanguage();
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/20 to-black pointer-events-none" />

                {/* Abstract Background */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat opacity-20"></div>
                    <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover grayscale opacity-30" />
                </div>

                <div className="relative z-10 text-center space-y-6 max-w-5xl px-container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className={`text-[var(--gold)] font-bold tracking-[0.6em] uppercase text-xs block mb-6 ${isRTL ? 'text-right' : ''}`}>
                            {t('marketIntelligence')}
                        </span>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                            {t('precisionValuation').split(' ').slice(0, 1)} <br /> <span className="text-white/20">{t('precisionValuation').split(' ').slice(1).join(' ')}</span>
                        </h1>
                    </motion.div>
                </div>
            </div>

            {/* Intelligence Grid */}
            <section className="py-section border-t border-white/10">
                <div className="section-container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                        <div>
                            <h2 className={`text-4xl font-bold uppercase mb-8 ${isRTL ? 'text-right' : ''}`}>
                                {t('dataDrivenAccuracy').split(' ').slice(0, -1).join(' ')} <br />
                                <span className="text-[var(--gold)]">{t('dataDrivenAccuracy').split(' ').slice(-1)}</span>
                            </h2>
                            <p className="text-white/50 leading-relaxed mb-10 text-justify">
                                In a market as dynamic as Dubai, precision is paramount. We leverage real-time transaction data, AI-driven market trends, and on-the-ground expertise to provide valuations that reflect true market potential.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 border border-white/10 bg-white/5 rounded-xl">
                                    <div className="text-3xl font-bold text-[var(--gold)] mb-2">98%</div>
                                    <div className="text-[10px] uppercase tracking-widest text-white/40">Valuation Accuracy</div>
                                </div>
                                <div className="p-6 border border-white/10 bg-white/5 rounded-xl">
                                    <div className="text-3xl font-bold text-[var(--gold)] mb-2">24h</div>
                                    <div className="text-[10px] uppercase tracking-widest text-white/40">Report Turnaround</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 p-10 rounded-[2rem] relative overflow-hidden group">
                            <img
                                src="https://images.unsplash.com/photo-1460472178825-e5240623abe5?auto=format&fit=crop&q=80&w=800"
                                className="absolute inset-0 w-full h-full object-cover opacity-[0.05] group-hover:scale-110 transition-transform duration-[5s] pointer-events-none"
                                alt="Form Background"
                            />
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <BarChart2 size={120} />
                            </div>
                            <h3 className={`text-2xl font-bold uppercase mb-8 tracking-wide relative z-10 ${isRTL ? 'text-right' : ''}`}>{t('requestAppraisal')}</h3>

                            <form className="space-y-6 relative z-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/60">Property Location</label>
                                    <input type="text" className="w-full bg-black/50 border border-white/10 p-4 rounded-lg focus:border-[var(--gold)] outline-none text-sm transition-colors" placeholder="e.g. Downtown Dubai" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/60">Property Type</label>
                                    <select className="w-full bg-black/50 border border-white/10 p-4 rounded-lg focus:border-[var(--gold)] outline-none text-sm transition-colors text-white/50">
                                        <option>Apartment</option>
                                        <option>Villa</option>
                                        <option>Penthouse</option>
                                        <option>Commercial</option>
                                    </select>
                                </div>
                                <button className="w-full py-4 bg-[var(--gold)] text-black font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-colors mt-4">
                                    {t('getEstimate')}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesValuation;
