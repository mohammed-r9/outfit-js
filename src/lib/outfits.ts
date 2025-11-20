export type Season = "spring" | "summer" | "autumn" | "winter"
export type OutfitSeason = Season[]
export type OutfitGender = "male" | "female"
export type OutfitProperty =
    | "layers"
    | "casual"
    | "formal"
    | "sport"
    | "street"
    | "weekend"
    | "breathable"
    | "warmth"
    | "minimal"
    | "work"
    | "travel"
    | "evening"
    | "neutral"
    | "colorful"

export interface Outfit {
    title: string
    gender: OutfitGender
    season: OutfitSeason
    properties: OutfitProperty[]
    imgSrc?: string
}

export const genderLabels: Record<OutfitGender, string> = {
    male: "رجالي",
    female: "نسائي",
}

export const seasonLabels: Record<Season, string> = {
    spring: "الربيع",
    summer: "الصيف",
    autumn: "الخريف",
    winter: "الشتاء",
}

export const propertyLabels: Record<OutfitProperty, string> = {
    layers: "طبقات",
    casual: "كاجوال",
    formal: "رسمي",
    sport: "رياضي",
    street: "أسلوب الشارع",
    weekend: "نهاية الأسبوع",
    breathable: "قماش قابل للتنفس",
    warmth: "دفء",
    minimal: "بسيط",
    work: "مكتبي",
    travel: "سفر",
    evening: "مسائي",
    neutral: "ألوان حيادية",
    colorful: "ألوان زاهية",
}

export const outfits: Outfit[] = [
    {
        title: "لمسة ربيعية خفيفة",
        gender: "female",
        season: ["spring", "autumn"],
        properties: ["breathable", "casual", "colorful"],
        imgSrc:
            "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "أسلوب حضري انتقالي",
        gender: "female",
        season: ["autumn", "autumn"],
        properties: ["layers", "street", "neutral"],
        imgSrc:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "بدلة عمل نهارية",
        gender: "male",
        season: ["summer"],
        properties: ["formal", "work", "minimal"],
        imgSrc:
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "إطلالة عطلة نهاية الأسبوع",
        gender: "male",
        season: ["spring", "autumn"],
        properties: ["weekend", "casual", "travel"],
        imgSrc:
            "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "دفء المواعيد الشتوية",
        gender: "female",
        season: ["winter"],
        properties: ["warmth", "evening"],
        imgSrc:
            "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "طبقات رسمية أنيقة",
        gender: "female",
        season: ["autumn", "spring"],
        properties: ["formal", "work", "layers"],
        imgSrc:
            "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "نشاط صيفي مريح",
        gender: "female",
        season: ["summer"],
        properties: ["sport", "breathable", "weekend"],
        imgSrc:
            "https://images.unsplash.com/photo-1502325966718-85a90488dc29?auto=format&fit=crop&w=800&q=80",
    },
    {
        title: "سفر شتوي بلا صورة",
        gender: "male",
        season: ['winter'],
        properties: ["travel", "layers", "warmth"],
    },
]

export function getSeasonFromMonth(monthIndex: number): Season {
    if (monthIndex >= 2 && monthIndex <= 4) return "spring"
    if (monthIndex >= 5 && monthIndex <= 7) return "summer"
    if (monthIndex >= 8 && monthIndex <= 10) return "autumn"
    return "winter"
}
