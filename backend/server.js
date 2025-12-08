import express from "express";
import cors from "cors";
import db from "./db/index.js"; // <-- important: initializes DB on import

const app = express();

app.use(cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*"
}));

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
