import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

const agents = [
    {
        name: "MEHMOOD ADAMJEE",
        role: "General Manager",
        email: "Mehmood@maestate.com",
        img: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
        name: "AHMED AMIN",
        role: "Senior Advisor",
        email: "ahmed@maestate.com",
        img: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
        name: "IRFAN",
        role: "Property Consultant",
        email: "irfan@maestate.com",
        img: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
        name: "AWAIS",
        role: "Investment Specialist",
        email: "awais@maestate.com",
        img: "https://randomuser.me/api/portraits/men/4.jpg"
    },
    {
        name: "AHMED AFAQ",
        role: "Luxury Consultant",
        email: "ahmad.afaq@maestate.com",
        img: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
        name: "HUMAYUN EJAZ",
        role: "Client Relations",
        email: "humayun@maestate.com",
        img: "https://randomuser.me/api/portraits/men/6.jpg"
    },
    {
        name: "ASAD",
        role: "Sales Executive",
        email: "asad@maestate.com",
        img: "https://randomuser.me/api/portraits/men/7.jpg"
    },
    {
        name: "UBAID UR REHMAN",
        role: "Property Advisor",
        email: "ubaid@maestate.com",
        img: "https://randomuser.me/api/portraits/men/8.jpg"
    },
    {
        name: "HAITHA M D",
        role: "Leasing Specialist",
        email: "Leasing@maestate.com",
        img: "https://randomuser.me/api/portraits/women/9.jpg"
    },
    {
        name: "RUBBY",
        role: "Client Liaison",
        email: "Ruby@maestate.com",
        img: "https://randomuser.me/api/portraits/women/10.jpg"
    },
    {
        name: "MUHAMMAD ALI RAZA",
        role: "Senior Broker",
        email: "ali@maestate.com",
        img: "https://randomuser.me/api/portraits/men/11.jpg"
    },
    {
        name: "WASIF ALI",
        role: "Sales Consultant",
        email: "wasif@maestate.com",
        img: "https://randomuser.me/api/portraits/men/12.jpg"
    },
    {
        name: "SHAHID ALI",
        role: "Property Expert",
        email: "shahid@maestate.com",
        img: "https://randomuser.me/api/portraits/men/13.jpg"
    },
    {
        name: "M. NABIL RAZA",
        role: "Real Estate Advisor",
        email: "nabil@maestate.com",
        img: "https://randomuser.me/api/portraits/men/14.jpg"
    },
    {
        name: "USAMA",
        role: "Investment Consultant",
        email: "usama@maestate.com",
        img: "https://randomuser.me/api/portraits/men/15.jpg"
    },
    {
        name: "MUHAMMAD ADAN",
        role: "Property Consultant",
        email: "adan@maestate.com",
        img: "https://randomuser.me/api/portraits/men/16.jpg"
    }
];

const OurAgents: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">

            {/* Cinematic Hero Header */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2000"
                        alt="Our Expert Team"
                        className="w-full h-full object-cover opacity-50 scale-105"
                        style={{ animation: 'slowZoom 20s ease-in-out infinite alternate' }}
                    />
                </div>

                {/* Vertical Line Decorations */}
                <div className="absolute inset-0 pointer-events-none flex justify-between px-[10%] opacity-10">
                    <div className="w-[1px] h-full bg-white/30" />
                    <div className="w-[1px] h-full bg-white/30" />
                    <div className="w-[1px] h-full bg-white/30" />
                </div>

                <div className="relative z-10 text-center space-y-4 max-w-4xl px-container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <span className="text-[var(--gold)] font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs">
                            MA Estate
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white tracking-tighter uppercase leading-[0.9]">
                            Our <br />
                            <span className="italic font-serif font-light text-white/80">Advisors</span>
                        </h1>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="w-24 h-[1px] bg-[var(--gold)]"
                        />
                        <p className="text-white/50 text-xs md:text-sm font-medium tracking-[0.2em] uppercase max-w-sm">
                            A team of world-class real estate experts
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Section Intro */}
            <div className="section-container py-section">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/5 pb-10">
                    <div>
                        <span className="text-[var(--gold)] text-[10px] font-black uppercase tracking-[0.4em] block mb-3">The Collective</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tighter uppercase">
                            Find An <span className="italic font-serif font-light">Agent</span>
                        </h2>
                    </div>
                    <p className="text-black/40 text-xs font-medium tracking-widest uppercase max-w-xs text-right hidden md:block">
                        {agents.length} Expert Advisors · UAE &amp; Global Markets
                    </p>
                </div>
            </div>

            {/* Agents Grid */}
            <div className="section-container pb-section">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {agents.map((agent, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            className="group relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-neutral-900 cursor-pointer shadow-xl"
                        >
                            {/* Photo */}
                            <img
                                src={agent.img}
                                alt={agent.name}
                                className="w-full h-full object-cover transition-transform duration-[5s] ease-out group-hover:scale-110"
                            />

                            {/* Persistent gradient at bottom */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                            {/* Always-visible name bar */}
                            <div className="absolute inset-x-0 bottom-0 p-5 z-10">
                                <div className="space-y-1 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="text-[var(--gold)] text-[9px] font-black uppercase tracking-[0.4em] block">
                                        {agent.role}
                                    </span>
                                    <h3 className="text-lg font-bold uppercase text-white tracking-tight leading-tight">
                                        {agent.name}
                                    </h3>
                                </div>

                                {/* Hover content */}
                                <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                    <div className="pt-4 space-y-3">
                                        <div className="w-full h-[1px] bg-white/10" />
                                        <a
                                            href={`mailto:${agent.email}`}
                                            className="inline-flex items-center gap-2 text-white/50 hover:text-[var(--gold)] text-[10px] font-medium tracking-wide lowercase transition-colors"
                                        >
                                            <Mail size={11} className="shrink-0" />
                                            {agent.email}
                                        </a>
                                        <div>
                                            <a
                                                href={`mailto:${agent.email}`}
                                                className="inline-flex items-center gap-2 gold-bg text-black px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_8px_20px_rgba(212,175,55,0.3)]"
                                            >
                                                <span>Inquire</span>
                                                <ArrowRight size={10} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Gold corner accent on hover */}
                            <div className="absolute top-5 right-5 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="w-full h-[1.5px] bg-[var(--gold)]" />
                                <div className="w-[1.5px] h-full bg-[var(--gold)] mt-[-1.5px]" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* WhatsApp Button */}
            <a
                href="https://wa.me/971585589001"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-8 left-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-[0_15px_35px_rgba(37,211,102,0.4)] hover:bg-[#20b858] transition-all hover:scale-110 active:scale-95 group"
                title="Chat with us on WhatsApp"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 drop-shadow-md">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03c0 2.119.553 4.187 1.605 5.952L0 24l6.12-1.605a11.802 11.802 0 005.923 1.577h.004c6.635 0 12.032-5.395 12.036-12.033A11.83 11.83 0 0012.05h.004z" />
                </svg>
            </a>
        </div>
    );
};

export default OurAgents;
