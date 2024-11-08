import { connectDb } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import User from "@/models/user.model";
import jwt from 'jsonwebtoken'
await connectDb();

export async function POST(req:NextRequest){
    try{
        const reqBody = req.json();
        const {email,password} = await reqBody;
        const user = await User.findOne({email});
        if(!user){
            console.log("User Not Found")
            return NextResponse.json({
                msg:"User is not registered" ,
                success:false,
                status:402
            })
        }
        let check = false;
        try{
        check = await bcryptjs.compare(password,user.password)
}catch(err){
    console.log("Something went wrong while checking password")
    console.log(err);
    return NextResponse.json({
        msg:"Something went Wrong while checking password",
        success:false,
        status:500
    })
}
if(!check){
    return NextResponse.json({
        msg:"Invalid Credentials",
        success:false,
        status:400
    })
}
    const tokenData = {
        id:user._id,
        username:user.username,
        email:user.email
    }
    const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'});
    
    const response =  NextResponse.json({
        msg:"User logged in successfully",
        status:200,
        token,
        success:true
    })
    response.cookies.set("token",token,{
        httpOnly:true
        //server only manipulates this 
        //user ko browser m dikhti hai par change nahi kar sakta
    })
    return response;
    }catch(err){
        console.log("Something Went Wrong")
        console.log(err)
        return NextResponse.json({
            msg:"Something went Wrong",
            success:false,
            status:500
        })
    }
}

