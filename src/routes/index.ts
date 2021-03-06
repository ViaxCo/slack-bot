import express from "express";
const router = express.Router();
import handleSlashCommands from "../controllers/handleSlashCommands";
import { getAllUserResponses, getUserResponses } from "../controllers/responsesAPI";

router.route("/slack/slash").post(handleSlashCommands);
router.route("/api/user-responses").get(getAllUserResponses);
router.route("/api/user-responses/:username").get(getUserResponses);

export default router;
