import { default as User } from "../models/User.js";

export const createUser = async (req, res) => {
  const UserExist = await User.findOne(req.body.title);

  if (UserExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to Create. Try Again" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await User.findByIdAndDelete(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully Deleted",
      data: updateUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to Update. Try Again" });
  }
};
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully Deleted",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to Delete. Try Again" });
  }
};
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select('-password');
    res.status(200).json({
      success: true,
      message: "Successfull",
      data: user,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      success: true,
      message: "Successfull",
      data: users,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};
