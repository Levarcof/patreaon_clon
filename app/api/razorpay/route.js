import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/app/models/Payment";
import Razorpay from "razorpay";
import connectDb from "@/app/db/connectDb";
import User from "@/app/models/User";


export const POST = async (req) => {
    await connectDb()
    let body = await req.formData()
    body = Object.fromEntries(body)
    // Check if razorpayOrderId is present on the server
    let p = await Payment.findOne({oid:body.razorpay_order_id})

    if(!p){
        return NextResponse.json({success:false , message:"Order Id not found"})
    }

    let user  = await User.findOne({username:p.to_user})
    let secret = user.razorpaysecret
    
    let xx = validatePaymentVerification({"order_id":body.razorpay_order_id , "payment_id":body.razorpay_payment_id} ,  body.razorpay_signature, secret)

    if(xx)
    {
        const updatedPayment = await Payment.findOneAndUpdate({oid:razorpay_order_id} , {done:"true"} , {new:true}) 
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`)
    }
    else{
        return NextResponse.json({success:false , message:"Payment vaerfication is failed"})
    }

}
// जब भी आप Next.js में कोई API रीक्वेस्ट या Middleware Logic लिखते हैं, तो NextResponse का उपयोग करके आप क्लाइंट (Frontend या अन्य सर्विस) को Response भेज सकते हैं। यह आपको Response की स्थिति (status), हेडर्स (headers), और डेटा को नियंत्रित करने की अनुमति देता है।