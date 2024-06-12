"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dieta_1 = require("../controllers/dieta");
const router = (0, express_1.Router)();
router.get('/', dieta_1.getDieta);
router.get('/actualizarDieta', dieta_1.actualizarDieta);
exports.default = router;
