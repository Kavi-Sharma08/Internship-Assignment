import mongoose from "mongoose";

const FileObjectSchema = new mongoose.Schema({
  filename: String,
  path: String,
  size: Number,
  mimetype: String
}, { _id: false });
const FileSchema = new mongoose.Schema({
    name : {
        type : String
    },
    type : {
        type : String
    },
    description : {
        type : String
    },
    image : {
        type : [FileObjectSchema]
    },
    addtionalImages : {
        type : [FileObjectSchema]
    }
})
export default mongoose.model("File" , FileSchema )