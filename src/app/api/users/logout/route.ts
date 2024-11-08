import { connectDb } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
await connectDb();

export async function POST(){
    try{
        const resp = NextResponse.json({
            msg:"User Logout Successfully",
            success:true,
            status:200
        });
        resp.cookies.set("token","",{httpOnly:true,expires:new Date(0)} );
        return resp;
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