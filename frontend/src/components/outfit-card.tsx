import { useState } from "react"
import { Link } from "react-router-dom"
import { Edit2, CheckCircle2, Circle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    type Outfit,
    propertyLabels,
    seasonLabels,
    genderLabels,
} from "@/lib/outfits"

type OutfitCardProps = {
    outfit: Outfit
    onToggleUsed?: (id: string, isUsed: boolean) => Promise<void>
}

const API_URL = "http://localhost:8080/api"

export function OutfitCard({ outfit, onToggleUsed }: OutfitCardProps) {
    const [imageError, setImageError] = useState(false)
    const [isTogglingUsed, setIsTogglingUsed] = useState(false)
    const hasImage = Boolean(outfit.imgSrc && !imageError)

    const handleToggleUsed = async () => {
        if (!outfit.id || isTogglingUsed) return
        
        setIsTogglingUsed(true)
        try {
            const response = await fetch(`${API_URL}/outfits/${outfit.id}/used`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ is_used: !outfit.is_used })
            })

            if (!response.ok) throw new Error("فشل في تحديث الحالة")
            
            if (onToggleUsed) {
                await onToggleUsed(outfit.id, !outfit.is_used)
            }
        } catch (error) {
            console.error('Error toggling used status:', error)
            alert('حدث خطأ أثناء تحديث الحالة')
        } finally {
            setIsTogglingUsed(false)
        }
    }

    return (
        <Card className="flex h-full flex-col overflow-hidden" dir="rtl">
            <div className="bg-muted relative aspect-[4/3] w-full overflow-hidden group">
                {hasImage ? (
                    <img
                        src={outfit.imgSrc}
                        alt={outfit.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="text-muted-foreground flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.05),_transparent)] text-sm">
                        لا توجد صورة متاحة
                    </div>
                )}
                {outfit.id && (
                    <div className="absolute top-2 left-2 flex gap-2">
                        <Link to={`/edit/${outfit.id}`}>
                            <Button
                                size="sm"
                                className="gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Edit2 className="h-3 w-3" />
                                تعديل
                            </Button>
                        </Link>
                    </div>
                )}
                <div className="absolute top-2 right-2">
                    <Badge 
                        variant={outfit.is_used ? "default" : "secondary"}
                        className="text-xs"
                    >
                        {outfit.is_used ? "مُستخدمة" : "غير مُستخدمة"}
                    </Badge>
                </div>
            </div>
            <CardHeader className="space-y-3">
                <CardTitle className="text-lg">{outfit.title}</CardTitle>
                <CardDescription className="text-base font-medium text-foreground grid gap-2">
                    <span>{genderLabels[outfit.gender]}</span>
                    <div className="flex gap-2">
                        {outfit.season.map(item => <Badge variant={"default"} key={outfit.title + item}>{seasonLabels[item]}</Badge>)}
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto space-y-3">
                <div className="flex flex-wrap gap-2">
                    {outfit.properties.map((property) => (
                        <Badge
                            key={property}
                            variant="secondary"
                            className="text-sm font-medium"
                        >
                            {propertyLabels[property]}
                        </Badge>
                    ))}
                </div>
                {outfit.id && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2"
                        onClick={handleToggleUsed}
                        disabled={isTogglingUsed}
                    >
                        {outfit.is_used ? (
                            <>
                                <Circle className="h-4 w-4" />
                                تحديد كغير مستخدمة
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="h-4 w-4" />
                                تحديد كمستخدمة
                            </>
                        )}
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}
