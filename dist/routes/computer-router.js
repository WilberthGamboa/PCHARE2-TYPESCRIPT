"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const jwt_middleware_1 = require("../middlewares/jwt-middleware");
const validationResult_middleware_1 = __importDefault(require("../middlewares/validationResult-middleware"));
const computers_controller_1 = __importDefault(require("../controllers/computers-controller"));
const router = (0, express_1.Router)();
const computerController = new computers_controller_1.default();
router.get('/', [
    jwt_middleware_1.validarJWT
], computerController.getComputers);
router.get('/myComputers', [
    jwt_middleware_1.validarJWT
], computerController.getMyComputers);
router.get('/myComputerImg/:id', [
    jwt_middleware_1.validarJWT,
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    validationResult_middleware_1.default
], computerController.getMyImgComputer);
router.post('/', [
    jwt_middleware_1.validarJWT
], computerController.postComputer);
router.put('/:id', [
    jwt_middleware_1.validarJWT,
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    validationResult_middleware_1.default
], computerController.updateComputer);
router.delete('/:id', [
    jwt_middleware_1.validarJWT,
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    validationResult_middleware_1.default
], computerController.deleteComputer);
exports.default = router;
//# sourceMappingURL=computer-router.js.map