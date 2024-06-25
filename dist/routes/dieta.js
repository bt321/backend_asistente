"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("./validate-token"));
const dieta_1 = require("../controllers/dieta");
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, dieta_1.getDieta);
router.get('/actualizarDieta', validate_token_1.default, dieta_1.actualizarDieta);
exports.default = router;
