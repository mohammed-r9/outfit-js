import db from "./index.js";
import { ulid } from "ulid";

function addOutfit({ name, seasons, gender, properties, image_path, is_used = false }) {
    const id = ulid();
    const stmt = db.prepare(`
    INSERT INTO outfits (id, name, seasons, gender, properties, image_path, is_used)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
    stmt.run(id, name, seasons, gender, properties, image_path, is_used ? 1 : 0);
    return id;
}

function updateOutfit(id, { name, seasons, gender, properties, image_path }) {
    const stmt = db.prepare(`
    UPDATE outfits
    SET name = ?, seasons = ?, gender = ?, properties = ?, image_path = ?
    WHERE id = ?
  `);
    stmt.run(name, seasons, gender, properties, image_path, id);
}

function getOutfitById(id) {
    const stmt = db.prepare(`SELECT * FROM outfits WHERE id = ?`);
    return stmt.get(id);
}

function setOutfitUsed(id, isUsed) {
    const stmt = db.prepare(`
    UPDATE outfits
    SET is_used = ?
    WHERE id = ?
  `);
    stmt.run(isUsed ? 1 : 0, id);
}

function deleteOutfit(id) {
    const stmt = db.prepare(`
    DELETE FROM outfits
    WHERE id = ?
`)
    stmt.run(id)
}

function getAllOutfits() {
    const stmt = db.prepare(`SELECT * FROM outfits`);
    return stmt.all();
}

export const queries = {
    addOutfit: addOutfit,
    updateOutfit: updateOutfit,
    getOutfitById: getOutfitById,
    setOutfitUsed: setOutfitUsed,
    getAllOutfits: getAllOutfits,
    deleteOutfit: deleteOutfit,
}
