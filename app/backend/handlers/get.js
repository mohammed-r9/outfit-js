import { queries } from "../db/queries.js"

export function registerGetRoutes(app) {
    // Get all outfits
    app.get("/api/outfits", (req, res) => {
        try {
            const outfits = queries.getAllOutfits();
            res.json(outfits);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "خطأ في جلب الإطلالات" });
        }
    });

    // Get single outfit by id
    app.get("/api/outfits/:id", (req, res) => {
        try {
            const outfit = queries.getOutfitById(req.params.id);
            if (!outfit) {
                return res.status(404).json({ error: "الإطلالة غير موجودة" });
            }
            res.json(outfit);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "خطأ في جلب الإطلالة" });
        }
    });
}

