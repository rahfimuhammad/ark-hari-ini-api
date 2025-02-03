const { PrismaClient } = require("@prisma/client") 

const prisma = new PrismaClient()

async function checkConnection() {
    try {
      await prisma.$connect();
      console.log("Database connected successfully!");
    } catch (error) {
      console.error("Failed to connect to the database:", error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  checkConnection();

module.exports = prisma