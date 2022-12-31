"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const computers_controller_1 = require("../controllers/computers-controller");
const jwt_middleware_1 = require("../middlewares/jwt-middleware");
const validationResult_middleware_1 = __importDefault(require("../middlewares/validationResult-middleware"));
const router = (0, express_1.Router)();
router.get('/', [
    jwt_middleware_1.validarJWT
], computers_controller_1.getComputers);
router.get('/myComputers', [
    jwt_middleware_1.validarJWT
], computers_controller_1.getMyComputers);
router.get('/myComputerImg/:id', [
    jwt_middleware_1.validarJWT,
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    validationResult_middleware_1.default
], computers_controller_1.getMyImgComputer);
router.post('/', [
    jwt_middleware_1.validarJWT
], computers_controller_1.postComputer);
router.put('/:id', [
    jwt_middleware_1.validarJWT,
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    validationResult_middleware_1.default
], computers_controller_1.updateComputer);
exports.default = router;
//# sourceMappingURL=computer-router.js.map