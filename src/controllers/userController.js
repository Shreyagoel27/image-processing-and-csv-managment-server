import { deleteFileFromPathService } from "../services/commonService.js";
import path from "path";
import { userService, userStatusService } from "../services/userService.js";

export const uploadCsvController = async (req, res, next) => {
  try {
    const file = req.files.file[0];
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    const fileType = file.mimetype;
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (
      fileType !== "text/csv" &&
      fileType !== "application/vnd.ms-excel" &&
      fileExtension !== ".csv"
    ) {
      await deleteFileFromPathService(file.path);
      return res.status(400).send(`Uploaded file is not a CSV.`);
    }
    const result = await userService(file.path);
    return res.status(200).json({
      userId: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userStatusController = async (req, res, next) => {
  try {
    const { id } = req.query;

    const result = await userStatusService(id);
    return res.status(200).json({
      downloadlink: result,
    });
  } catch (err) {
    next(err);
  }
};
