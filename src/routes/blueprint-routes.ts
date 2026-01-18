import express from "express";

const router = express.Router();

import {
  getBlueprints,
  createBlueprint,
  updateBlueprint,
  deleteBlueprint,
} from "../controllers/blueprint-controller";

router.get("/", getBlueprints);
router.post("/", createBlueprint);
router.patch("/:id", updateBlueprint);
router.delete("/:id", deleteBlueprint);

export default router;
