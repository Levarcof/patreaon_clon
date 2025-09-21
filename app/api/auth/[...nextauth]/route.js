import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";

import mongoose from 'mongoose';
import Payment from '@/app/models/Payment';
import User from '@/app/models/User';
import connectDb from '@/app/db/connectDb';

// {jab login karte to kis tarah ka data pass hota hai
// ye ek session object hai

//   "user": {
//     "name": "John Doe",  // Custom name from the database
//     "email": "johndoe@example.com",
//     "image": "https://example.com/profile-picture.jpg",
//     "role": "admin"  // Custom role added from database
//   },
//   "expires": "2025-04-18T00:00:00.000Z"
// }



export const authoptions =  NextAuth(
    {
        providers:[
            GitHubProvider(
                {
                    clientId : process.env.GITHUB_ID,
                    clientSecret : process.env.GITHUB_SECRET
                }
            ),
        ],
        callbacks:{
            // callbacks एक ऐसा ऑब्जेक्ट है, जिसमें हम कस्टम लॉजिक जोड़ सकते हैं ताकि ऑथेंटिकेशन प्रक्रिया के दौरान अलग-अलग चरणों में कोड को नियंत्रित किया जा सके
            //यह फंक्शन तब ट्रिगर होता है, जब कोई यूजर लॉगिन करता है। हम इसे यूजर को वेरिफाई करने या लॉगिन प्रक्रिया को कस्टमाइज़ करने के लिए उपयोग कर सकते हैं।
            async signIn({user, account , profile , email , credentials}){
                if(account.provider == "github"){
                    //connect to the dataBase
                    await connectDb()
                    // await mongoose.connect(`mongodb://localhost:27017/patreaon`) ham mongodb ko aese directly bhi connect kar sakte hai
                    const currentUser = await User.findOne({email:email})
                    if(!currentUser)
                    {
                        //create new user
                        const newUser = await new User({
                            email : user.email,
                            username : user.email.split("@")[0]
                        })
                        await newUser.save()
                    }
                    return true
                }

            },
//यह फंक्शन हर बार तब चलता है, जब यूजर का सेशन क्रिएट या एक्सेस होता है। हम इस फंक्शन का उपयोग करके सेशन में कस्टम डेटा जोड़ सकते हैं।            
            async session({session, user ,token})
            {
                const dbUser = await User.findOne({email:session.user.email})
                console.log(dbUser)
                session.user.name = dbUser.username
                return session
            },
        }
        
        

    }
)
export { authoptions as GET, authoptions as POST}
