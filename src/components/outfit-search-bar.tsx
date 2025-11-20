import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"

type OutfitSearchBarProps = {
    value: string
    onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: OutfitSearchBarProps) {
    return (
        <div className="space-y-1 text-right" dir="rtl">
            <div className="relative">
                <Input
                    id="outfit-search"
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder="اكتب الكلمات المفتاحية"
                    className="h-11 rounded-2xl border-none bg-muted/60 pr-4 pl-12 text-right text-base shadow-inner focus-visible:ring-2"
                />
                <Search
                    className="text-muted-foreground absolute left-4 top-1/2 size-4 -translate-y-1/2"
                    aria-hidden="true"
                />
            </div>
        </div>
    )
}
