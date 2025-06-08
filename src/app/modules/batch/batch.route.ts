import { Router } from "express";


import { BatchController } from "./batch.controller";

const router = Router();

router.post("/", BatchController.createBatch);
router.get("/", BatchController.getAllBatches);
 router.get("/:id", BatchController.getBatchById);
router.patch("/:id", BatchController.updateBatch);
router.delete("/:id", BatchController.deleteBatch);

export const BatchRoutes = router;
