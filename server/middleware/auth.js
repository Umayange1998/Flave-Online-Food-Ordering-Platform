import jwt from "jsonwebtoken";


const authMiddleware = (req, res, next) => {
const {token} =req.headers;
if(!token){
    return res.status(401).json({message:"Unauthorized. Please login."});
}
try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    next();
}catch(error){
    console.error("Authentication error:", error);
    return res.status(401).json({message:"Invalid token. Please login again."});
}
}

export default authMiddleware;