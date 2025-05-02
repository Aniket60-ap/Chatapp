const jwt = require("jsonwebtoken");

exports.isAuthentication = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ success: false, message: "User Not Authenticated" });
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(decode)
    if (!decode) {
      return res.json({ success: false, message: "Invalid Token" });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
