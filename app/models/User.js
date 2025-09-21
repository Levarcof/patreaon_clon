import mongoose from "mongoose";
const {Schema,model } = mongoose

const UserSchema = new Schema({
    email :{type:String , required:true},
    name : {type:String },
    username : {type:String , required:true},
    profile: {type:String},
    coverpic : {type:String},
    razorpayid: { type: String },
    razorpaysecret: { type: String },
    createdAt :{type:Date , default:Date.now},
    updatedAt : {type:Date , default:Date.now},
});
 
export default mongoose.models.User || model("User" ,UserSchema )

// यह चेक करता है कि मोंगूस पहले से कोई मॉडल User के नाम से रजिस्टर्ड कर चुका है या नहीं।
// अगर User नाम से मॉडल पहले से मौजूद है, तो उसे रिटर्न करता है।

// यह नया मॉडल है जिसे अभी model("User", UserSchema) के साथ बनाया गया है। अगर mongoose.model.User मौजूद नहीं है, 
// तो इसे इस्तेमाल किया जाएगा।

// When a model is created in Mongoose, it is stored in the mongoose.models object as part of Mongoose's internal cache.