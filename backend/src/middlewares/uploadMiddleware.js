import multer from "multer";

// Configure Multer for disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/uploads/"); // Store files in the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Use unique filenames
    },
});

const upload = multer({ storage: storage });

export default upload;
