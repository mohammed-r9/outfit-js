import { Button } from "@/components/ui/button"
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
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { SearchBar } from "@/components/outfit-search-bar"
import {
    genderLabels,
    propertyLabels,
    seasonLabels,
    type OutfitGender,
    type OutfitProperty,
    type Season,
} from "@/lib/outfits"
import { Info } from "lucide-react"

type AllOption = "all"

type OutfitFiltersProps = {
    searchValue: string
    onSearchChange: (value: string) => void
    genderValue: OutfitGender | AllOption
    onGenderChange: (value: OutfitGender | AllOption) => void
    seasonValue: Season | AllOption
    onSeasonChange: (value: Season | AllOption) => void
    propertyValue: OutfitProperty | AllOption
    onPropertyChange: (value: OutfitProperty | AllOption) => void
    autoSeason: boolean
    onAutoSeasonChange: (checked: boolean) => void
    currentSeason: Season
    onReset: () => void
}

export function OutfitFilters({
    searchValue,
    onSearchChange,
    genderValue,
    onGenderChange,
    seasonValue,
    onSeasonChange,
    propertyValue,
    onPropertyChange,
    autoSeason,
    onAutoSeasonChange,
    currentSeason,
    onReset,
}: OutfitFiltersProps) {
    return (
        <section
            className="rounded-[2.5rem] border bg-card/90 p-5 shadow-md backdrop-blur"
            dir="rtl"
        >
            <TooltipProvider delayDuration={100}>
                <div className="flex items-center gap-4">
                    <div className="min-w-[100px] flex-1 items-center">
                        <SearchBar value={searchValue} onChange={onSearchChange} />
                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-muted/40 px-5 py-2">

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="text-muted-foreground w-[15px]" />
                            </TooltipTrigger>
                            <TooltipContent>
                                يحدّد الموسم بناءً على الشهر الحالي ويعطل الاختيار اليدوي
                            </TooltipContent>
                        </Tooltip>
                        <Label htmlFor="auto-season" className="text-xs font-medium">
                            اختيار الموسم تلقائيًا
                        </Label>
                        <Switch
                            id="auto-season"
                            checked={autoSeason}
                            onCheckedChange={onAutoSeasonChange}
                        />

                    </div>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={onReset}
                        className="rounded-full px-5"
                    >
                        إعادة التعيين
                    </Button>


                </div>
            </TooltipProvider>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-1 text-right">
                    <Label className="text-sm font-semibold text-muted-foreground">
                        الجنس
                    </Label>
                    <Select value={genderValue} onValueChange={onGenderChange}>
                        <SelectTrigger className="h-11 justify-between rounded-2xl text-right">
                            <SelectValue placeholder="اختيار" />
                        </SelectTrigger>
                        <SelectContent dir="rtl" className="text-right">
                            <SelectItem value="all">الكل</SelectItem>
                            <SelectItem value="male">{genderLabels.male}</SelectItem>
                            <SelectItem value="female">{genderLabels.female}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1 text-right">
                    <Label className="text-sm font-semibold text-muted-foreground">
                        الموسم
                    </Label>
                    <Select
                        value={seasonValue}
                        onValueChange={onSeasonChange}
                        disabled={autoSeason}
                    >
                        <SelectTrigger className="h-11 justify-between rounded-2xl text-right">
                            <SelectValue placeholder="اختيار" />
                        </SelectTrigger>
                        <SelectContent dir="rtl" className="text-right">
                            <SelectItem value="all">كل المواسم</SelectItem>
                            {(Object.keys(seasonLabels) as Season[]).map((season) => (
                                <SelectItem key={season} value={season}>
                                    {seasonLabels[season]}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {
                        <p className="text-muted-foreground text-xs font-bold" style={{ opacity: autoSeason ? "1" : "0" }}>
                            {`الموسم الحالي: ${seasonLabels[currentSeason]}`}
                        </p>
                    }
                </div>

                <div className="space-y-1 text-right">
                    <Label className="text-sm font-semibold text-muted-foreground">
                        طابع الإطلالة
                    </Label>
                    <Select value={propertyValue} onValueChange={onPropertyChange}>
                        <SelectTrigger className="h-11 justify-between rounded-2xl text-right">
                            <SelectValue placeholder="اختيار" />
                        </SelectTrigger>
                        <SelectContent dir="rtl" className="text-right max-h-60">
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
        </section>
    )
}
