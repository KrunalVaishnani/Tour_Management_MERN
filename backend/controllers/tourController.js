import { default as Tour } from "../models/Tour.js";

export const createTour = async (req, res) => {
  const {
    title,
    city,
    address,
    desc,
    distance,
    price,
    maxGroupSize,
    featured,
  } = req.body;
  // console.log(req.file);
  // console.log(req.body);

  // Check if the tour with the same title already exists
  const tourExist = await Tour.findOne({ title });
  if (tourExist) {
    return res.status(400).json({ message: "Tour already exists" });
  }

  // Ensure req.file exists before accessing its properties
  let photoPath = "";
  if (req.file) {
    photoPath = `/tour-images/${req.file.filename}`;
  }

  const newTour = new Tour({
    title,
    city,
    address,
    desc,
    distance,
    price,
    maxGroupSize,
    featured,
    photo: photoPath, // Store path in DB or leave empty
  });

  try {
    const savedTour = await newTour.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedTour,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create. Try again", error });
  }
};

export const updateTour = async (req, res) => {
  const id = req.params.id;
  const updateData = {
    ...req.body,
    ...(req.file && { photo: `/tour-images/${req.file.filename}` }), // Only add photo if a new file is provided
  };

  try {
    const updatedTour = await Tour.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Successfully Updated",
      data: updatedTour,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to Update. Try Again" });
  }
};
export const deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);
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
export const getSingleTour = async (req, res) => {
  const id = req.params.id;

  try {
    const tour = await Tour.findById(id).populate("reviews");
    res.status(200).json({
      success: true,
      message: "Successfull",
      data: tour,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};
export const getAllTour = async (req, res) => {
  const page = parseInt(req.query.page);
  try {
    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      success: true,
      message: "Successfull",
      count: tours.length,
      data: tours,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};
export const getTourBySearch = async (req, res) => {
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    const tours = await Tour.find({
      city,
      distance: { $gte: distance }, // gte => greater than Equal
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");

    res.status(200).json({
      success: true,
      message: "Successfull",
      data: tours,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

export const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true })
      .limit(8)
      .populate("reviews");

    res.status(200).json({
      success: true,
      message: "Successfull",
      count: tours.length,
      data: tours,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: "Not Found" });
  }
};

export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();

    res.status(200).json({ success: true, data: tourCount });
  } catch (error) {
    res.status(500).json({ success: false, message: "failed to fetch" });
  }
};
