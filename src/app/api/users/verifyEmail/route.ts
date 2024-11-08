import { connectDb } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";

await connectDb();

export async function POST(req: NextRequest) {
    try {
        const reqbody = await req.json();
       const {token} =  reqbody;
        console.log("Received token:", token);

        // Find user by token and expiry check
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gte: Date.now() }
        });

        if (!user) {
            console.log("No user found or token expired");
            return NextResponse.json({
                msg: "Invalid token details",
                success: false,
                status: 400
            });
        }

        console.log("Found user:", user);
        console.log("Token from DB:", user.verifyToken);
        console.log("Token Expiry Date:", user.verifyTokenExpiry);
        console.log("Current Time:", Date.now());

        user.isVerified = true;
        user.verifyToken = undefined; // Clear token after verification
        user.verifyTokenExpiry = undefined; // Clear token expiry after verification
        await user.save();

        return NextResponse.json({
            msg: "User verified successfully",
            success: true,
            status: 200,
            data: user
        });
    } catch (err) {
        console.log("Something went wrong:", err);
        return NextResponse.json({
            msg: "Something went wrong",
            success: false,
            status: 500
        });
    }
}
