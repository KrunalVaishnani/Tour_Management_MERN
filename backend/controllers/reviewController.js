import Review from "../models/Review.js";
import Tour from "../models/Tour.js";

export const createReview = async (req, res) => {
  const tourId = req.params.tourId;
  const date = new Date().toDateString();


  const newReview = new Review({ ...req.body});
  try {
    const savedReview = await newReview.save();

    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });

    res.status(200).json({ success: true, message: "Review Submitted",data:savedReview });
  } catch (error) {
    console.log(error.message);
    
    res.status(500).json({success:false,message:"Failed To Submit Review"})
  }
};
