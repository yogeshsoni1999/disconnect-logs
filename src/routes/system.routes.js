import { Router } from "express";
const router = Router();

import {getDisconnectLogs } from "../controllers/system.controller.js";

router.route("/disconnect-logs").get(getDisconnectLogs)

export default router