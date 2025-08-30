"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const githubService_1 = require("./githubService");
const app = (0, express_1.default)();
const PORT = 8080;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
app.post('/analyze', async (req, res) => {
    const { repoUrl } = req.body;
    if (!repoUrl)
        return res.status(400).json({ error: 'repoUrl is required' });
    try {
        const data = await (0, githubService_1.analyzeRepo)(repoUrl);
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.use(express_1.default.static(path_1.default.join(__dirname, '../../frontend')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../frontend/index.html'));
});
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
