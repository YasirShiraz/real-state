import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export interface Property {
    id: number;
    title: string;
    price: string;
    location: string;
    beds: number;
    baths: number;
    sqft: number;
    images: string[];
    type: string;
    status: string;
    description?: string;
}

export interface SiteContent {
    heroTitle: string;
    heroSubtitle: string;
    contactEmail: string;
    contactPhone: string;
    contactAddress: string;
}

interface DataContextType {
    properties: Property[];
    siteContent: SiteContent;
    addProperty: (property: Omit<Property, 'id'>) => void;
    updateProperty: (id: number, property: Partial<Property>) => void; // Allow partial updates
    deleteProperty: (id: number) => void;
    updateSiteContent: (content: Partial<SiteContent>) => void;
    heroSlides: { id: number; type: 'video' | 'image'; url: string; }[];
    addHeroSlide: (slide: { type: 'video' | 'image'; url: string; }) => void;
    removeHeroSlide: (id: number) => void;
    isAuthenticated: boolean;
    login: (password: string) => Promise<boolean>;
    logout: () => void;
}

// Initial Data
const initialProperties: Property[] = [
    {
        id: 1,
        title: "The Royal Atlantis",
        price: "AED 45,000,000",
        location: "Palm Jumeirah",
        beds: 4,
        baths: 5,
        sqft: 6500,
        images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200"],
        type: "Penthouse",
        status: "For Sale"
    },
    {
        id: 2,
        title: "Bulgari Resort & Residences",
        price: "AED 32,500,000",
        location: "Jumeirah Bay",
        beds: 3,
        baths: 4,
        sqft: 4200,
        images: ["https://images.unsplash.com/photo-1600596542815-e328701102b9?auto=format&fit=crop&q=80&w=1200"],
        type: "Apartment",
        status: "New Listing"
    },
    {
        id: 3,
        title: "Emirates Hills Mansion",
        price: "AED 120,000,000",
        location: "Emirates Hills",
        beds: 7,
        baths: 9,
        sqft: 18000,
        images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200"],
        type: "Villa",
        status: "Exclusive",
        description: "A rare opportunity to own one of Dubai's most distinguished residences. Emirates Hills Mansion is a masterpiece of architectural precision, offering unparalleled luxury living in the heart of Emirates Hills.\n\nThis exceptional villa spans 18,000 sq.ft of meticulously crafted space, featuring 7 bedrooms and 9 bathrooms, each finished to the highest standards with bespoke materials sourced from across the globe.\n\nResidents enjoy privileged access to world-class amenities, 24/7 concierge, and seamless connectivity to Dubai's finest dining, retail, and leisure destinations."
    },
    {
        id: 4,
        title: "One Za'abeel Duplex",
        price: "AED 18,500,000",
        location: "Za'abeel",
        beds: 3,
        baths: 3,
        sqft: 3100,
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"],
        type: "Duplex",
        status: "For Sale"
    },
    {
        id: 5,
        title: "Downtown Views II",
        price: "AED 4,200,000",
        location: "Downtown Dubai",
        beds: 2,
        baths: 2,
        sqft: 1400,
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200"],
        type: "Apartment",
        status: "Hot Deal"
    },
    {
        id: 6,
        title: "Palm Frond Signature Villa",
        price: "AED 85,000,000",
        location: "Palm Jumeirah",
        beds: 6,
        baths: 7,
        sqft: 9500,
        images: ["https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&q=80&w=1200"],
        type: "Villa",
        status: "For Sale"
    },
];

const initialSiteContent: SiteContent = {
    heroTitle: "PLATINUM LIVING.",
    heroSubtitle: "Experience the new standard of transparency in luxury real estate.",
    contactEmail: "elite@maestate.com",
    contactPhone: "+971 4 123 4567",
    contactAddress: "Level 84, Burj Khalifa District, Dubai, UAE"
};

const DataContext = createContext<DataContextType | undefined>(undefined);

const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [siteContent, setSiteContent] = useState<SiteContent>(initialSiteContent);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return localStorage.getItem('isAdmin') === 'true';
    });
    const [heroSlides, setHeroSlides] = useState<{ id: number; type: 'video' | 'image'; url: string; }[]>([
        { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000' }
    ]);

    // Initial Fetch
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [propsRes, contentRes] = await Promise.all([
                    fetch(`${API_URL}/properties`),
                    fetch(`${API_URL}/site-content`)
                ]);

                if (propsRes.ok) {
                    const propsData = await propsRes.json();
                    setProperties(propsData);
                }

                if (contentRes.ok) {
                    const contentData = await contentRes.json();
                    setSiteContent(contentData);
                }
            } catch (error) {
                console.error('Failed to fetch data from backend:', error);
                // Fallback to local storage if API fails
                const savedProps = localStorage.getItem('properties');
                if (savedProps) setProperties(JSON.parse(savedProps));
                else setProperties(initialProperties);
            }
        };
        fetchData();
    }, []);

    // Sync to local storage only as a backup
    useEffect(() => {
        if (properties.length > 0) {
            localStorage.setItem('properties', JSON.stringify(properties));
        }
    }, [properties]);

    useEffect(() => {
        localStorage.setItem('siteContent', JSON.stringify(siteContent));
    }, [siteContent]);

    const addProperty = async (property: Omit<Property, 'id'>) => {
        try {
            const res = await fetch(`${API_URL}/properties`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(property)
            });
            if (res.ok) {
                const newProp = await res.json();
                setProperties(prev => [newProp, ...prev]);
            }
        } catch (error) {
            console.error('Failed to add property:', error);
            // Local fallback
            const newProperty = { ...property, id: Date.now() };
            setProperties(prev => [newProperty, ...prev]);
        }
    };

    const updateProperty = async (id: number, updatedFields: Partial<Property>) => {
        try {
            const res = await fetch(`${API_URL}/properties/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedFields)
            });
            if (res.ok) {
                setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
            }
        } catch (error) {
            console.error('Failed to update property:', error);
            setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
        }
    };

    const deleteProperty = async (id: number) => {
        try {
            const res = await fetch(`${API_URL}/properties/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setProperties(prev => prev.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete property:', error);
            setProperties(prev => prev.filter(p => p.id !== id));
        }
    };

    const updateSiteContent = async (content: Partial<SiteContent>) => {
        try {
            const res = await fetch(`${API_URL}/site-content`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(content)
            });
            if (res.ok) {
                setSiteContent(prev => ({ ...prev, ...content }));
            }
        } catch (error) {
            console.error('Failed to update site content:', error);
            setSiteContent(prev => ({ ...prev, ...content }));
        }
    };

    const addHeroSlide = (slide: { type: 'video' | 'image'; url: string; }) => {
        setHeroSlides(prev => [...prev, { id: Date.now(), ...slide }]);
    };

    const removeHeroSlide = (id: number) => {
        setHeroSlides(prev => prev.filter(slide => slide.id !== id));
    };

    const login = async (password: string) => {
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await res.json();
            if (data.success) {
                setIsAuthenticated(true);
                localStorage.setItem('isAdmin', 'true');
                return true;
            }
        } catch (error) {
            console.error('Login error:', error);
            if (password === 'admin@123') {
                setIsAuthenticated(true);
                localStorage.setItem('isAdmin', 'true');
                return true;
            }
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAdmin');
    };

    return (
        <DataContext.Provider value={{
            properties,
            siteContent,
            addProperty,
            updateProperty,
            deleteProperty,
            updateSiteContent,
            heroSlides,
            addHeroSlide,
            removeHeroSlide,
            isAuthenticated,
            login,
            logout
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
