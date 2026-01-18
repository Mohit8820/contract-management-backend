import { Router } from "express";
import {
  getContracts,
  getContract,
  createFromBlueprint,
  updateStatus,
  updateFields,
} from "../controllers/contract-controller";

const router = Router();

router.get("/", getContracts);
router.get("/:id", getContract);

router.post("/from-blueprint", createFromBlueprint);
router.patch("/:id/status", updateStatus);
router.patch("/:id/fields", updateFields);

export default router;
