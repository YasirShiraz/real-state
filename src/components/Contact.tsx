import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const inputCls = `w-full bg-[#1A1A1A] border border-white/10 rounded-none px-5 py-4 text-white font-medium placeholder:text-white/20 placeholder:italic placeholder:font-light
  focus:border-[var(--gold)] focus:bg-[#222222] outline-none transition-all duration-300 text-sm shadow-inner`;

const Contact: React.FC = () => {
    const { t, isRTL } = useLanguage();
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    };

    const contactItems = [
        {
            icon: MapPin,
            label: t('headOffice'),
            lines: ['Office no 1, Tasmeer Residence, JVC', 'Dubai, United Arab Emirates'],
        },
        {
            icon: MapPin,
            label: t('branchOffice'),
            lines: ['Office 102, Pinnacle Building, Al Barsha 1', 'Sheikh Zayed Road, Dubai'],
        },
        {
            icon: Phone,
            label: t('phone'),
            lines: ['+971 58 558 9001', '+971 45 831 920'],
        },
        {
            icon: Mail,
            label: t('email'),
            lines: ['sales@maestate.com'],
        },
    ];

    return (
        <div className="bg-[#080808] min-h-screen text-white selection:bg-[var(--gold)] selection:text-black">

            {/* ── Hero ── */}
            <div className="relative h-[45vh] w-full overflow-hidden flex items-end justify-center pb-16">
                <img
                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1920"
                    alt="Contact Us"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/20 via-transparent to-[#080808]" />

                <div className="relative z-10 text-center px-6">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="text-[var(--gold)] text-[10px] font-black tracking-[0.6em] uppercase mb-4 block">
                        {t('getInTouch')}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                        className="text-5xl md:text-7xl font-bold text-white tracking-[-0.03em] uppercase">
                        {t('contact').split(' ').slice(0, 1)}{' '}
                        <span className="font-light italic opacity-70">{t('contact').split(' ').slice(1).join(' ')}</span>
                    </motion.h1>
                </div>
            </div>

            {/* ── Main Grid ── */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                {/* ── Left: Info ── */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
                    className="space-y-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            {t('letsStartConversation').split(' ').slice(0, -1).join(' ')}{' '}
                            <span className="text-[var(--gold)]">{t('letsStartConversation').split(' ').slice(-1)}</span>
                        </h2>
                        <p className="text-white/40 leading-relaxed text-lg font-light max-w-md">
                            Whether you're looking to buy, sell, or rent, our team of experts is ready to assist.
                            Visit us for a consultation over coffee.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {contactItems.map(({ icon: Icon, label, lines }, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                                className="flex items-start gap-5 group">
                                <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-white/5 border border-white/8
                                    flex items-center justify-center group-hover:bg-[var(--gold)] group-hover:border-[var(--gold)]
                                    transition-all duration-300">
                                    <Icon size={18} className="text-white/50 group-hover:text-black transition-colors duration-300" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30 mb-1">{label}</p>
                                    {lines.map((line, j) => (
                                        <p key={j} className="text-white/70 text-sm leading-relaxed hover:text-[var(--gold)] transition-colors cursor-pointer">
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Divider accent */}
                    <div className="flex items-center gap-4 pt-4">
                        <div className="h-[1px] w-12 bg-[var(--gold)]/40" />
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Available 24/7</span>
                        <div className="h-[1px] flex-1 bg-white/5" />
                    </div>

                    {/* WhatsApp CTA */}
                    <a
                        href="https://wa.me/971585589001"
                        target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/20 px-6 py-4 rounded-2xl
                            hover:bg-[#25D366]/20 hover:border-[#25D366]/40 transition-all group">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#25D366]">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03c0 2.119.553 4.187 1.605 5.952L0 24l6.12-1.605a11.802 11.802 0 005.923 1.577h.004c6.635 0 12.032-5.395 12.036-12.033A11.83 11.83 0 0012.05h.004z" />
                        </svg>
                        <span className="text-[#25D366] text-xs font-black uppercase tracking-widest group-hover:text-white transition-colors">
                            Chat on WhatsApp
                        </span>
                        <ArrowRight size={14} className="text-[#25D366]/50 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>

                {/* ── Right: Form ── */}
                <motion.div
                    className="w-full"
                    initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
                    <div className="w-full relative">

                        <div className="relative">
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--gold)] mb-2">Direct Inquiry</p>
                            <h3 className="text-2xl font-bold uppercase tracking-tight mb-8">{t('sendAMessage')}</h3>

                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                        className="flex flex-col items-center justify-center py-20 text-center gap-5">
                                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20">
                                            <CheckCircle2 size={36} className="text-emerald-400" />
                                        </div>
                                        <h4 className="text-xl font-bold text-white">Message Sent!</h4>
                                        <p className="text-white/40 text-sm max-w-xs leading-relaxed">
                                            Thank you for reaching out. Our team will get back to you within 24 hours.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-6">
                                        {/* Name row */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-2.5">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 ml-1">
                                                    {t('firstName')}
                                                </label>
                                                <input
                                                    type="text" required
                                                    value={form.firstName}
                                                    onChange={e => setForm({ ...form, firstName: e.target.value })}
                                                    className={inputCls} placeholder="Type your first name..." />
                                            </div>
                                            <div className="space-y-2.5">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 ml-1">
                                                    {t('lastName')}
                                                </label>
                                                <input
                                                    type="text" required
                                                    value={form.lastName}
                                                    onChange={e => setForm({ ...form, lastName: e.target.value })}
                                                    className={inputCls} placeholder="Type your last name..." />
                                            </div>
                                        </div>

                                        <div className="space-y-2.5">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 ml-1">
                                                {t('emailAddress')}
                                            </label>
                                            <input
                                                type="email" required
                                                value={form.email}
                                                onChange={e => setForm({ ...form, email: e.target.value })}
                                                className={inputCls} placeholder="Type your email address..." />
                                        </div>

                                        <div className="space-y-2.5">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 ml-1">
                                                {t('phoneNumber')}
                                            </label>
                                            <input
                                                type="tel"
                                                value={form.phone}
                                                onChange={e => setForm({ ...form, phone: e.target.value })}
                                                className={inputCls} placeholder="Type your phone number..." />
                                        </div>

                                        <div className="space-y-2.5">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 ml-1">
                                                {t('message')}
                                            </label>
                                            <textarea
                                                rows={4} required
                                                value={form.message}
                                                onChange={e => setForm({ ...form, message: e.target.value })}
                                                className={`${inputCls} resize-none`}
                                                placeholder="Type your message here..." />
                                        </div>

                                        <div className="pt-4">
                                            <motion.button
                                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                                type="submit"
                                                className="w-full bg-[var(--gold)] text-black py-4 rounded-none font-black uppercase
                                                    tracking-[0.3em] text-[10px] flex items-center justify-center gap-3
                                                    hover:bg-[var(--gold-light)] transition-all duration-300
                                                    shadow-[0_10px_30px_rgba(212,175,55,0.2)]">
                                                <span>{t('sendMessage')}</span>
                                                <Send size={15} className={isRTL ? 'rotate-180' : ''} />
                                            </motion.button>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ── Map ── */}
            <div className="w-full h-[420px] grayscale hover:grayscale-0 transition-all duration-700 border-t border-white/5">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462562.9238914616!2d54.89782536841121!3d25.0757271891965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43403aee23db%3A0xce2a2ec4c8872c!2sDubai!5e0!3m2!1sen!2sae!4v1709477380000!5m2!1sen!2sae"
                    width="100%" height="100%"
                    style={{ border: 0 }}
                    allowFullScreen loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>

            {/* WhatsApp FAB */}
            <a
                href="https://wa.me/971585589001"
                target="_blank" rel="noopener noreferrer"
                className="fixed bottom-8 left-8 z-[100] bg-[#25D366] text-white p-4 rounded-full
                    shadow-[0_15px_35px_rgba(37,211,102,0.4)] hover:bg-[#20b858] transition-all
                    hover:scale-110 active:scale-95"
                title="Chat with us on WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03c0 2.119.553 4.187 1.605 5.952L0 24l6.12-1.605a11.802 11.802 0 005.923 1.577h.004c6.635 0 12.032-5.395 12.036-12.033A11.83 11.83 0 0012.05h.004z" />
                </svg>
            </a>
        </div>
    );
};

export default Contact;
