const Product = require("../models/products")

const createProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    try{   
        await newProduct.save();
        res.status(200).json("Product created successfully")
    } catch(error) {
        res.status(500).json("Failed to create product")
    }
}

const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find().sort({createdAt: -1})
        res.status(200).json(products)
    } catch(error) {
        res.status(500).json("Failed to get products")
    }
}

const getProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).json(product)
    } catch(error) {
        res.status(500).json("Failed to get product")
    }
}

const searchProducts = async (req, res) => {
    try{
        const result = await Product.aggregate(
            [
                {
                    $search: {
                        index: "furniture",
                        text: {
                            query: req.params.key,
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                }
            ]
        );
        res.status(200).json(result)
    } catch(error) {
        res.status(500).json("Failed to get the products")
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    searchProducts
}