import mongoose from 'mongoose'

var orderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
})

export default mongoose.model('Order', orderSchema)