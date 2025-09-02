import multer from "multer";

// Multer configuration for single file upload (stored in memory)
const storage = multer.memoryStorage();
export const singleUpload = multer({ storage }).single("file");
