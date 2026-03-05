import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact: React.FC = () => {
    const { t, isRTL } = useLanguage();
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[50vh] w-full bg-black overflow-hidden flex items-center justify-center">
                <img
                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1920"
                    alt="Contact Us"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 text-center px-container">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[#DAA520] text-xs font-bold tracking-[0.2em] uppercase mb-4 block"
                    >
                        {t('getInTouch')}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold text-white tracking-tight uppercase"
                    >
                        {t('contact').split(' ').slice(0, 1)} <span className="font-light">{t('contact').split(' ').slice(1).join(' ')}</span>
                    </motion.h1>
                </div>
            </div>

            <div className="section-container py-section">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Contact Information */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-4xl font-light text-black mb-6">
                                {t('letsStartConversation').split(' ').slice(0, -1).join(' ')} <br />
                                <span className="font-bold">{t('letsStartConversation').split(' ').slice(-1)}</span>
                            </h2>
                            <p className="text-gray-500 leading-relaxed text-lg font-light">
                                Whether you're looking to buy, sell, or rent, our team of experts is ready to assist you.
                                Visit our office for a cup of coffee and a consultation.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 bg-[#f5f5f5] rounded-full flex items-center justify-center group-hover:bg-[#DAA520] transition-colors duration-500">
                                    <MapPin size={20} className="text-black group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest mb-2">{t('headOffice')}</h3>
                                    <p className="text-gray-500 leading-relaxed">
                                        Office no 1, Tasmeer Residence, JVC <br />
                                        Dubai, United Arab Emirates
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 bg-[#f5f5f5] rounded-full flex items-center justify-center group-hover:bg-[#DAA520] transition-colors duration-500">
                                    <MapPin size={20} className="text-black group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest mb-2">{t('branchOffice')}</h3>
                                    <p className="text-gray-500 leading-relaxed">
                                        Office 102, Pinnacle Building, Al Barsha 1 <br />
                                        Sheikh Zayed Road, Dubai
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 bg-[#f5f5f5] rounded-full flex items-center justify-center group-hover:bg-[#DAA520] transition-colors duration-500">
                                    <Phone size={20} className="text-black group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest mb-2">{t('phone')}</h3>
                                    <p className="text-gray-500 leading-relaxed hover:text-[#DAA520] transition-colors cursor-pointer">
                                        +971 58 558 9001
                                    </p>
                                    <p className="text-gray-500 leading-relaxed hover:text-[#DAA520] transition-colors cursor-pointer">
                                        +971 45 831 920
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-12 h-12 bg-[#f5f5f5] rounded-full flex items-center justify-center group-hover:bg-[#DAA520] transition-colors duration-500">
                                    <Mail size={20} className="text-black group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest mb-2">{t('email')}</h3>
                                    <p className="text-gray-500 leading-relaxed hover:text-[#DAA520] transition-colors cursor-pointer">
                                        sales@maestate.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-[#f9f9f9] p-10 md:p-14 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#DAA520]/10 rounded-bl-full" />

                        <h3 className="text-2xl font-bold uppercase tracking-tight mb-8">{t('sendAMessage')}</h3>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">{t('firstName')}</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white border-none p-4 rounded-lg focus:ring-2 focus:ring-[#DAA520]/20 outline-none transition-all"
                                        placeholder="John"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">{t('lastName')}</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white border-none p-4 rounded-lg focus:ring-2 focus:ring-[#DAA520]/20 outline-none transition-all"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">{t('emailAddress')}</label>
                                <input
                                    type="email"
                                    className="w-full bg-white border-none p-4 rounded-lg focus:ring-2 focus:ring-[#DAA520]/20 outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">{t('phoneNumber')}</label>
                                <input
                                    type="tel"
                                    className="w-full bg-white border-none p-4 rounded-lg focus:ring-2 focus:ring-[#DAA520]/20 outline-none transition-all"
                                    placeholder="+971 50 000 0000"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">{t('message')}</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-white border-none p-4 rounded-lg focus:ring-2 focus:ring-[#DAA520]/20 outline-none transition-all resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <button className="w-full bg-black text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-[#DAA520] transition-colors duration-300 flex items-center justify-center gap-2">
                                <span>{t('sendMessage')}</span>
                                <Send size={16} className={isRTL ? 'rotate-180' : ''} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className="w-full h-[500px] grayscale hover:grayscale-0 transition-all duration-700">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462562.9238914616!2d54.89782536841121!3d25.0757271891965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43403aee23db%3A0xce2a2ec4c8872c!2sDubai!5e0!3m2!1sen!2sae!4v1709477380000!5m2!1sen!2sae"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
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

export default Contact;
