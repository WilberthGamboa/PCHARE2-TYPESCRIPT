"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import { authLogin, authRegister } from "../controllers/auth-controller";
const express_validator_1 = require("express-validator");
const validationResult_middleware_1 = __importDefault(require("../middlewares/validationResult-middleware"));
const db_validators_1 = __importDefault(require("../helpers/db-validators"));
const auth_controller_1 = __importDefault(require("../controllers/auth-controller"));
const router = (0, express_1.Router)();
const authController = new auth_controller_1.default();
router.post('/register', [
    (0, express_validator_1.check)('name', "El campo no puede estar vacio").not().isEmpty(),
    (0, express_validator_1.check)('name', "El campo no puede tener mas de 50 caracteres").isLength({ max: 50 }),
    (0, express_validator_1.check)('lastname', "El campo no puede estar vacio").not().isEmpty(),
    (0, express_validator_1.check)('lastname', "El campo no puede tener mas de 50 caracteres").isLength({ max: 50 }),
    (0, express_validator_1.check)('username', "El campo no puede estar vacio").not().isEmpty(),
    (0, express_validator_1.check)('username').custom(db_validators_1.default.usernameExists),
    (0, express_validator_1.check)('username', "El campo no puede tener mas de 25 caracteres").isLength({ max: 25 }),
    (0, express_validator_1.check)('password', "El campo no puede estar vacio").not().isEmpty(),
    (0, express_validator_1.check)('passwordConfirm', "El campo no puede estar vacio").bail().not().isEmpty().custom((value, { req }) => {
        if (value !== req.body.password && value !== undefined && req.body.password !== undefined) {
            throw new Error('Password confirmation does not match password');
        }
        else {
            return true;
        }
    }),
    (0, express_validator_1.check)('email', "El correo no es valido").isEmail(),
    (0, express_validator_1.check)('email').custom(db_validators_1.default.emailExists),
    (0, express_validator_1.check)('age', "La edad ingresada no es un número").isNumeric(),
    (0, express_validator_1.check)('age', 'No puedes más de 3 dígitos').isLength({ max: 3 }),
    validationResult_middleware_1.default
], authController.authRegister);
router.post('/login', [
    (0, express_validator_1.check)('email', "El correo no es valido").not().isEmpty(),
    (0, express_validator_1.check)('password', "La contraseña es obligatorio").not().isEmpty(),
], authController.authLogin);
exports.default = router;
//# sourceMappingURL=auth-router.js.map