import prisma from "../config/prisma.js";

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to MySQL");
  } catch (error) {
    console.error("Failed to connect to MySQL", error);
    process.exit(1);
  }
};

export default connectDB;
