import { Router } from "express";
import { createProject } from "../../controllers/project";

const router = Router();

router.route("/").post(createProject);

export default router;
