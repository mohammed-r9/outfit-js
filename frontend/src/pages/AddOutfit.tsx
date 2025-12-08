import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { ArrowRight, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { genderLabels, seasonLabels, propertyLabels, type OutfitGender, type Season, type OutfitProperty } from "@/lib/outfits"

const API_URL = "http://localhost:8080/api"

function AddOutfit() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    
    const [name, setName] = useState("")
    const [gender, setGender] = useState<OutfitGender>("male")
    const [seasons, setSeasons] = useState<Season[]>([])
    const [properties, setProperties] = useState<OutfitProperty[]>([])
    const [image, setImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImage(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSeasonToggle = (season: Season) => {
        setSeasons(prev =>
            prev.includes(season)
                ? prev.filter(s => s !== season)
                : [...prev, season]
        )
    }

    const handlePropertyToggle = (property: OutfitProperty) => {
        setProperties(prev =>
            prev.includes(property)
                ? prev.filter(p => p !== property)
                : [...prev, property]
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!name.trim()) {
            setError("الرجاء إدخال اسم الإطلالة")
            return
        }
        
        if (seasons.length === 0) {
            setError("الرجاء اختيار موسم واحد على الأقل")
            return
        }
        
        if (properties.length === 0) {
            setError("الرجاء اختيار خاصية واحدة على الأقل")
            return
        }

        try {
            setLoading(true)
            setError(null)
            
            const formData = new FormData()
            formData.append('name', name)
            formData.append('gender', gender)
            formData.append('seasons', seasons.join(','))
            formData.append('properties', properties.join(','))
            
            if (image) {
                formData.append('image', image)
            }

            const response = await fetch(`${API_URL}/outfits`, {
                method: 'POST',
                body: formData
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || "فشل في إضافة الإطلالة")
            }

            navigate('/')
        } catch (err) {
            setError(err instanceof Error ? err.message : "حدث خطأ ما")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-background text-foreground min-h-screen px-4 py-6" dir="rtl">
            <main className="mx-auto w-full max-w-2xl">
                <div className="mb-6">
                    <Link to="/">
                        <Button variant="ghost" className="gap-2">
                            <ArrowRight className="h-4 w-4" />
                            العودة إلى القائمة
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">إضافة إطلالة جديدة</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="rounded-lg bg-red-50 p-4 text-red-800">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="name">اسم الإطلالة *</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="مثال: إطلالة صيفية كاجوال"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>النوع *</Label>
                                <div className="flex gap-4">
                                    {(Object.keys(genderLabels) as OutfitGender[]).map((g) => (
                                        <label key={g} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value={g}
                                                checked={gender === g}
                                                onChange={(e) => setGender(e.target.value as OutfitGender)}
                                                className="h-4 w-4"
                                            />
                                            <span>{genderLabels[g]}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>المواسم *</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    {(Object.keys(seasonLabels) as Season[]).map((season) => (
                                        <label
                                            key={season}
                                            className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer transition-colors ${
                                                seasons.includes(season)
                                                    ? 'border-primary bg-primary/10'
                                                    : 'border-border hover:border-primary/50'
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={seasons.includes(season)}
                                                onChange={() => handleSeasonToggle(season)}
                                                className="h-4 w-4"
                                            />
                                            <span>{seasonLabels[season]}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>الخصائص *</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    {(Object.keys(propertyLabels) as OutfitProperty[]).map((property) => (
                                        <label
                                            key={property}
                                            className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer transition-colors ${
                                                properties.includes(property)
                                                    ? 'border-primary bg-primary/10'
                                                    : 'border-border hover:border-primary/50'
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={properties.includes(property)}
                                                onChange={() => handlePropertyToggle(property)}
                                                className="h-4 w-4"
                                            />
                                            <span className="text-sm">{propertyLabels[property]}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">صورة الإطلالة</Label>
                                <div className="flex flex-col gap-4">
                                    <label
                                        htmlFor="image"
                                        className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-border p-6 transition-colors hover:border-primary"
                                    >
                                        <Upload className="h-8 w-8 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                            {image ? image.name : 'اضغط لاختيار صورة'}
                                        </span>
                                    </label>
                                    <input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    {imagePreview && (
                                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
                                            <img
                                                src={imagePreview}
                                                alt="معاينة"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={loading} className="flex-1">
                                    {loading ? "جاري الإضافة..." : "إضافة الإطلالة"}
                                </Button>
                                <Link to="/" className="flex-1">
                                    <Button type="button" variant="outline" className="w-full">
                                        إلغاء
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

export default AddOutfit
