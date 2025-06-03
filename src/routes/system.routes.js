import { Router } from "express";
const router = Router();

import {getDisconnectCounts} from "../controllers/system.controller.js";

router.route("/disconnect-details").get(getDisconnectCounts)

export default router