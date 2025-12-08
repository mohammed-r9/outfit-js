import { useMemo, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Plus } from "lucide-react"

import { OutfitCard } from "@/components/outfit-card"
import { OutfitFilters } from "@/components/outfit-filters"
import { Button } from "@/components/ui/button"
import {
    type OutfitGender,
    type OutfitProperty,
    getSeasonFromMonth,
    type Season,
} from "@/lib/outfits"

type AllOption = "all"
type FilterValue<T> = T | AllOption

interface BackendOutfit {
    id: string
    name: string
    seasons: string
    gender: string
    properties: string
    image_path: string | null
    is_used: number
}

interface Outfit {
    id: string
    title: string
    gender: OutfitGender
    season: Season[]
    properties: OutfitProperty[]
    imgSrc?: string
    is_used: boolean
}

const API_URL = "http://localhost:8080/api"

function OutfitsList() {
    const [outfits, setOutfits] = useState<Outfit[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [genderFilter, setGenderFilter] = useState<FilterValue<OutfitGender>>(
        "all"
    )
    const [seasonFilter, setSeasonFilter] = useState<FilterValue<Season>>("all")
    const [propertyFilter, setPropertyFilter] = useState<
        FilterValue<OutfitProperty>
    >("all")
    const [searchTerm, setSearchTerm] = useState("")
    const [autoSeason, setAutoSeason] = useState(true)

    const currentSeason = getSeasonFromMonth(new Date().getMonth())
    const activeSeason: FilterValue<Season> = autoSeason
        ? currentSeason
        : seasonFilter

    useEffect(() => {
        fetchOutfits()
    }, [])

    const fetchOutfits = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${API_URL}/outfits`)
            if (!response.ok) throw new Error("فشل في جلب الإطلالات")

            const data: BackendOutfit[] = await response.json()

            const transformedOutfits: Outfit[] = data.map(outfit => ({
                id: outfit.id,
                title: outfit.name,
                gender: outfit.gender as OutfitGender,
                season: outfit.seasons.split(',') as Season[],
                properties: outfit.properties.split(',') as OutfitProperty[],
                imgSrc: outfit.image_path ? `${API_URL.replace('/api', '')}${outfit.image_path}` : undefined,
                is_used: outfit.is_used === 1
            }))

            setOutfits(transformedOutfits)
            setError(null)
        } catch (err) {
            setError(err instanceof Error ? err.message : "حدث خطأ ما")
        } finally {
            setLoading(false)
        }
    }

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
    }, [activeSeason, genderFilter, propertyFilter, searchTerm, outfits])

    const handleResetFilters = () => {
        setGenderFilter("all")
        setSeasonFilter("all")
        setPropertyFilter("all")
        setSearchTerm("")
        setAutoSeason(true)
    }

    const handleAutoSeasonChange = (checked: boolean) => {
        setAutoSeason(checked)
    }

    const handleToggleUsed = async (id: string, isUsed: boolean) => {
        // Update the local state immediately for better UX
        setOutfits(prevOutfits =>
            prevOutfits.map(outfit =>
                outfit.id === id ? { ...outfit, is_used: isUsed } : outfit
            )
        )
    }

    if (loading) {
        return (
            <div className="bg-background text-foreground min-h-screen px-4 py-6" dir="rtl">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-center py-20">
                    <p className="text-xl text-muted-foreground">جاري التحميل...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-background text-foreground min-h-screen px-4 py-6" dir="rtl">
                <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-4 py-20">
                    <p className="text-xl text-red-500">{error}</p>
                    <Button onClick={fetchOutfits}>إعادة المحاولة</Button>

                </div>
            </div>
        )
    }

    return (
        <div
            className="bg-background text-foreground min-h-screen px-4 py-6"
            dir="rtl"
        >
            <main className="mx-auto flex w-full max-w-6xl flex-col gap-8">
                <div className="sticky top-4 z-20">
                    <OutfitFilters
                        searchValue={searchTerm}
                        onSearchChange={setSearchTerm}
                        genderValue={genderFilter}
                        onGenderChange={(value) =>
                            setGenderFilter(value as FilterValue<OutfitGender>)
                        }
                        seasonValue={seasonFilter}
                        onSeasonChange={(value) =>
                            setSeasonFilter(value as FilterValue<Season>)
                        }
                        propertyValue={propertyFilter}
                        onPropertyChange={(value) =>
                            setPropertyFilter(value as FilterValue<OutfitProperty>)
                        }
                        autoSeason={autoSeason}
                        onAutoSeasonChange={handleAutoSeasonChange}
                        currentSeason={currentSeason}
                        onReset={handleResetFilters}
                    />
                </div>

                <section className="space-y-4 pt-4">
                    <div className="flex flex-col gap-4 text-right sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-2xl font-semibold">الإطلالات المقترحة</h2>
                        <div className="flex items-center gap-4">
                            <p className="text-sm font-medium text-muted-foreground">
                                {filteredOutfits.length} نتيجة
                            </p>
                            <Link to="/add">
                                <Button className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    إضافة إطلالة جديدة
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {filteredOutfits.length ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredOutfits.map((outfit) => (
                                <OutfitCard 
                                    key={outfit.id} 
                                    outfit={outfit}
                                    onToggleUsed={handleToggleUsed}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-muted-foreground rounded-3xl border border-dashed p-10 text-center">
                            لا توجد إطلالات مطابقة. جرّب تعديل البحث أو المرشحات.
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}

export default OutfitsList
