
import { Router } from "express";
import { postComputer } from "../controllers/computers-controller";

const router = Router();

router.post('/',[],postComputer);

export default router