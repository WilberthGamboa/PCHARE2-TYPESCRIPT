
import { Router } from "express";
import { getMyComputers, postComputer } from "../controllers/computers-controller";
import Jwt from "../helpers/jwt";
import { validarJWT } from "../middlewares/jwt-middleware";

const router = Router();

router.get('/',[
    validarJWT
],
getMyComputers)

router.post('/',[
    validarJWT


],postComputer);



export default router