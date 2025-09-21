"use server"
import Razorpay from "razorpay"
import Payment from "@/app/models/Payment"
import User from "@/app/models/User"
import connectDb from "@/app/db/connectDb"
import Username from "@/app/[username]/page"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDb()
    var instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_KEY_ID, key_secret: process.env.KEY_SECRET })
    //Razorpay API को उपयोग करने के लिए यह एक instance बनाता है।


    let options = {
        amount: Number.parseInt(amount),
        currency: "INR"
    }
    //  options object में amount और currency Razorpay API के लिए अनिवार्य (fix) keywords हैं। 
    //  ये Razorpay के backend को बताने के लिए उपयोग किए जाते हैं कि कितना भुगतान करना है और किस मुद्रा में भुगतान करना है।



    let x = await instance.orders.create(options)
    await Payment.create({ oid: x.id, amount: amount/100, to_user: to_username, name: paymentform.name, message: paymentform.message })
    // x = { kuch es tarike se x object milta hai jisme id razorpay se milti hai
    //     id: "order_H1ABCD1234",
    //     amount: 50000,
    //     currency: "INR",
    //     status: "created"
    //   }
    // जब आप instance.orders.create(options) कॉल करते हैं, तो Razorpay API आपके द्वारा भेजे गए options (जैसे amount, currency) के आधार पर एक नया ऑर्डर बनाती है।
    // Razorpay का सर्वर इस अनुरोध को प्रोसेस करता है और आपको एक ऑर्डर ऑब्जेक्ट (x) लौटाता है।
    // यह ऑब्जेक्ट Razorpay के डेटाबेस में एक यूनिक ऑर्डर की जानकारी दर्शाता है।
    return x;
}


// {
// ObjectId MongoDB का एक डेटा प्रकार (data type) है, जो प्रत्येक दस्तावेज़ (document) को एक अद्वितीय (unique) . पहचानकर्ता देता है। यह एक 12-बाइट का Hexadecimal Identifier होता है जो MongoDB द्वारा स्वतः उत्पन्न किया जाता है
//     _id: ObjectId("64e34b789f1e4a3b78900b10"), // ObjectId type remains 
//     username: "john_doe",
//     email: "john@example.com"
// }

// { by using toObject({ flattenObjectIds: true })
//     _id: "64e34b789f1e4a3b78900b10", // ObjectId is converted to a String
//     username: "john_doe",
//     email: "john@example.com"
// }

export const fetchuser = async (username) => {
    await connectDb()
    let u = await User.findOne({ username: username })
    let user = u.toObject({ flattenObjectIds: true })
    return user
}

export const fetchpayments = async (username) => {
    await connectDb()
    //find() एक MongoDB क्वेरी है जो दस्तावेज़ों (documents) को फ़िल्टर करती है।
    let p = Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).limit(10).lean()

    return p
}
export const updateProfile = async (data, oldusername) => {
    await connectDb()
    let nData = Object.fromEntries(data)

    if (oldusername !== nData.username) {
        let u = await User.findOne({ username: nData.username })
        if (u) {
            return { error: "Username is already exist" }
        }
        await User.updateOne({ email: nData.email }, nData) //ye ek filter hai jisme pehla argument hai uska matlab ye hai ki email: nData.email vale collection ko dhundo or usko nData se update kar do
        await Payment.updateMany({ to_user: oldusername }, { to_user: nData.username })
    }
    else {
        await User.updateOne({ email: nData.email }, nData)
    }
}
