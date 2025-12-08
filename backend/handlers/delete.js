import { queries } from "../db/queries.js"

export function registerDeleteRoutes(app) {
    // Delete outfit
    app.delete("/api/outfits/:id", (req, res) => {
        try {
            const { id } = req.params;
            const existingOutfit = queries.getOutfitById(id);

            if (!existingOutfit) {
                return res.status(404).json({ error: "الإطلالة غير موجودة" });
            }

            queries.deleteOutfit(id);
            res.json({ message: "تم حذف الإطلالة بنجاح" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "خطأ في حذف الإطلالة" });
        }
    });
}
