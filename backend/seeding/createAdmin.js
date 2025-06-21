// seeding/createAdmin.js
import "dotenv/config";
import prisma from "../src/config/prisma.js";
import bcrypt from "bcrypt";

async function createAdmin() {
  try {
    const existing = await prisma.user.findUnique({
      where: { username: "admin" },
    });

    if (existing) {
      console.log("Admin user already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await prisma.user.create({
      data: {
        username: "admin",
        password: hashedPassword,
        role: "STAFF",
      },
    });

    console.log("Admin user created: admin / admin123");
  } catch (err) {
    console.error("Failed to seed admin user:", err);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
