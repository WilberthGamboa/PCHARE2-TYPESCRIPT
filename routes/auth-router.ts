import { Router } from "express";
//import { authLogin, authRegister } from "../controllers/auth-controller";
import { check } from "express-validator";
import validarCampos from "../middlewares/validationResult-middleware";
import DbValidators from "../helpers/db-validators";
import AuthController from "../controllers/auth-controller";



const router = Router();
const authController = new AuthController();

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
,authController.authRegister);

router.post('/login',
[
    check('email',"El correo no es valido").not().isEmpty(),
    check('password',"La contraseña es obligatorio").not().isEmpty(),
]
,authController.authLogin);

export default router;