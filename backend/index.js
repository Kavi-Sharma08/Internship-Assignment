import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import multer from "multer";
import crypto from "crypto"
import path from "path"
import { connectDB } from "./database/database.js";
import File from "./models/file.model.js"
import { fileURLToPath } from 'url';
dotenv.config();

const app = express();
app.use(cors({
    origin : 'http://localhost:5173'
}))
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function(err , bytes){
        const fn = bytes.toString("hex") + path.extname(file.originalname);
        cb(null , fn);

    })
  },
});

const upload = multer({ storage });
app.post("/upload" , upload.fields([
    { name: "image", maxCount: 1 },
    { name: "additionalImages", maxCount: 5 },
  ]) , async (req, res)=>{
    const {name , type , description} = req.body;
    const {image , additionalImages} = req.files
    console.log(image)
    console.log(additionalImages)
    const file = new File({
        name,
        type,
        description,
        image,
        additionalImages
    })
    const data = await file.save();
    console.log(data)
    res.send(data)
})


connectDB().then(()=>{
    console.log("Database Connected Successfully")
    app.listen(process.env.PORT || 3000 , ()=>{
        console.log("Listening on port " ,process.env.PORT)
    })

}).catch((err)=>{
    console.log(err)
})
