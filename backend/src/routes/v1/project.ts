import { Router } from "express";
import { createProject, getDirectoryTree, getProjectPorts } from "../../controllers/project";

const router = Router();

router.route("/").post(createProject);
router.route("/:projectId/tree").get(getDirectoryTree);
router.route("/:projectId/ports").get(getProjectPorts);

export default router;
