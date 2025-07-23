import Product from "../models/product.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { sendError } from "../utils/error.js"

export const createProduct = async (req, res, next) => {

    try {
        const imageUrl = req.file ? await uploadOnCloudinary(req.file) : null;
        const newProduct = await Product({
            userId: req.user.id,
            name: req.body.name,
            desc: req.body.desc,
            price: req.body.price,
            category: req.body.category,
            images: req.body.images,
            images: imageUrl ? [imageUrl] : [],
        })

        await newProduct.save()

        res.status(200).json({ status: 200, succes: true, message: 'Product created', product: newProduct });
    } catch (error) {
        sendError(res, 500, error.message)
    }
}
export const getProducts = async (req, res, next) => {

    const { min, max, name, limit, category, sortBy = 'createdAt', order = 'desc' } = req.query
    const filters = {
        price: { $gt: min || 1, $lt: max || 99999999 }
    }
    if (name && name.trim() !== '') {
        filters.name = { $regex: name, $options: 'i' }
    }
    if (category && category.trim() !== '') {
        filters.category = { $regex: category, $options: 'i' }
    }
    try {
        const products = await Product.find(filters).sort({ [sortBy]: order === 'asc' ? 1 : -1 }).limit(Number(limit))

        res.status(200).json({
            success: true,
            status: 200,
            message: 'Products fetched successfully',
            data: products,
            count: products.length
        })
    } catch (error) {
        sendError(res, 500, error.message)
    }
}
export const getSingleProduct = async (req, res, next) => {

    try {
        const product = await Product.findById(req.params.id)

        res.status(200).json({
            success: true,
            status: 200,
            message: 'Product fetched successfully',
            data: product,
        })
    } catch (error) {
        sendError(res, 500, "Product not found")
    }
}
export const deleteProducts = async (req, res, next) => {

    try {
        await Product.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            status: 200,
            message: 'Product deleted successful',
        })
    } catch (error) {
        sendError(res, 500, error.message)
    }
}
export const updateProduct = async (req, res, next) => {

    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
            // $push: { images: 'https://i5.walmartimages.com/seo/VILINICE-Noise-Cancelling-Headphones-Wireless-Bluetooth-Over-Ear-Headphones-with-Microphone-Black-Q8_b994b99c-835f-42fc-8094-9f6be0f9273b.be59955399cdbd1c25011d4a4251ba9b.jpeg' }
        },
            { new: true })


        res.status(200).json({
            success: true,
            status: 200,
            message: 'Product updated successfully',
            data: updateProduct,
        })
    } catch (error) {
        sendError(res, 500, error.message)
    }
}