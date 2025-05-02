const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }
    const user = await User.findOne({ userName });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exist try differnt" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    //profile photo
    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?userName=${userName}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?userName=${userName}`;

    await User.create({
      fullName,
      userName,
      password: hashPassword,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender,
    });
    return res.json({ success: true, message: "Account Created Successfully" });
  } catch (error) {
    console.log(error);
  }
};

exports.Login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(401).json({ message: "Incorrect username or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Incorrect username or password" });
    }

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      _id: user._id,
      userName: user.userName,
      fullName: user.fullName,
      profilePhoto: user.profilePhoto,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.LogOut = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 }).json({
      success: true,
      message: "LoggedOut SuccessFully",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getOtherUser = async (req, res) => {
  try {
    const LoggedInUserId = req.id;
    const otherUsers = await User.find({ _id: { $ne: LoggedInUserId } }).select(
      "-password"
    );
    return res.json(otherUsers);
  } catch (error) {
    console.log(error);
  }
};
