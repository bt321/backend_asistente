"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const objetivo_1 = require("../controllers/objetivo");
const router = (0, express_1.Router)();
router.get('/', objetivo_1.getObjetivo);
router.post('/updateObjetivo', objetivo_1.updateObjetivo);
exports.default = router;
