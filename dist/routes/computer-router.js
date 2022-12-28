"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const computers_controller_1 = require("../controllers/computers-controller");
const router = (0, express_1.Router)();
router.post('/', [], computers_controller_1.postComputer);
exports.default = router;
//# sourceMappingURL=computer-router.js.map