import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

const isVerifyUser = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;

    // console.log("User without password:", user);
    // res.json({
    //   message: "User without password:",
    //   user: user,
    // });
    next();

  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default isVerifyUser;
