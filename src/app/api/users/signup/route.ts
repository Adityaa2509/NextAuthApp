import { connectDb } from "@/dbConfig/dbConfig";
import User from '@/models/user.model'
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/utils/mailer";
await connectDb()


export async function POST(req:NextRequest){
    try{
        const reqBody = req.json();
        console.log(reqBody)
        const {username,email,password} = await reqBody;
        const findUser = await User.findOne({email})
        if(findUser){
            return NextResponse.json({
                msg:"User already registerd",
                status:401,
                success:false
            })
         }
         const salt = await bcryptjs.genSalt(10);
         const hashedPassword = await bcryptjs.hash(password,salt);
         const nUser = await User.create({
            username,
            email,
            password:hashedPassword
         })
         console.log(nUser);

         //Send Verificaiotn email
         await sendEmail({email,emailType:"VERIFY",userId:nUser._id})

         return NextResponse.json({
            msg:"User Created Successfully",
            status:200,
            data:nUser,
            success:true
         })
    }catch(err){
        console.log(err)
        console.log("error while signup")
        return NextResponse.json({
            error:err,
            status:500
        })
    }
}
