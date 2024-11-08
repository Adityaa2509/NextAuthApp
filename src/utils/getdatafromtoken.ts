import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

interface DecodedToken {
    id: string;
}

export async function getDataFromToken(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value || "";
        
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;
        console.log(decodedToken);
        return decodedToken.id;
    } catch (err) {
        console.error("Error decoding token:", err);
        return undefined;
    }
}
