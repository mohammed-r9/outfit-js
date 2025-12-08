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
    id?: string
    title: string
    gender: OutfitGender
    season: OutfitSeason
    properties: OutfitProperty[]
    imgSrc?: string
    is_used?: boolean
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
        imgSrc: new URL('@/assets/images/1.avif', import.meta.url).href,
    },
    {
        title: "أسلوب حضري انتقالي",
        gender: "female",
        season: ["autumn", "autumn"],
        properties: ["layers", "street", "neutral"],
        imgSrc: new URL('@/assets/images/2.avif', import.meta.url).href,
    },
    {
        title: "بدلة عمل نهارية",
        gender: "male",
        season: ["summer"],
        properties: ["formal", "work", "minimal"],
        imgSrc: new URL('@/assets/images/3.avif', import.meta.url).href,
    },
    {
        title: "إطلالة عطلة نهاية الأسبوع",
        gender: "male",
        season: ["spring", "autumn"],
        properties: ["weekend", "casual", "travel"],
        imgSrc: new URL('@/assets/images/4.avif', import.meta.url).href,
    },
    {
        title: "دفء المواعيد الشتوية",
        gender: "female",
        season: ["winter"],
        properties: ["warmth", "evening"],
        imgSrc: new URL('@/assets/images/5.avif', import.meta.url).href,
    },
    {
        title: "طبقات رسمية أنيقة",
        gender: "female",
        season: ["autumn", "spring"],
        properties: ["formal", "work", "layers"],
        imgSrc: new URL('@/assets/images/6.avif', import.meta.url).href,
    },
    {
        title: "نشاط صيفي مريح",
        gender: "female",
        season: ["summer"],
        properties: ["sport", "breathable", "weekend"],
        imgSrc: new URL('@/assets/images/7.avif', import.meta.url).href,
    },
    {
        title: "سفر شتوي بلا صورة",
        gender: "male",
        season: ['winter'],
        properties: ["travel", "layers", "warmth"],
        // no image
    },
]

export function getSeasonFromMonth(monthIndex: number): Season {
    if (monthIndex >= 2 && monthIndex <= 4) return "spring"
    if (monthIndex >= 5 && monthIndex <= 7) return "summer"
    if (monthIndex >= 8 && monthIndex <= 10) return "autumn"
    return "winter"
}
