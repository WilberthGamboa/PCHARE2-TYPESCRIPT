"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import { authLogin, authRegister } from "../controllers/auth-controller";
const express_validator_1 = require("express-validator");
const auth_controller_1 = __importDefault(require("../controllers/auth-controller"));
const router = (0, express_1.Router)();
const authContoller = new auth_controller_1.default();
/*
router.post('/register',
[
 check('name',"El campo no puede estar vacio").not().isEmpty(),
 check('name',"El campo no puede tener mas de 50 caracteres").isLength({max:50}),
 check('lastname',"El campo no puede estar vacio").not().isEmpty(),
 check('lastname',"El campo no puede tener mas de 50 caracteres").isLength({max:50}),
 check('username',"El campo no puede estar vacio").not().isEmpty(),
 check('username').custom(DbValidators.usernameExists),
 check('username',"El campo no puede tener mas de 25 caracteres").isLength({max:25}),
 check('password',"El campo no puede estar vacio").not().isEmpty(),
 check('passwordConfirm',"El campo no puede estar vacio").bail().not().isEmpty().custom((value,  {req} ) => {
    if (value !== req.body.password && value!==undefined&&req.body.password!==undefined) {
        throw new Error('Password confirmation does not match password')
        }else{
            return true;
        }
      }),
check('email',"El correo no es valido").isEmail(),
check('email').custom(DbValidators.emailExists),
check('age',"La edad ingresada no es un número").isNumeric(),
check('age','No puedes más de 3 dígitos').isLength({max:3}),

 validarCampos
]
,authRegister);
*/
router.post('/login', [
    (0, express_validator_1.check)('email', "El correo no es valido").not().isEmpty(),
    (0, express_validator_1.check)('password', "La contraseña es obligatorio").not().isEmpty(),
], authContoller.authLogin);
exports.default = router;
//# sourceMappingURL=auth-router.js.map