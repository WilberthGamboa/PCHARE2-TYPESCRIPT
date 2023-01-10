import { Router } from "express";
import { check } from "express-validator";
import { validarJWT } from "../middlewares/jwt-middleware";
import validarCampos from "../middlewares/validationResult-middleware";
import ComputerController from '../controllers/computers-controller';

const router = Router();
const computerController = new ComputerController();
router.get('/',[
    validarJWT
],

computerController.getComputers
)

router.get('/myComputers',[
    validarJWT
],
computerController.getMyComputers

)

router.get('/myComputerImg/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
],
computerController.getMyImgComputer

)

router.post('/',[
    validarJWT


],
computerController.postComputer
);


router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
],

computerController.updateComputer

)

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
],

computerController.deleteComputer


)


export default router