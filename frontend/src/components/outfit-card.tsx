import { useState } from "react"
import { Link } from "react-router-dom"
import { Edit2, Trash } from "lucide-react"

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
}

export function OutfitCard({ outfit }: OutfitCardProps) {
    const [imageError, setImageError] = useState(false)
    const hasImage = Boolean(outfit.imgSrc && !imageError)

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
                    <div>
                        <Link to={`/edit/${outfit.id}`}>
                            <Button
                                size="sm"
                                className="absolute top-2 left-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Edit2 className="h-3 w-3" />
                                تعديل
                            </Button>
                        </Link>
                        <Button onClick={async () => {
                            if (!confirm("هل أنت متأكد من أنك تريد الحذف؟")) return;
                            try {
                                const response = await fetch(`http://localhost:8080/api/delete/${outfit.id}`, {
                                    method: "DELETE",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                });

                                if (!response.ok) {
                                    throw new Error(`فشل الحذف. الحالة: ${response.status}`);
                                }

                                const data = await response.json();
                                console.log("تم الحذف بنجاح:", data);
                            } catch (error) {
                                console.error("حدث خطأ أثناء الحذف:", error);
                            }

                        }}
                            variant={"destructive"}
                            className="absolute top-2 right-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash /> <span>حذف</span>
                        </Button>
                    </div>
                )}
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
            <CardContent className="mt-auto flex flex-wrap gap-2">
                {outfit.properties.map((property) => (
                    <Badge
                        key={property}
                        variant="secondary"
                        className="text-sm font-medium"
                    >
                        {propertyLabels[property]}
                    </Badge>
                ))}
            </CardContent>
        </Card>
    )
}
