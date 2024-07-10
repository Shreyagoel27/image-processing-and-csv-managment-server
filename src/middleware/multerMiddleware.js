import multer from "multer";
import { v4 as uuidv4 } from "uuid";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Uploads");
  },

  filename: (req, file, cb) => {
    const uniqueId = uuidv4();
    const { originalname } = file;

    cb(null, `${uniqueId}${originalname}`);
  },
});

const uploadFileMiddleware = multer({ storage });

export const fileUploadMiddleware = uploadFileMiddleware.fields([
  { name: "file", maxCount: 1 },
]);
