import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadPath = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const safeExt = /^\.(jpe?g|png|webp)$/i.test(ext) ? ext : ".jpg";
    const randomHex = crypto.randomBytes(8).toString("hex");
    const uniqueName = `${Date.now()}-${randomHex}${safeExt}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = /^(jpe?g|png|webp)$/i;
  const extension = path.extname(file.originalname || "").toLowerCase().replace(".", "");
  const allowedMimes = ["image/jpeg", "image/png", "image/webp"];

  const isAllowedMime = file.mimetype && allowedMimes.includes(file.mimetype.toLowerCase());
  const isAllowedExt = allowedExtensions.test(extension);

  if (isAllowedMime && isAllowedExt) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only secure image files (JPG, JPEG, PNG, WEBP) are allowed."
      )
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;