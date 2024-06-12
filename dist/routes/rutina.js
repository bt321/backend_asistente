"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rutina_1 = require("../controllers/rutina");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.post('/', rutina_1.generarRutina);
router.get('/getRutina', validate_token_1.default, rutina_1.getRutina);
router.get('/actualizarRutina', validate_token_1.default, rutina_1.actualizarRutina);
exports.default = router;
