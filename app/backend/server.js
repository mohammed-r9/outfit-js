import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import db from "./db/index.js"; // Initialize DB
import { registerGetRoutes } from "./handlers/get.js";
import { registerPostRoutes } from "./handlers/post.js";
import { registerPutRoutes } from "./handlers/put.js";
import { registerPatchRoutes } from "./handlers/patch.js";
import { registerDeleteRoutes } from "./handlers/delete.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*"
}));

app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp|avif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('يجب أن تكون الصورة من نوع: jpeg, jpg, png, gif, webp, أو avif'));
        }
    }
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

// Register routes
registerGetRoutes(app);
registerPostRoutes(app, upload);
registerPutRoutes(app, upload);
registerPatchRoutes(app);
registerDeleteRoutes(app);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
