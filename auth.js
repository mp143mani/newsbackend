const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRound = 10;
const secretKey = "PoINjnLK89$#!Nnjsdk!@%";
const JWTD = require("jwt-decode");

//hashed password generation
let hashPassowrd = async (password) => {
  let salt = await bcrypt.genSalt(saltRound);
  let hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

let hashCompare = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

let createToken = async (email, role) => {
  let token = await jwt.sign({ email, role}, secretKey, { expiresIn: "2h" });
  return token;
};

let jwtDecode = async (token) => {
  let data = await jwt.decode(token);
  console.log(data)
  return data;
};



//token validation
let validate = async (req, res, next) => {
  if(req.headers && req.headers.authorization)
  {
  let token = req.headers.authorization.split(" ")[1];
  let data = await jwtDecode(token);
  let currentTime = Math.round(new Date() / 1000);
  if (currentTime <= data.exp) next();
  else
    res.send({
      stausCode: 401,
      message: "Token Expired",
    });
  }
  else{
    res.send({
      statusCode:401,
      message:"Invalid Token or no token"
    })
  }
};



const authenticate = async(token)=>{
  const decode = JWTD(token);
  if(Math.round(new Date() / 1000) <= decode.exp){
      return decode.email;
  }
  else{
      return "";
  }
}




module.exports = {
  hashPassowrd,
  hashCompare,
  createToken,
  jwtDecode,
  validate,
  authenticate
};
