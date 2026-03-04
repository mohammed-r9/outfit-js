CREATE TABLE IF NOT EXISTS outfits (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    seasons TEXT NOT NULL,
    gender TEXT NOT NULL,
    properties TEXT NOT NULL,
    image_path TEXT,
    is_used BOOL DEFAULT 0
);
