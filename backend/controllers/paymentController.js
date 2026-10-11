import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { Course } from '../models/Course.js';

export const calculateGamifiedCheckout = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id; // Derived from your verified JWT Auth Cookie

    const [user, course] = await Promise.all([
      User.findById(userId),
      Course.findById(courseId)
    ]);

    if (!user || !course) {
      return res.status(404).json({ success: false, message: "Entities not found." });
    }

    // Enterprise Rule: 1 Skill Point = ₹1 Discount. Maximum discount capped at 50% of original price.
    const maxDiscountAllowed = course.price * 0.50;
    const pointsToApply = Math.min(user.skillPointsWallet?.balance || 0, maxDiscountAllowed);
    const finalCalculatedPrice = course.price - pointsToApply;

    return res.status(200).json({
      success: true,
      originalPrice: course.price,
      appliedDiscount: pointsToApply,
      finalPrice: finalCalculatedPrice,
      remainingWalletBalance: (user.skillPointsWallet?.balance || 0) - pointsToApply
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
