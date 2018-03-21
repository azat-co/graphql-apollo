const mongoose = require('mongoose')

const ProductQuantityPerOrder = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    quantity: {
        type: Number,
        required: true
    }
}, { collection: 'productQuantityPerOrder' })

module.exports = ProductQuantityPerOrder
