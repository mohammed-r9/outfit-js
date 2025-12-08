import { app } from "../server";
import { queries } from "../db/queries"

// Toggle outfit used status
app.patch("/api/outfits/:id/used", (req, res) => {
    try {
        const { id } = req.params;
        const { is_used } = req.body;

        const existingOutfit = queries.getOutfitById(id);
        if (!existingOutfit) {
            return res.status(404).json({ error: "الإطلالة غير موجودة" });
        }

        queries.setOutfitUsed(id, is_used);
        res.json({
            message: "تم تحديث حالة الإطلالة بنجاح",
            outfit: queries.getOutfitById(id)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "خطأ في تحديث حالة الإطلالة" });
    }
});
