import multer from "multer";

const storage = multer.memoryStorage(); // kita simpan di memori, bukan disk
const upload = multer({ storage });
export default upload;
