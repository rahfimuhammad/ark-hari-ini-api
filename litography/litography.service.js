const prisma = require("../db")

const getTotal = async (category) => {
    let whereCondition = {};

    if(category) {
        whereCondition = {
            category: category
        }
    }

    const totalArtworks = await prisma.litographyArtwork.count({
        where: whereCondition
    })
    return totalArtworks
}

const getTotalPages = async (category, pageSize) => {
    const totalArtworks = await getTotal(category);
    const totalPages = Math.ceil(totalArtworks / pageSize);
    return totalPages;
};


const getTotalBycategory = async (category, authorId) => {
    let whereCondition = {};

    if(category) {
        whereCondition = {
            category: category,
            litographyAuthorId: authorId
        }
    }

    const totalArtworks = await prisma.litographyArtwork.count({
        where: whereCondition
    })
    return totalArtworks
}

const getTotalPagesByCategory = async (category, pageSize, authorId) => {
    const totalArtworks = await getTotalBycategory(category, authorId);
    const totalPages = Math.ceil(totalArtworks / pageSize);
    return totalPages;
};


const getArtwork = async (category, search, page,pageSize) => {
    let whereCondition = {};
    const skip = (page - 1) * pageSize;

    if (category) {
        whereCondition = {
            category: category,
            OR: [
                {
                    title: {
                        contains: search
                    }
                },
                {
                    description: {
                        contains: search
                    }
                }
            ]
        };
    } else {
        whereCondition = {
            OR: [
                {
                    title: {
                        contains: search
                    }
                },
                {
                    description: {
                        contains: search
                    }
                }
            ]
        };
    }

    const artwork = await prisma.litographyArtwork.findMany({
        where: whereCondition,
        skip,
        take: pageSize,
        orderBy: {
            title: 'desc'
        },
        include: {
            litographyAuthor: true
        }
    });

    return artwork;
};

const getArtworkById = async (id) => {
    const artwork = await prisma.litographyArtwork.findUnique({
        where: {
            id
        },
        include: {
            litographyAuthor: true
        }
    })
    
    return artwork
}

const getArtworkByAuthor = async (authorId, category) => {

    let whereCondition = {};

    if(category) {
        whereCondition = {
            litographyAuthorId: authorId,
            category: category
        }
    } else {
        whereCondition = {
            litographyAuthorId: authorId
        }
    }

    const artwork = await prisma.litographyArtwork.findMany({
        where: whereCondition,
        orderBy: {
            title: 'desc'
        },
        include: {
            litographyAuthor: true
        }
    })

    return artwork
}

const getAuthor = async () => {

    const author = await prisma.litographyAuthor.findMany({
        orderBy: {
            author: 'desc'
        }
    })

    return author
}

const getauthorById = async (id) => {

    const author = await prisma.litographyAuthor.findUnique({
        where: {
            id
        }
    })

    return author
}

module.exports = {
    getArtwork,
    getArtworkById,
    getArtworkByAuthor,
    getAuthor,
    getauthorById,
    getTotal, 
    getTotalPages,
    getTotalPagesByCategory
}