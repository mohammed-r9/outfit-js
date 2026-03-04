import { queries } from "../db/queries.js"

export function registerPutRoutes(app, upload) {
    // Update outfit
    app.put("/api/outfits/:id", upload.single('image'), (req, res) => {
        try {
            const { id } = req.params;
            const { name, seasons, gender, properties, size } = req.body;

            const existingOutfit = queries.getOutfitById(id);
            if (!existingOutfit) {
                return res.status(404).json({ error: "الإطلالة غير موجودة" });
            }

            const image_path = req.file ? `/uploads/${req.file.filename}` : existingOutfit.image_path;

            queries.updateOutfit(id, {
                name: name || existingOutfit.name,
                seasons: seasons || existingOutfit.seasons,
                gender: gender || existingOutfit.gender,
                properties: properties || existingOutfit.properties,
                size: size || existingOutfit.size,
                image_path
            });

            res.json({
                message: "تم تحديث الإطلالة بنجاح",
                outfit: queries.getOutfitById(id)
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "خطأ في تحديث الإطلالة" });
        }
    });
}
