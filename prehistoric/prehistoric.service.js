const prisma = require("../db")

const getPrehistoric = async () => {

    try {
        const prehistoricData = await prisma.prehistoric.findMany();
        return prehistoricData;
    } catch (error) {
        // Handle any errors that occur during the database operation
        console.error("Error fetching prehistoric data:", error);
        throw error; // Re-throw the error to propagate it to the caller
    }
}

module.exports = {
    getPrehistoric
}