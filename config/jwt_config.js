const key = 'b5c3bff615671c004d78c91daa74cd0f6077dc3fb041270bce88601f4d7ec1037acbc7f47df0eca4dafe5eb38a32f11bd7c3c381da0e8a83662ac94a2cdc9a9b'
const jwt = require("jsonwebtoken");

module.exports = {
    generateAccessToken: (email) => {
       return jwt.sign({email: email},key)
    },
    verifyToken: (token) => {
        try{
           let decoded =  jwt.verify(token.split(" ")[1], key)
            return decoded
        }catch{
            return false
        }
    }
}
