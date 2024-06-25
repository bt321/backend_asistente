"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("./validate-token"));
const objetivo_1 = require("../controllers/objetivo");
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, objetivo_1.getObjetivo);
router.post('/updateObjetivo', objetivo_1.updateObjetivo);
exports.default = router;
