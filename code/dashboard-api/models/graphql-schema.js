const mongoose = require('mongoose')
const { composeWithMongoose } = require('graphql-compose-mongoose')
const { schemaComposer } = require('graphql-compose')
const { Schema }=   require('mongoose')

const ProductSchema = require('./product.js')
const OrderSchema = require('./order.js')

const ProductModel = mongoose.model('Product', ProductSchema)
const OrderModel = mongoose.model('Order', OrderSchema)

// STEP 2: CONVERT MONGOOSE MODEL TO GraphQL PIECES
const customizationOptions = {}; // left it empty for simplicity, described below
const ProductTC = composeWithMongoose(ProductModel, customizationOptions)
const OrderTC = composeWithMongoose(OrderModel, customizationOptions)
OrderTC.addFields({  
  notice: 'String', // shorthand definition
  productQuantityPerOrders: { // extended
    type: '[Json]', // String, Int, Float, Boolean, ID, Json
    description: 'Array of productQuantityPerOrders',
    resolve: (source, args, context, info) => {
      console.log(source, args, context, info)
      return ProductTC.getResolver('findByIds')
    },
  }
})
OrderTC.addRelation('myproducts', {
  resolver: ()=>ProductTC.getResolver('findByIds'),
  prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
    _ids: (source) => {
      console.log(source.toObject().products.map(product => mongoose.mongo.ObjectID(product.product._id)))
      return source.toObject().products.map(product => mongoose.mongo.ObjectID(product.product._id))
    },
  },
  projection: { products: true }, // point fields in source object, which should be fetched from DB
})
// STEP 3: CREATE CRAZY GraphQL SCHEMA WITH ALL CRUD USER OPERATIONS
// via graphql-compose it will be much much easier, with less typing

schemaComposer.rootQuery().addFields({
  product: ProductTC.getResolver('findById'),
  allProducts: ProductTC.getResolver('findMany'),
  _allProductsMeta: {
    count: {
      type: 'Int',
      resolve: ()=>{ return {count: ProductTC.getResolver('count')}}
    }
  },
  products: ProductTC.getResolver('findByIds'),
  productConnection: ProductTC.getResolver('connection'),
  productPagination: ProductTC.getResolver('pagination'),

})

schemaComposer.rootQuery().addFields({
  allOrders: OrderTC.getResolver('findMany'),
  order: OrderTC.getResolver('findById'),
  _allOrdersMeta: OrderTC.getResolver('count'),
  orders: OrderTC.getResolver('findByIds'), 
  orderConnection: OrderTC.getResolver('connection'),
})
schemaComposer.rootMutation().addFields({
  createProduct: ProductTC.getResolver('createOne'),
  updateProduct: ProductTC.getResolver('updateById'),
  updateProducts: ProductTC.getResolver('updateMany'),
  deleteProduct: ProductTC.getResolver('removeById'),
  deleteProducts: ProductTC.getResolver('removeMany'),
})
const graphqlSchema = schemaComposer.buildSchema();
module.exports = graphqlSchema;