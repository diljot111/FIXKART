import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../models/User";
import { hashPassword } from "../services/auth.service";

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private (Admin)
export const getUsers = async (req: Request, res: Response) => {
  try {
    const { keyword, role, page = 1, limit = 10 } = req.query;
    let query: any = {};

    if (keyword) {
      query.$or = [
        { firstName: { $regex: keyword, $options: "i" } },
        { lastName: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
      ];
    }

    if (role) {
      query.role = role;
    }

    const users = await User.find(query)
      .select("-password")
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.json({
      users,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total,
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create user (Admin only)
// @route   POST /api/users
// @access  Private (Admin)
export const createUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const { email, password, role, firstName, lastName, mobile } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      email,
      password: hashedPassword,
      role,
      firstName,
      lastName,
      mobile,
    });

    res.status(201).json({
      _id: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update user (Admin only)
// @route   PUT /api/users/:id
// @access  Private (Admin)
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const { role, firstName, lastName, mobile, status } = req.body;

    if (role) user.role = role;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (mobile) user.mobile = mobile;
    if (status) user.status = status;

    await user.save();

    res.json({
      _id: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private (Admin)
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User removed" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
