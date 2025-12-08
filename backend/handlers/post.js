import { app } from "../server";
import { queries } from "../db/queries"

// Create new outfit
app.post("/api/outfits", upload.single('image'), (req, res) => {
    try {
        const { name, seasons, gender, properties } = req.body;

        if (!name || !seasons || !gender || !properties) {
            return res.status(400).json({ error: "جميع الحقول مطلوبة" });
        }

        const image_path = req.file ? `/uploads/${req.file.filename}` : null;

        const id = queries.addOutfit({
            name,
            seasons,
            gender,
            properties,
            image_path,
            is_used: false
        });

        res.status(201).json({
            id,
            message: "تم إضافة الإطلالة بنجاح",
            outfit: queries.getOutfitById(id)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "خطأ في إضافة الإطلالة" });
    }
});
