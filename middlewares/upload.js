import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.dirname(__filename));
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}`+ "-" + file.fieldname + ".pdf";
        cb(null, filename);
    }
})

const upload = multer({ storage:storage });

export default upload;