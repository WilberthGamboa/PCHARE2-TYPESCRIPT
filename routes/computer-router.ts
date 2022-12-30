
import { Router } from "express";
import { check } from "express-validator";
import { getComputers, getMyComputers, postComputer, updateComputer } from "../controllers/computers-controller";
import Jwt from "../helpers/jwt";
import { validarJWT } from "../middlewares/jwt-middleware";
import validarCampos from "../middlewares/validationResult-middleware";

const router = Router();

router.get('/',[
    validarJWT
],
getComputers
)

router.get('/myComputers',[
    validarJWT
],getMyComputers)


router.post('/',[
    validarJWT


],postComputer);


router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
],


updateComputer
)


export default router