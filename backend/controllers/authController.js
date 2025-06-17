import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, photo } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "email already exists" });
    }
    const userCreated = await User.create({
      username,
      email,
      password,
      photo,
    });

    res.status(200).json({ success: true, message: "Successfully Created" });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to create. Try again",
        error: error.message,
      });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    // console.log(userExist);

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials " });
    }

    // const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password);

    if (user) {

        const token = await userExist.generateToken();
        const {password,role,...rest} = userExist._doc;
        // console.log(rest);
        
        res.cookie('accessToken',token,{
            httpOnly:true,
            expires:token.expiresIn
        }).status(200).json({success:true,message:"Successfully Login",data:rest})
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json("Failed To Login");
  }
};
