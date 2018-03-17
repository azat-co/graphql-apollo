const mongoose = require('mongoose')
const { composeWithMongoose } = require('graphql-compose-mongoose')
const { schemaComposer } = require('graphql-compose')
const { Schema } = require('mongoose')


const ProductSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    description: {
        type: String,
        required: true
    },
    inStoreCount: Number,
    name: {
        type: String,
        required: true
    },
    productImageUrl: {
        type: String,
        required: true
    }
})


module.exports = ProductSchema
