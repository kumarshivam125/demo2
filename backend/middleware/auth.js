const jwt=require('jsonwebtoken');
exports.auth=(req,resp,next)=>{
    try{
        const token=req.headers("Authorization").replace("Bearer ","")||req.body.token;
        if(!token){
            return resp.status(401).json({
                success:false,
                message:"Token Missing"
            })
        }
        try{
            const payload=jwt.verify(token,"Shivam");
            return resp.status(200).json({
                success:true,
                message:"Token Decoded",
                token
            })
        }
        catch(err){
            return resp.status(500).json({
                success:false,
                message:"Token Invalid"
            })
        }
        next();
    }
    catch(err){
        return resp.status(500).json({
            success:false,
            message:"Error while Verifying Token"+err.message
        })
    }
}