import { Router } from "express";
import {
  uploadCsvController,
  userStatusController,
} from "../controllers/userController.js";
import { fileUploadMiddleware } from "../middleware/multerMiddleware.js";

const router = Router();

router.post("/upload-csv", [fileUploadMiddleware], uploadCsvController);
router.get("/status", [], userStatusController);

export default router;
