import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "data.db");
const db = new Database(dbPath);

db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
        id TEXT PRIMARY KEY
    );
`);

const migrationsDir = path.join(__dirname, "migrations");

if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir);
}

const migrationFiles = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith(".sql"))
    .sort();

for (const file of migrationFiles) {
    const id = file;

    const alreadyApplied = db.prepare(
        "SELECT 1 FROM migrations WHERE id = ?"
    ).get(id);

    if (!alreadyApplied) {
        const fullPath = path.join(migrationsDir, file);
        const sql = fs.readFileSync(fullPath, "utf-8");

        console.log("Applying migration:", file);
        db.exec(sql);

        db.prepare("INSERT INTO migrations (id) VALUES (?)").run(id);
    }
}

console.log("All migrations applied.");

export default db;
