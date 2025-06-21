import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import crypto from "crypto";
import path from "path";
import { connectDB } from "./database/database.js";
import File from "./models/file.model.js";
import { fileURLToPath } from "url";
import { sendMail } from "./helper/sendMail.js";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, bytes) {
      const fn = bytes.toString("hex") + path.extname(file.originalname);
      cb(null, fn);
    });
  },
});

const upload = multer({ storage });
app.post(
  "/upload",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "additionalImages", maxCount: 5 },
  ]),
  async (req, res) => {
    const file = new File({
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      image: req.files["image"]?.map((file) => ({
        filename: file.filename,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype,
      })),
      additionalImages: req.files["additionalImages"]?.map((file) => ({
        filename: file.filename,
        path: file.path,
        size: file.size,
        mimetype: file.mimetype,
      })),
    });
    const data = await file.save();
    console.log(data);
    res.send(data);
  }
);
app.get("/enquire" , async (req, res)=>{
  const response = await sendMail();
  console.log(response)
  res.json({
    data : response
  })
})
connectDB()
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(process.env.PORT || 3000, () => {
      console.log("Listening on port ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
