import { X, TrendingUp, DollarSign, MapIcon, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface SmartOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    type: string;
}

const data = [
    { name: '2019', value: 2400 },
    { name: '2020', value: 1398 },
    { name: '2021', value: 9800 },
    { name: '2022', value: 3908 },
    { name: '2023', value: 4800 },
    { name: '2024', value: 13000 },
    { name: '2025', value: 18000 },
];

const SmartOverlay: React.FC<SmartOverlayProps> = ({ isOpen, onClose, type }) => {
    const { t, isRTL } = useLanguage();
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: isRTL ? '-100%' : '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: isRTL ? '-100%' : '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className={`fixed top-0 ${isRTL ? 'left-0 border-r' : 'right-0 border-l'} w-full md:w-[600px] h-full z-[60] glass border-white/10 p-12 overflow-y-auto`}
                >
                    <img
                        src="https://images.unsplash.com/photo-1549517045-bc93de075e53?auto=format&fit=crop&q=80&w=800"
                        className="absolute inset-0 w-full h-full object-cover opacity-[0.05] pointer-events-none"
                        alt="Sidebar Background"
                    />
                    <button
                        onClick={onClose}
                        className={`absolute top-8 ${isRTL ? 'left-8' : 'right-8'} p-3 glass rounded-full hover:bg-white/10 transition-colors`}
                    >
                        <X size={20} />
                    </button>

                    <header className="mb-12">
                        <span className="text-[var(--gold)] text-xs font-bold tracking-[0.3em] uppercase mb-2 block">{t('marketTrends')}</span>
                        <h2 className="text-4xl font-bold uppercase">{type === 'trends' ? t('marketTrends') : t('liveValuation')}</h2>
                    </header>

                    <div className="grid grid-cols-2 gap-6 mb-12">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                            <TrendingUp className="text-[var(--gold)] mb-4" size={24} />
                            <div className="text-sm text-white/40 uppercase tracking-widest mb-1">Growth Forecast</div>
                            <div className="text-2xl font-bold text-white">+14.2%</div>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                            <DollarSign className="text-[var(--gold)] mb-4" size={24} />
                            <div className="text-sm text-white/40 uppercase tracking-widest mb-1">Avg SQFT Price</div>
                            <div className="text-2xl font-bold text-white">$2,450</div>
                        </div>
                    </div>

                    <div className="mb-12">
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <BarChart3 size={16} className="text-[var(--gold)]" />
                            Market Value Index (5Y)
                        </h3>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Tooltip
                                        contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                        itemStyle={{ color: '#D4AF37' }}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <MapIcon size={16} className="text-[var(--gold)]" />
                            Top Neighborhoods
                        </h3>
                        {[
                            { name: 'JVC', roi: '', status: 'High Yield' },
                            { name: 'International City', roi: '', status: 'Value' },
                            { name: 'Dubai Land Residence', roi: '', status: 'Growth' },
                            { name: 'Liwan', roi: '', status: 'Emerging' },
                            { name: 'Downtown Dubai', roi: '', status: 'Premium' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                                <div>
                                    <div className="font-semibold">{item.name}</div>
                                    <div className="text-[10px] text-white/40 uppercase tracking-widest">{item.status}</div>
                                </div>
                                <div className="text-[var(--gold)] font-bold">{item.roi}</div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-12 py-4 bg-[var(--gold)] text-black font-bold uppercase tracking-[0.2em] text-xs rounded-lg hover:scale-[1.02] transition-transform">
                        {t('getFullReport')}
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SmartOverlay;
