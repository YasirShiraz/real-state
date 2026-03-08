import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const AboutUs: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="bg-white min-h-screen">

            {/* Cinematic Hero Section */}
            <div className="relative h-[65vh] w-full bg-black overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920"
                        alt="Office Meeting"
                        loading="lazy"
                        className="w-full h-full object-cover opacity-50 scale-105"
                        style={{ animation: 'slowZoom 20s ease-in-out infinite alternate' }}
                    />
                </div>

                {/* Vertical Lines Decoration */}
                <div className="absolute inset-0 pointer-events-none flex justify-between px-[10%] opacity-10">
                    <div className="w-[1px] h-full bg-white/30" />
                    <div className="w-[1px] h-full bg-white/30" />
                    <div className="w-[1px] h-full bg-white/30" />
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center text-center px-container w-full max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <span className="text-[var(--gold)] font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs">
                            MA Estate
                        </span>
                        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white tracking-tighter uppercase leading-[1.1]">
                            {t('aboutUs').split(' ').slice(0, -1).join(' ')} <br />
                            <span className="italic font-serif font-light text-white/80">
                                {t('aboutUs').split(' ').slice(-1)}
                            </span>
                        </h1>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="w-24 h-[1px] bg-[var(--gold)]"
                        />
                        <p className="text-white/50 text-xs md:text-sm font-medium tracking-[0.2em] uppercase">
                            Redefining Luxury Real Estate in the UAE
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* We Love Where We Live */}
            <section className="section-container py-section">
                <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center">
                    <motion.div
                        className="flex-1 flex flex-col items-center text-center w-full"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[var(--gold)] text-[10px] font-black uppercase tracking-[0.4em] block mb-4 mx-auto">About Us</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight tracking-tighter uppercase mx-auto">
                            We Love <br />
                            <span className="italic font-serif font-light">Where We Live</span>
                        </h2>
                        <div className="w-16 h-[1px] bg-[var(--gold)] mb-8 mx-auto" />
                        <p className="text-gray-500 leading-relaxed mb-10 text-center max-w-2xl mx-auto">
                            Our mission is to modernize and progress the experience of buying and selling real estate
                            by cultivating a spirit of collaboration, innovation, and integrity. MA Estate fosters a
                            culture of partnership where all clients and listings are represented cooperatively,
                            ensuring our clients always have the competitive edge.
                        </p>
                        <div className="flex gap-4 flex-wrap justify-center">
                            <button className="gold-bg text-black px-8 py-3.5 text-xs font-bold tracking-[0.25em] uppercase rounded-full hover:scale-105 hover:shadow-[0_20px_45px_rgba(212,175,55,0.5)] transition-all duration-500 shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
                                {t('contactUs')}
                            </button>
                            <button className="border border-black/15 text-black px-8 py-3.5 text-xs font-bold tracking-[0.25em] uppercase rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-300">
                                {t('readMore')}
                            </button>
                        </div>
                    </motion.div>
                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
                                className="w-full shadow-2xl rounded-[2.5rem] object-cover aspect-[4/3]"
                                alt="Building"
                                loading="lazy"
                            />
                            {/* Gold accent frame */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 border border-[var(--gold)]/30 rounded-[2rem] pointer-events-none" />
                            <div className="absolute -bottom-4 -left-4 w-16 h-16 border border-[var(--gold)]/20 rounded-[1.5rem] pointer-events-none" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Our Agents — Local & Global Experts */}
            <section className="section-container py-section">
                <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-stretch">
                    {/* Avatar grid */}
                    <motion.div
                        className="grid grid-cols-3 gap-4 self-start md:self-auto md:w-64 lg:w-80 shrink-0"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        {[
                            "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=70&w=400",
                            "https://images.unsplash.com/photo-1544723795-432537d12f6c?auto=format&fit=crop&q=70&w=400",
                            "https://images.unsplash.com/photo-1544723795-b751f29c60b2?auto=format&fit=crop&q=70&w=400",
                        ].map((src, i) => (
                            <div
                                key={i}
                                className="rounded-full overflow-hidden aspect-square border-2 border-[var(--gold)]/20 hover:border-[var(--gold)]/70 transition-all duration-500 hover:scale-105 shadow-lg"
                            >
                                <img src={src} className="w-full h-full object-cover" alt="Agent" loading="lazy" />
                            </div>
                        ))}
                    </motion.div>

                    {/* Black card — experts panel */}
                    <motion.div
                        className="flex-1 text-white min-h-[440px] flex flex-col justify-center relative overflow-hidden rounded-[3rem] group"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&q=80&w=1200"
                            className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-[10s]"
                            alt="Executive Background"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/70" />
                        {/* Gold border on hover */}
                        <div className="absolute inset-0 rounded-[3rem] border border-white/5 group-hover:border-[var(--gold)]/20 transition-colors duration-700" />

                        <div className="relative z-10 p-12 lg:p-16">
                            <span className="text-[var(--gold)] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Our Agents</span>
                            <h2 className="text-4xl lg:text-5xl font-bold mb-2 uppercase tracking-tighter leading-tight">
                                Local &amp; Global
                            </h2>
                            <h2 className="text-4xl lg:text-5xl font-bold mb-8 uppercase tracking-tighter italic font-serif font-light text-white/80">
                                Experts
                            </h2>
                            <div className="w-12 h-[1px] bg-[var(--gold)] mb-8" />
                            <p className="text-gray-300 mb-10 text-sm leading-relaxed max-w-md">
                                Our team is full of enthusiastic individuals who are ready to assist you in any real
                                estate requirement — whether finding your dream home or managing your property investment.
                            </p>
                            <button className="border border-white/20 px-8 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 rounded-full hover:shadow-2xl">
                                {t('readMore')}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Serving Our Communities */}
            <section className="section-container py-section">
                <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-center">
                    <motion.div
                        className="flex-1 order-2 md:order-1"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[var(--gold)] text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Our Service</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-black uppercase tracking-tighter leading-tight">
                            Serving <br />
                            <span className="italic font-serif font-light">Our Communities</span>
                        </h2>
                        <div className="w-16 h-[1px] bg-[var(--gold)] mb-8" />
                        <p className="text-gray-500 leading-relaxed mb-10 text-justify max-w-lg">
                            This is why we are committed to being a source of information and education to our clients.
                            We believe in helping you find the perfect community, not just a house. Our extensive local
                            knowledge ensures you are always in the know.
                        </p>
                        <button className="border border-black/15 text-black px-8 py-3.5 text-xs font-bold tracking-[0.25em] uppercase rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-300">
                            {t('readMore')}
                        </button>
                    </motion.div>
                    <motion.div
                        className="flex-1 order-1 md:order-2 relative"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&q=80&w=800"
                            className="w-full shadow-2xl z-10 relative rounded-[2.5rem] object-cover aspect-[4/3]"
                            loading="lazy"
                            alt="Community meeting"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=400"
                            className="absolute -bottom-10 -left-10 w-2/5 border-4 border-white shadow-2xl z-20 hidden md:block rounded-[2rem] object-cover aspect-square"
                            loading="lazy"
                            alt="Residential interior"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Stats — Dark Cinematic Section */}
            <section className="relative py-section text-white overflow-hidden bg-black">
                <img
                    src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover opacity-15"
                    alt="Dubai Statistics Background"
                    loading="lazy"
                />
                {/* Gold vignette glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.07)_0%,transparent_70%)]" />

                <div className="section-container text-center relative z-10 flex flex-col items-center">
                    <span className="text-[var(--gold)] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block mx-auto">{t('achievements')}</span>
                    <h2 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter uppercase leading-tight mx-auto">
                        Our <span className="italic font-serif font-light text-white/80">Stats</span>
                    </h2>
                    <div className="w-16 h-[1px] bg-[var(--gold)] mx-auto mb-16" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
                        {[
                            { value: "7500+", label: t('happyClients') },
                            { value: "3500+", label: t('propertiesSold') },
                            { value: "10+", label: t('yearsExperience') },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                className="group p-10 border border-white/8 bg-white/4 backdrop-blur-md rounded-[2.5rem] hover:border-[var(--gold)]/30 hover:bg-white/6 transition-all duration-500 text-center"
                            >
                                <div className="text-5xl md:text-6xl font-bold gold-gradient leading-tight mb-8 text-center">{stat.value}</div>
                                <div className="text-xs uppercase tracking-widest text-gray-400 text-center">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>


                </div>
            </section>

            {/* Join The Relentless */}
            <section className="section-container py-section">
                <div className="flex flex-col items-center text-center gap-16 lg:gap-24">
                    <motion.div
                        className="max-w-3xl flex flex-col items-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[var(--gold)] text-[10px] font-black uppercase tracking-[0.4em] block mb-4">Careers</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-black tracking-tighter uppercase leading-tight">
                            Join The <span className="italic font-serif font-light">Relentless</span>
                        </h2>
                        <div className="w-16 h-[1px] bg-[var(--gold)] mb-8" />
                        <p className="text-gray-500 leading-relaxed mb-10 text-center">
                            We are always looking for passionate individuals to join our growing team.
                            If you have a drive for success and a passion for real estate, we want to hear from you.
                            Become a part of our legacy.
                        </p>
                        <div className="flex gap-4 flex-wrap justify-center">
                            <button className="gold-bg text-black px-8 py-3.5 text-xs font-bold tracking-[0.25em] uppercase rounded-full hover:scale-105 hover:shadow-[0_20px_45px_rgba(212,175,55,0.5)] transition-all duration-500 shadow-[0_10px_30px_rgba(212,175,55,0.3)] flex items-center gap-2">
                                {t('joinUs')} <ArrowRight size={13} />
                            </button>
                            <button className="border border-black/15 text-black px-8 py-3.5 text-xs font-bold tracking-[0.25em] uppercase rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-300">
                                {t('readMore')}
                            </button>
                        </div>
                    </motion.div>
                    <motion.div
                        className="w-full max-w-4xl"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative overflow-hidden rounded-[2.5rem] group">
                            <img
                                src="https://images.unsplash.com/photo-1486325212027-8081648a82eb?auto=format&fit=crop&q=80&w=800"
                                className="w-full grayscale group-hover:grayscale-0 transition-all duration-700 object-cover aspect-[16/9]"
                                loading="lazy"
                                alt="Team meeting"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700 rounded-[2.5rem]" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Our Blog */}
            <section className="bg-[#fafafa] py-20 border-t border-black/4">
                <div className="section-container py-section">
                    <div className="mb-14 text-center flex flex-col items-center">
                        <span className="text-[var(--gold)] text-[10px] font-black uppercase tracking-[0.4em] block mb-4">News &amp; Events</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tighter uppercase">
                            Our <span className="italic font-serif font-light">Blog</span>
                        </h2>
                        <div className="w-16 h-[1px] bg-[var(--gold)] mt-8" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "Modern Interior", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&q=80&w=800", date: "Oct 20, 2025" },
                            { title: "Living Room Design", img: "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80&w=800", date: "Nov 15, 2025" },
                            { title: "Outdoor Spaces", img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=800", date: "Dec 05, 2025" }
                        ].map((blog, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="relative aspect-[4/5] overflow-hidden rounded-[3rem] group cursor-pointer shadow-xl"
                            >
                                <img
                                    src={blog.img}
                                    className="w-full h-full object-cover transition-transform duration-[5s] ease-out group-hover:scale-110"
                                    loading="lazy"
                                    alt={blog.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                    <div className="glass-dark backdrop-blur-3xl rounded-[2.5rem] p-7 md:p-9 border border-white/10 space-y-5 shadow-2xl group-hover:border-[var(--gold)]/20 transition-colors duration-500">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[var(--gold)] text-[10px] font-black uppercase tracking-[0.4em]">{blog.date}</span>
                                            <div className="w-10 h-[1px] bg-white/20" />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter leading-none group-hover:text-[var(--gold-light)] transition-colors">
                                            {blog.title}
                                        </h3>
                                        <p className="text-white/60 text-xs leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                            Discover the latest trends in luxury living and architectural design.
                                            Our experts share insights on how to elevate your living space.
                                        </p>
                                        <div className="flex items-center justify-between pt-3 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                                            <button className="gold-bg text-black px-7 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-all shadow-[0_10px_25px_rgba(212,175,55,0.4)]">
                                                Read Article
                                            </button>
                                            <div className="flex items-center gap-2 text-white/40">
                                                <span className="text-[9px] font-black tracking-widest uppercase">Explore</span>
                                                <ArrowRight size={14} className="group-hover:text-[var(--gold)] transition-colors" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
