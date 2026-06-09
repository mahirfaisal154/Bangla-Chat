import jwt from 'jsonwebtoken'
export const generateToken = (userId,res) => {
    // Implementation for generating JWT token
    //JWT is a token (a long string) your server gives to a user after login, so they don't have to log in again on every request.


    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn: "7d"})
    //a method to save cookie
    res.cookie("jwt", token, {  
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 ,// 7 days
        secure: process.env.NODE_ENV !== "development",
        sameSite:"strict",
    })
}
