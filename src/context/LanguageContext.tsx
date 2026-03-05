import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'EN' | 'AR' | 'RU' | 'ZH';

interface Translations {
    [key: string]: {
        [K in Language]: string;
    };
}

const translations: Translations = {
    // Navbar
    home: { EN: 'Home', AR: 'الرئيسية', RU: 'Главная', ZH: '首页' },
    properties: { EN: 'Our Properties', AR: 'عقاراتنا', RU: 'Наши объекты', ZH: '我们的房产' },
    services: { EN: 'Services', AR: 'خدماتنا', RU: 'Услуги', ZH: '服务' },
    communities: { EN: 'Communities', AR: 'المجمعات', RU: 'Сообщества', ZH: '社区' },
    aboutUs: { EN: 'About Us', AR: 'من نحن', RU: 'О нас', ZH: '关于我们' },
    contact: { EN: 'Contact', AR: 'اتصل بنا', RU: 'Контакт', ZH: '联系我们' },
    bookConsultation: { EN: 'Book Consultation', AR: 'حجز استشارة', RU: 'Записаться на консультацию', ZH: '预约咨询' },

    // Hero
    platinumLiving: { EN: 'PLATINUM LIVING.', AR: 'عيش بلاتيني.', RU: 'ПЛАТИНОВАЯ ЖИЗНЬ.', ZH: '铂金生活。' },
    heroSubtitle: {
        EN: 'Experience the new standard of transparency in luxury real estate.',
        AR: 'اختبر المعيار الجديد للشفافية في العقارات الفاخرة.',
        RU: 'Ощутите новый стандарт прозрачности в элитной недвижимости.',
        ZH: '体验豪华房地产透明度的新标准。'
    },
    scrollExplore: { EN: 'Scroll to Explore', AR: 'مرر للاستكشاف', RU: 'Листайте далее', ZH: '向下滚动探索' },

    // Stats
    transVolume: { EN: 'TRANSACTION VOLUME', AR: 'حجم المعاملات', RU: 'ОБЪЕМ СДЕЛОК', ZH: '交易额' },
    activeListings: { EN: 'ACTIVE LISTINGS', AR: 'العقارات المعروضة', RU: 'АКТИВНЫЕ ОБЪЕКТЫ', ZH: '活跃房源' },
    growth: { EN: 'PROJECTED GROWTH', AR: 'النمو المتوقع', RU: 'ПРОГНОЗ РОСТА', ZH: '预计增长' },

    // Sections
    architecture: { EN: 'Architecture', AR: 'الهندسة المعمارية', RU: 'Архитектура', ZH: '建筑' },
    artOfMastery: { EN: 'THE ART OF ARCHITECTURAL MASTERY', AR: 'فن الإتقان المعماري', RU: 'ИСКУССТВО АРХИТЕКТУРНОГО МАСТЕРСТВА', ZH: '建筑大师的艺术' },
    unrivaledEstates: { EN: 'UNRIVALED ESTATES.', AR: 'عقارات لا مثيل لها.', RU: 'НЕПРЕВЗОЙДЕННЫЕ ПОМЕСТЬЯ.', ZH: '无与伦比的庄园。' },
    matrixGuide: { EN: 'THE MATRIX GUIDE.', AR: 'دليل ماتريكس.', RU: 'ГИД МАТРИЦА.', ZH: '矩阵指南。' },

    // Footer
    globalPresence: { EN: 'Global Presence', AR: 'تواجد عالمي', RU: 'Глобальное присутствие', ZH: '全球业务' },
    curations: { EN: 'Curations', AR: 'مختاراتنا', RU: 'Подборки', ZH: '精选房源' },
    intelligence: { EN: 'Intelligence', AR: 'الذكاء العقاري', RU: 'Аналитика', ZH: '情报' },
    achievements: { EN: 'Achievements', AR: 'الإنجازات', RU: 'Достижения', ZH: '成就' },
    ourStats: { EN: 'OUR STATS', AR: 'إحصائياتنا', RU: 'НАША СТАТИСТИКА', ZH: '我们的统计数据' },
    happyClients: { EN: 'Happy Clients', AR: 'عملاء سعداء', RU: 'Счастливых клиентов', ZH: '快乐客户' },
    propertiesSold: { EN: 'Properties Sold', AR: 'عقارات مباعة', RU: 'Объектов продано', ZH: '房产已售' },
    yearsExperience: { EN: 'Years Experience', AR: 'سنوات الخبرة', RU: 'Лет опыта', ZH: '多年经验' },
    theCollection: { EN: 'The Collection', AR: 'المجموعة العقارية', RU: 'Коллекция', ZH: '收藏房源' },
    curatedEstates: { EN: 'Curated Estates.', AR: 'عقارات مختارة.', RU: 'Курируемые поместья.', ZH: '精选房产。' },
    search: { EN: 'SEARCH...', AR: 'بحث...', RU: 'ПОИСК...', ZH: '搜索...' },
    exploreResidence: { EN: 'Explore Residence', AR: 'استكشف المسكن', RU: 'Исследовать объект', ZH: '探索住宅' },
    contactUs: { EN: 'Contact Us', AR: 'اتصل بنا', RU: 'Связаться с нами', ZH: '联系我们' },
    readMore: { EN: 'Read More', AR: 'اقرأ المزيد', RU: 'Читать далее', ZH: '阅读更多' },
    joinUs: { EN: 'Join Us', AR: 'انضم إلينا', RU: 'Присоединиться', ZH: '加入我们' },
    exploreEstate: { EN: 'EXPLORE ESTATE', AR: 'استكشف العقارات', RU: 'ИССЛЕДОВАТЬ', ZH: '探索房产' },
    buy: { EN: 'Buy', AR: 'شراء', RU: 'Купить', ZH: '购买' },
    rent: { EN: 'Rent', AR: 'إيجار', RU: 'Аренда', ZH: '租赁' },
    sell: { EN: 'Sell', AR: 'بيع', RU: 'Продать', ZH: '出售' },
    newProjects: { EN: 'New Projects', AR: 'مشاريع جديدة', RU: 'Новые проекты', ZH: '新项目' },
    trends: { EN: 'Trends', AR: 'الاتجاهات', RU: 'Тренды', ZH: '趋势' },
    explore: { EN: 'Explore', AR: 'استكشف', RU: 'Исследовать', ZH: '探索' },
    valuation: { EN: 'Valuation', AR: 'التقييم', RU: 'Оценка', ZH: '估价' },
    marketTrends: { EN: 'Market Trends', AR: 'اتجاهات السوق', RU: 'Тренды рынка', ZH: '市场趋势' },
    liveValuation: { EN: 'Live Valuation', AR: 'تقييم حي', RU: 'Живая оценка', ZH: '实时估价' },
    intelligenceMatrix: { EN: 'Intelligence Matrix', AR: 'مصفوفة الذكاء', RU: 'Матрица аналитики', ZH: '情报矩阵' },
    getFullReport: { EN: 'Get Full Report', AR: 'الحصول على التقرير الكامل', RU: 'Получить отчет', ZH: '获取完整报告' },
    communitiesTitle: { EN: 'COMMUNITIES', AR: 'المجمعات', RU: 'СООБЩЕСТВА', ZH: '社区' },
    ourCommunities: { EN: 'Our Communities', AR: 'مجمعاتنا', RU: 'Наши сообщества', ZH: '我们的社区' },
    searchFeatured: { EN: 'SEARCH FEATURED', AR: 'بحث في المجمعات المميزة', RU: 'ПОИСК СООБЩЕСТВ', ZH: '搜索精选社区' },
    searchCommunitiesPlaceholder: { EN: 'Search by City, Address, Zipcode...', AR: 'البحث عن طريق المدينة، العنوان، الرمز البريدي...', RU: 'Поиск по городу, адресу, индексу...', ZH: '按城市、地址、邮政编码搜索...' },
    getInTouch: { EN: 'Get In Touch', AR: 'ابق على تواصل', RU: 'Связаться с нами', ZH: '保持联系' },
    letsStartConversation: { EN: "LET'S START A CONVERSATION", AR: 'لنبدأ محادثة', RU: 'ДАВАЙТЕ НАЧНЕМ РАЗГОВОР', ZH: '让我们开始对话' },
    headOffice: { EN: 'Head Office', AR: 'المكتب الرئيسي', RU: 'Головной офис', ZH: '总公司' },
    branchOffice: { EN: 'Branch Office', AR: 'فرع المكتب', RU: 'Филиал', ZH: '分公司' },
    sendAMessage: { EN: 'Send a Message', AR: 'أرسل رسالة', RU: 'Отправить сообщение', ZH: '发送信息' },
    firstName: { EN: 'First Name', AR: 'الاسم الأول', RU: 'Имя', ZH: '名字' },
    lastName: { EN: 'Last Name', AR: 'اسم العائلة', RU: 'Фамилия', ZH: '姓氏' },
    message: { EN: 'Message', AR: 'الرسالة', RU: 'Сообщение', ZH: '信息' },
    sendMessage: { EN: 'Send Message', AR: 'إرسال الرسالة', RU: 'Отправить', ZH: '发送' },
    globalAwards: { EN: 'Global Awards', AR: 'جوائز عالمية', RU: 'Мировые награды', ZH: '全球奖项' },
    marketDominance: { EN: 'Market Dominance', AR: 'هيمنة السوق', RU: 'Лидерство на рынке', ZH: '市场领先' },
    signatureSeries: { EN: 'Signature Series', AR: 'سلسلة التوقيع', RU: 'Подписная серия', ZH: '签名系列' },
    bespokeDesign: { EN: 'Bespoke Design', AR: 'تصميم مخصص', RU: 'Индивидуальный дизайн', ZH: '定制设计' },
    discoveryCollection: { EN: 'Discovery Collection', AR: 'مجموعة الاكتشاف', RU: 'Коллекция открытий', ZH: '探索系列' },
    dataIntelligence: { EN: 'Data Intelligence', AR: 'ذكاء البيانات', RU: 'Анализ данных', ZH: '数据情报' },
    estateProfile: { EN: 'ESTATE PROFILE', AR: 'ملف العقار', RU: 'ПРОФИЛЬ ОБЪЕКТА', ZH: '房产概况' },
    connect: { EN: 'Connect', AR: 'اتصل', RU: 'Связаться', ZH: '连接' },
    skyPalaces: { EN: 'Sky Palaces', AR: 'قصور السماء', RU: 'Небесные дворцы', ZH: '空中宫殿' },
    privateIslands: { EN: 'Private Islands', AR: 'جزر خاصة', RU: 'Частные острова', ZH: '私人岛屿' },
    goldenYields: { EN: 'Golden Yields', AR: 'عوائد ذهبية', RU: 'Золотая доходность', ZH: '黄金收益' },
    offPlanElite: { EN: 'Off-Plan Elite', AR: 'نخبة قيد الإنشاء', RU: 'Элитные новостройки', ZH: '精选期房' },
    roiReports: { EN: 'ROI Reports', AR: 'تقارير العائد', RU: 'Отчеты о доходности', ZH: '投资回报报告' },
    marketMatrix: { EN: 'Market Matrix', AR: 'مصفوفة السوق', RU: 'Матрица рынка', ZH: '市场矩阵' },
    valuationAI: { EN: 'Valuation AI', AR: 'تقييم الذكاء الاصطناعي', RU: 'ИИ-оценка', ZH: '人工智能估值' },
    strategicAdvisory: { EN: 'Strategic Advisory', AR: 'استشارات استراتيجية', RU: 'Стратегический консалтинг', ZH: '战略咨询' },
    privacyLexicon: { EN: 'Privacy Lexicon', AR: 'قاموس الخصوصية', RU: 'Словарь конфиденциальности', ZH: '隐私条款' },
    strategicTerms: { EN: 'Strategic Terms', AR: 'الشروط الاستراتيجية', RU: 'Стратегические условия', ZH: '战略条款' },
    eliteBrokerage: { EN: 'Elite Brokerage', AR: 'وساطة نخبوية', RU: 'Элитный брокеридж', ZH: '精英经纪' },
    sellingMasterpieces: { EN: 'Selling Masterpieces.', AR: 'بيع الروائع المعمارية.', RU: 'Продаем шедевры.', ZH: '销售杰作。' },
    theArtOfTheDeal: { EN: 'The Art of The Deal.', AR: 'فن الصفقة.', RU: 'Искусство сделки.', ZH: '交易的艺术。' },
    ourProcess: { EN: 'Our Process', AR: 'عمليتنا', RU: 'Наш процесс', ZH: '我们的流程' },
    requestValuation: { EN: 'Request Valuation', AR: 'طلب تقييم', RU: 'Запросить оценку', ZH: '请求估值' },
    precisionValuation: { EN: 'Precision Valuation', AR: 'تقييم دقيق', RU: 'Точная оценка', ZH: '精确估值' },
    marketIntelligence: { EN: 'Market Intelligence', AR: 'ذكاء السوق', RU: 'Рыночная аналитика', ZH: '市场情报' },
    dataDrivenAccuracy: { EN: 'Data-Driven Accuracy', AR: 'دقة مبنية على البيانات', RU: 'Точность на основе данных', ZH: '数据驱动的准确性' },
    requestAppraisal: { EN: 'Request Appraisal', AR: 'طلب تثمين', RU: 'Запросить расчет', ZH: '请求评定' },
    getEstimate: { EN: 'Get Estimate', AR: 'احصل على تقدير', RU: 'Получить расчет', ZH: '获取评估' },
    curatedLiving: { EN: 'Curated Living.', AR: 'عيش مختار.', RU: 'Кураторская жизнь.', ZH: '精选生活。' },
    premiumLeasing: { EN: 'Premium Leasing', AR: 'تأجير مميز', RU: 'Премиальная аренда', ZH: '优质租赁' },
    forTenants: { EN: 'For Tenants', AR: 'للمستأجرين', RU: 'Для арендаторов', ZH: '面向租客' },
    forLandlords: { EN: 'For Landlords', AR: 'للملاك', RU: 'Для арендодателей', ZH: '面向业主' },
    findAHome: { EN: 'Find a Home', AR: 'ابحث عن منزل', RU: 'Найти дом', ZH: '寻家' },
    listWithUs: { EN: 'List With Us', AR: 'أدرج عقارك معنا', RU: 'Разместить у нас', ZH: '与我们合作挂牌' },
    assetCare: { EN: 'Asset Care', AR: 'رعاية الأصول', RU: 'Забота об активах', ZH: '资产护理' },
    propertyManagementTitle: { EN: 'Property Management', AR: 'إدارة العقارات', RU: 'Управление недвижимостью', ZH: '物业管理' },
    readyToOptimize: { EN: 'Ready to Optimize Your Asset?', AR: 'هل أنت مستعد لتحسين أصولك؟', RU: 'Готовы оптимизировать свой актив?', ZH: '准备好优化您的资产了吗？' },
    speakWithManager: { EN: 'Speak with a Manager', AR: 'تحدث مع مدير', RU: 'Поговорить с менеджером', ZH: '与经理交谈' },
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const saved = localStorage.getItem('language');
        return (saved as Language) || 'EN';
    });

    const isRTL = language === 'AR';

    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        document.documentElement.lang = language.toLowerCase();
    }, [language, isRTL]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    const t = (key: string) => {
        return translations[key]?.[language] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
            <div className={isRTL ? 'font-arabic' : ''}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within LanguageProvider');
    return context;
};
