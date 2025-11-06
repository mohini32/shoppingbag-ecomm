const productmodel = require('../models/productmodel')
const { Op } = require('sequelize')


exports.getAllProducts = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = '',
            minPrice,
            maxPrice,
            sortBy = 'createdAt',
            sortOrder = 'DESC'
        } = req.query;

        const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

        // Build where clause for filtering
        const whereClause = {};

        // Search by product name or description
        if (search.trim()) {
            whereClause[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } }
            ];
        }

        // Price range filtering
        if (minPrice || maxPrice) {
            whereClause.price = {};
            if (minPrice) whereClause.price[Op.gte] = parseFloat(minPrice);
            if (maxPrice) whereClause.price[Op.lte] = parseFloat(maxPrice);
        }

        // Only show products with stock > 0
        whereClause.stock = { [Op.gt]: 0 };

        // Validate sort parameters
        const validSortFields = ['name', 'price', 'createdAt', 'stock'];
        const validSortOrders = ['ASC', 'DESC'];

        const orderBy = validSortFields.includes(sortBy) ? sortBy : 'createdAt';
        const orderDirection = validSortOrders.includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : 'DESC';

        const { count, rows: products } = await productmodel.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit, 10),
            offset: offset,
            order: [[orderBy, orderDirection]],
            attributes: ['id', 'name', 'description', 'price', 'stock', 'imageUrl', 'createdAt']
        });

        // // Format response
        // const formattedProducts = products.map(product => ({
        //     id: product.id,
        //     name: product.name,
        //     description: product.description,
        //     price: parseFloat(product.price),
        //     stock: product.stock,
        //     imageUrl: product.imageUrl,
        //     createdAt: product.createdAt
        // }).toJSON());
        const formattedProducts = products.map(p => ({
            ...p.toJSON(),
            price: parseFloat(p.price)
        }));


        res.status(200).json({
            status: "success",
            products: formattedProducts,
            pagination: {
                currentPage: parseInt(page, 10),
                totalPages: Math.ceil(count / parseInt(limit, 10)),
                totalProducts: count,
                hasNextPage: parseInt(page, 10) < Math.ceil(count / parseInt(limit, 10)),
                hasPrevPage: parseInt(page, 10) > 1
            },
            filters: {
                search,
                minPrice,
                maxPrice,
                sortBy: orderBy,
                sortOrder: orderDirection
            }
        });
    }
    catch (error) {
        console.error('Get products error:', error);
        console.error('Error stack:', error.stack);
        console.error('Error message:', error.message);
        res.status(500).json({
            status: "error",
            message: "Failed to fetch products",
            error: error.message
        });
    }
}

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await productmodel.findByPk(id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json({ product })
    }
    catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({
            status: "error",
            message: "Failed to fetch product"
        });
    }
}



exports.createProducts = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        const imageurl = req.files && req.files.image ? path.basename(req.files.image[0].key) : null;
        const newProduct = await productmodel.create({
            name,
            description,
            price,
            stock,
            imageurl
        });
        res.status(201).json({ message: "Product created", newProduct })
    }
    catch (error) {
        console.log(error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: error.message || "Internal server error" })
    }

}

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;


    try {
        const product = await productmodel.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const imageUrl = req.files && req.files.image ? path.basename(req.files.image[0].key) : product.imageUrl;
        await product.update({
            name,
            description,
            price,
            stock,
            imageUrl
        });
        res.status(200).json({ message: "Product updated", product })
    }
    catch (error) {
        console.log(error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: error.message || "Internal server error" })
    }
}

exports.deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        const products = await productmodel.findByPk(id);
        if (!products) {
            return res.status(404).json({ status: "failed", message: "product not found" });
        }
        await products.destroy();
        res.status(200).json({ status: "success", message: "product deleted" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ status: "failed", message: "internal server error" });
    }
}
