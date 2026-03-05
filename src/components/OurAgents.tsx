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
                className="fixed bottom-8 left-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20b858] transition-transform hover:scale-110"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.693c.961.533 1.83.693 2.778.694h.013c3.178 0 5.769-2.587 5.77-5.768.001-1.541-.601-2.986-1.688-4.073-1.089-1.09-2.535-1.693-4.082-1.811zm8.58 6.096c-.428-.214-2.536-1.249-2.929-1.393-.393-.143-.679-.214-.964.214-.286.429-1.107 1.393-1.357 1.679-.25.286-.5.321-.928.107-2.618-1.305-4.341-2.316-6.063-5.286-.214-.37.021-.571.229-.778.193-.193.429-.5.643-.75.214-.25.286-.429.429-.714.143-.286.071-.536-.036-.75-.107-.214-.964-2.321-1.321-3.179-.357-.839-.714-.714-.964-.714h-.821c-.286 0-.75.107-1.143.536-.393.429-1.5 1.464-1.5 3.571s1.536 4.143 1.75 4.428c.214.286 3.036 4.643 7.375 6.518 4.339 1.875 4.339 1.25 5.125 1.161.786-.089 2.536-1.036 2.911-2.036.375-1 .375-1.857.268-2.036-.107-.179-.393-.268-.821-.482zM12 2C6.486 2 2 6.486 2 12c0 1.84.514 3.553 1.408 5.03L2.01 22l5.056-1.32C8.619 21.6 10.284 22 12 22c5.514 0 10-4.486 10-10S17.514 2 12 2z" />
                </svg>
            </a>
        </div>
    );
};

export default OurAgents;
