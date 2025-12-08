import { useMemo, useState } from "react"

import { OutfitCard } from "@/components/outfit-card"
import { OutfitFilters } from "@/components/outfit-filters"
import {
    outfits,
    type OutfitGender,
    type OutfitProperty,
    getSeasonFromMonth,
    type Season,
} from "@/lib/outfits"

type AllOption = "all"
type FilterValue<T> = T | AllOption

function App() {
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

    const handleAutoSeasonChange = (checked: boolean) => {
        setAutoSeason(checked)
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
                    <div className="flex flex-col gap-2 text-right sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-2xl font-semibold">الإطلالات المقترحة</h2>
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
                            لا توجد إطلالات مطابقة. جرّب تعديل البحث أو المرشحات.
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}

export default App
