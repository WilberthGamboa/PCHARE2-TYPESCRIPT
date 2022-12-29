"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const computers_controller_1 = require("../controllers/computers-controller");
const jwt_middleware_1 = require("../middlewares/jwt-middleware");
const router = (0, express_1.Router)();
router.get('/', [
    jwt_middleware_1.validarJWT
], computers_controller_1.getMyComputers);
router.post('/', [
    jwt_middleware_1.validarJWT
], computers_controller_1.postComputer);
exports.default = router;
//# sourceMappingURL=computer-router.js.map