"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vite_1 = require("vite");
var plugin_react_1 = require("@vitejs/plugin-react");
var path_1 = require("path");
var vite_2 = require("@tailwindcss/vite");
// https://vite.dev/config/
exports.default = (0, vite_1.defineConfig)({
    resolve: {
        alias: {
            "@": path_1.default.resolve(__dirname, "src"),
        },
    },
    plugins: [
        (0, plugin_react_1.default)({
            babel: {
                plugins: [["babel-plugin-react-compiler"]],
            },
        }),
        (0, vite_2.default)(),
    ],
});
