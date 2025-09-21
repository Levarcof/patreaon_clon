import mongoose from "mongoose";

const connectDb = async () => {
try{
    const conn = await mongoose.connect(`mongodb://localhost:27017/patreaon`,{
        useNewUrlParser :true,
    });
console.log(`MongoDb connected : {conn.connection.host}`)
}
catch(error){
console.error(error.message)
process.exit(1)
}
}
export default connectDb
// process.exit(1) Node.js में एक कमांड है जो प्रोग्राम को तुरंत समाप्त कर देता है। इसे आम तौर पर तब उपयोग किया जाता है जब कोई गंभीर त्रुटि होती है और स्क्रिप्ट को आगे चलाने का कोई मतलब नहीं होता।
