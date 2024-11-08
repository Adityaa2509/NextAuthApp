import { connectDb } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";

import { getDataFromToken } from "@/utils/getdatafromtoken";
import User from "@/models/user.model";
await connectDb();

export async function GET(req:NextRequest){
    try{
        //extract data from token
        //create a utility
        const userId = await getDataFromToken(req);
        const user = await User.findOne({_id:userId}).select("-password");
        if(user){
            return NextResponse.json({
                msg:"User Found",
            success:true,
            status:200,
            data:user
            })
        }
        return NextResponse.json({
            msg:"User Not Found",
            success:false,
            status:400,
        })    

    }catch(err){
        console.log(err)
        console.log(err)
        return NextResponse.json({
            msg:"Something went Wrong",
            success:false,
            status:500
        })
    }
}