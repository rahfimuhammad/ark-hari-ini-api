const prisma = require("../db")

const getPrehistoric = async () => {

    try {
        const prehistoricData = await prisma.prehistoric.findMany();
        return prehistoricData;
    } catch (error) {
        console.error("Error fetching prehistoric data:", error);
        throw error;
    }
}

module.exports = {
    getPrehistoric
}