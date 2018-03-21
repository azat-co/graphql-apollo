const mongoose = require('mongoose')
// const ProductSchema = require('./product.js')
const OrderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  amount: Number,
  customerEmail: {
    type: String,
    required: true
  },
  customerPayment: {
    type: String,
    required: true
  },
  isCompleted: {
    type: String,
    required: true
  },
  orderCreatedAt: Date,
  products: [{    
    product: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    },
    productQuantity: Number
  }]
  
})


module.exports = OrderSchema