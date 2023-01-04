
import { Router } from "express";
import { check } from "express-validator";
import { deleteComputer, getComputers, getMyComputers, getMyImgComputer, postComputer, updateComputer } from "../controllers/computers-controller";
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

router.get('/myComputerImg/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
],getMyImgComputer)

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

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
],
deleteComputer

)


export default router