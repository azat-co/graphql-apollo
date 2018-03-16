const mongoose = require('mongoose')
const { composeWithMongoose } = require('graphql-compose-mongoose')
const { schemaComposer } = require('graphql-compose')
const { Schema }=   require('mongoose')


const ProductQuantityPerOrderSchema = new mongoose.Schema({
  id: Schema.Types.ObjectId,
  quantity: Number
})

const ProductSchema = new mongoose.Schema({
  id: Schema.Types.ObjectId,
  description: {
    type: String,
    required: true
  },
  inStoreCount: Number,
  name: {
    type: String,
    required: true
  },
  orders: [{ type: Schema.Types.ObjectId, ref: 'OrderOnProduct' }],
  productImageUrl: {
    type: String,
    required: true
  },
  productQuantityPerOrders: [{ type: Schema.Types.ObjectId, ref: 'ProductQuantityPerOrderOnProduct' }],
})

const OrderSchema = new mongoose.Schema({
  amount: Number,
  customerEmail:  {
    type: String,
    required: true
  },
  customerPayment:  {
    type: String,
    required: true
  },
  id: Schema.Types.ObjectId,
  isCompleted:  {
    type: String,
    required: true
  },
  orderCreatedAt: Date,
  productQuantityPerOrders: [ProductQuantityPerOrderSchema],
  products: [ProductSchema]
})

const ProductModel = mongoose.model('Product', ProductSchema)

// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const customizationOptions = {}; // left it empty for simplicity, described below
const ProductTC = composeWithMongoose(ProductModel, customizationOptions)

// STEP 3: CREATE CRAZY GraphQL SCHEMA WITH ALL CRUD USER OPERATIONS
// via graphql-compose it will be much much easier, with less typing
schemaComposer.rootQuery().addFields({
  productById: ProductTC.getResolver('findById'),
  productByIds: ProductTC.getResolver('findByIds'),
  product: ProductTC.getResolver('findOne'),
  allProducts: ProductTC.getResolver('findMany'),
  productCount: ProductTC.getResolver('count'),
  productConnection: ProductTC.getResolver('connection'),
  productPagination: ProductTC.getResolver('pagination'),
});

schemaComposer.rootMutation().addFields({
  productCreate: ProductTC.getResolver('createOne'),
  productUpdateById: ProductTC.getResolver('updateById'),
  productUpdateOne: ProductTC.getResolver('updateOne'),
  productUpdateMany: ProductTC.getResolver('updateMany'),
  productRemoveById: ProductTC.getResolver('removeById'),
  productRemoveOne: ProductTC.getResolver('removeOne'),
  productRemoveMany: ProductTC.getResolver('removeMany'),
});

const graphqlSchema = schemaComposer.buildSchema();
module.exports = graphqlSchema;