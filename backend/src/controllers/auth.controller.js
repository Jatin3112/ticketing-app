import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";

const signupUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new ApiError(400, "All fields are necessary");
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      throw new Error(409, "Username already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return res.status(201).json(
      new ApiResponse(201, {
        user: {
          id: newUser.id,
          username: (await newUser).username,
          role: (await newUser).role,
        },
      })
    );
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new ApiError(400, "All fields are necessary");
    }

    // Find user by username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new ApiError(401, "Invalid Username");
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid Password");
    }

    const tokenPayload = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };
    const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const options = {
      httpOnly: true, // Cannot be modified from the client side
    };

    res
      .status(200)
      .cookie(accessToken, "accessToken", options)
      .json(
        new ApiResponse(201, {
          user: {
            id: user.id,
            username: user.username,
            role: user.role,
            token: accessToken,
          },
        })
      );
  } catch (error) {
    next(error);
  }
};

export { signupUser, loginUser };
