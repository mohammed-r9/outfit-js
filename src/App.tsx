import { useMemo, useState } from "react"

import { OutfitCard } from "@/components/outfit-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
    outfits,
    type OutfitGender,
    type OutfitSeason,
    type OutfitProperty,
    genderLabels,
    seasonLabels,
    propertyLabels,
    getSeasonFromMonth,
    type Season,
} from "@/lib/outfits"

type AllOption = "all"

function App() {
    const [genderFilter, setGenderFilter] = useState<OutfitGender | AllOption>(
        "all"
    )
    const [seasonFilter, setSeasonFilter] = useState<Season | AllOption>(
        "all"
    )
    const [propertyFilter, setPropertyFilter] = useState<
        OutfitProperty | AllOption
    >("all")
    const [searchTerm, setSearchTerm] = useState("")
    const [autoSeason, setAutoSeason] = useState(true)

    const currentSeason = getSeasonFromMonth(new Date().getMonth())
    const activeSeason: Season | AllOption = autoSeason
        ? currentSeason
        : seasonFilter

    const filteredOutfits = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase()

        return outfits.filter((outfit) => {
            const matchesGender =
                genderFilter === "all" || outfit.gender === genderFilter
            const matchesSeason =
                activeSeason === "all" ? true : outfit.season.includes(activeSeason)
            const matchesProperty =
                propertyFilter === "all" || outfit.properties.includes(propertyFilter)
            const matchesSearch =
                normalizedSearch.length === 0 ||
                outfit.title.toLowerCase().includes(normalizedSearch)

            return (
                matchesGender && matchesSeason && matchesProperty && matchesSearch
            )
        })
    }, [activeSeason, genderFilter, propertyFilter, searchTerm])

    const handleResetFilters = () => {
        setGenderFilter("all")
        setSeasonFilter("all")
        setPropertyFilter("all")
        setSearchTerm("")
        setAutoSeason(true)
    }

    return (
        <div
            className="bg-background text-foreground min-h-screen px-4 py-10"
            dir="rtl"
        >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
                <header className="space-y-4 text-right">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                        OUTFIT LAB
                    </p>
                    <h1 className="text-3xl font-bold sm:text-4xl">
                        اكتشف إطلالات مستوحاة من الموسم الحالي
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        استخدم المرشحات لتضييق الخيارات بحسب الجنس والموسم وطابع الإطلالة،
                        أو فَعِّل التصفية التلقائية ليتم اختيار الموسم بناءً على الشهر
                        الحالي.
                    </p>
                </header>

                <section className="rounded-3xl border bg-card/60 p-6 shadow-sm backdrop-blur">
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="search">بحث بالعنوان</Label>
                            <Input
                                id="search"
                                placeholder="اكتب وصف الإطلالة"
                                value={searchTerm}
                                className="text-right"
                                onChange={(event) => setSearchTerm(event.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>الجنس</Label>
                            <Select
                                value={genderFilter}
                                onValueChange={(value) =>
                                    setGenderFilter(value as OutfitGender | AllOption)
                                }
                            >
                                <SelectTrigger className="justify-between text-right">
                                    <SelectValue placeholder="اختر الجنس" />
                                </SelectTrigger>
                                <SelectContent dir="rtl" className="text-right">
                                    <SelectItem value="all">الكل</SelectItem>
                                    <SelectItem value="male">{genderLabels.male}</SelectItem>
                                    <SelectItem value="female">{genderLabels.female}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>الموسم</Label>
                            <Select
                                value={seasonFilter}
                                disabled={autoSeason}
                                onValueChange={(value) =>
                                    setSeasonFilter(value as Season | AllOption)
                                }
                            >
                                <SelectTrigger className="justify-between text-right">
                                    <SelectValue placeholder="اختر الموسم" />
                                </SelectTrigger>
                                <SelectContent dir="rtl" className="text-right">
                                    <SelectItem value="all">كل المواسم</SelectItem>
                                    {(Object.keys(seasonLabels) as Season[]).map(
                                        (season) => (
                                            <SelectItem key={season} value={season}>
                                                {seasonLabels[season]}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                            <p className="text-muted-foreground text-xs">
                                {autoSeason
                                    ? `التصفية التلقائية نشطة (الموسم الحالي: ${seasonLabels[currentSeason]})`
                                    : "يمكنك اختيار موسم يدويًا أو تركه على الكل"}
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>طابع الإطلالة</Label>
                            <Select
                                value={propertyFilter}
                                onValueChange={(value) =>
                                    setPropertyFilter(value as OutfitProperty | AllOption)
                                }
                            >
                                <SelectTrigger className="justify-between text-right">
                                    <SelectValue placeholder="اختر الطابع" />
                                </SelectTrigger>
                                <SelectContent dir="rtl" className="text-right">
                                    <SelectItem value="all">كل الخصائص</SelectItem>
                                    {(Object.keys(propertyLabels) as OutfitProperty[]).map(
                                        (property) => (
                                            <SelectItem key={property} value={property}>
                                                {propertyLabels[property]}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-muted/40 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-base font-semibold">الموسم الحالي</p>
                            <p className="text-muted-foreground text-sm">
                                {seasonLabels[currentSeason]}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Label htmlFor="auto-season" className="text-sm">
                                تفعيل التصفية التلقائية
                            </Label>
                            <Switch
                                id="auto-season"
                                checked={autoSeason}
                                onCheckedChange={setAutoSeason}
                            />
                        </div>
                        <Button variant="outline" onClick={handleResetFilters}>
                            إعادة تعيين المرشحات
                        </Button>
                    </div>
                </section>

                <section className="space-y-4">
                    <div className="flex flex-col gap-2 text-right sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-semibold">الإطلالات المقترحة</h2>
                            <p className="text-muted-foreground text-sm">
                                النتائج المتاحة وفقًا للمرشحات الحالية
                            </p>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">
                            {filteredOutfits.length} نتيجة
                        </p>
                    </div>

                    {filteredOutfits.length ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredOutfits.map((outfit) => (
                                <OutfitCard key={outfit.title} outfit={outfit} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-muted-foreground rounded-3xl border border-dashed p-10 text-center">
                            لا توجد إطلالات مطابقة حاليًا. جرّب تغيير المرشحات.
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}

export default App
