import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = "uploads";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png|webp|svg|ico|gif|jfif|avif|heic|bmp|tiff/;
  const extension = path.extname(file.originalname).toLowerCase().replace(".", "");
  const isImageMime = file.mimetype && file.mimetype.startsWith("image/");
  const isAllowedExt = allowedExtensions.test(extension);

  if (isImageMime || isAllowedExt) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only image files (JPG, JPEG, PNG, WEBP, GIF, JFIF, SVG, AVIF, HEIC) are allowed."
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