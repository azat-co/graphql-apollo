const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat
} = require ('graphql/type')
const GraphQLDate = require('graphql-date')
const graphql = require('graphql')

const mongoose = require('mongoose')

const ProductMongooseSchema = require('./models/product.js')
const ProductModel = mongoose.model('Product', ProductMongooseSchema)
const OrderMongooseSchema = require('./models/order.js')
const OrderModel = mongoose.model('Order', OrderMongooseSchema)

const getProjection = (fieldASTs) => {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = true
    return projections
  }, {})
}

const CountType = new GraphQLObjectType({
  name: 'count',
  description: 'Count Type',
  fields: () => ({
    count: {
      type: GraphQLInt,
      description: 'Count'
    }
  })
})

const ProductType = new GraphQLObjectType({
  name: 'product',
  description: 'Product Type',
  fields: () => ({
    _id: {
      type: GraphQLInt,
      description: 'The id of the product.',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the product.',
    },
    description: {
      type: GraphQLString,
      description: 'The description of the product.',
    },
    inStoreCount: {
      type: GraphQLInt,
      description: 'The number of products in the store.',
    },
    productImageUrl: {
      type: GraphQLString,
      description: 'Product image URL.'
    }
  })
})


const OrderType = new GraphQLObjectType({
  name: 'order',
  description: 'Order Type',
  fields: () => ({
    _id: {
      type: GraphQLInt,
      description: 'The id of the order.',
    },
    amount: {
      type: GraphQLFloat,
      description: 'The amount of the order.',
    },
    customerEmail: {
      type: GraphQLString,
      description: 'The email of the customer for the order.',
    },
    customerPayment: {
      type: GraphQLString,
      description: 'The email of the customer for the order.',
    },    
    isCompleted: {
      type: GraphQLBoolean,
      description: 'The completed or not status the order.',
    },    
    orderCreatedAt: {
      type: GraphQLDate,
      description: 'The date of orders.',
    },
    products: new GraphQLObjectType({
      name: 'products',
      productQuantity: {
        type: GraphQLInt        
      },
      product: {
        type: GraphQLList(ProductType),
        description: 'List of products for the order.',
        resolve: (root, args, source, fieldASTs) => {
          return new Promise((resolve, reject) => {
            console.log('p0', root)
            let c = 0
            root.products.forEach((p, i)=>{
              console.log(p.product.toObject()._id)
              ProductModel.findById(p.product.toObject()._id, getProjection(fieldASTs), (error, product) => {
                product = product.toObject()
                if (error) reject(error)
                root.products[i].product = product
                c++
                console.log('r', root)
                if (c == root.products.length) resolve(root.products)
              })
            })      
          })
        }
      }      
    })
  })
})


const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      product: {
        type: new GraphQLList(ProductType),
        args: {
          _id: {
            name: '_id',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root, {_id}, source, fieldASTs) => {
          const projections = getProjection(fieldASTs)
          const foundItems = new Promise((resolve, reject) => {
            ProductModel.findOne({_id:_id}, projections, (err, product) => {
                  err ? reject(err) : resolve(product)
              })
          })
          return foundItems
        }
      },
      allProducts: {
        type: new GraphQLList(ProductType),
        args: {
          first: {
            name: 'first',
            type: GraphQLInt
          }
        },
        resolve: (root, args, source, fieldASTs) => {
          const projections = getProjection(fieldASTs)
          const foundItems = new Promise((resolve, reject) => {
            ProductModel.find({}, projections, { limit: args.first || 100 }, (err, products) => {
              // console.log(products, projections)
              err ? reject(err) : resolve(products)
            })
          })
          return foundItems
        }
      }, 
      _allProductsMeta: {
        type: CountType,
        resolve: (root, args, source, fieldASTs) => {
          return new Promise((resolve, reject) => {
            return ProductModel.count({}, (error, count) => {
              // console.log(count)
              error ? reject(error) : resolve({ count })
            })
          })
        }
      },      
      allOrders: {
        type: new GraphQLList(OrderType),
        args: {
          first: {
            name: 'first',
            type: GraphQLInt
          }
        },
        resolve: (root, args, source, fieldASTs) => {
          const projections = getProjection(fieldASTs)
          const foundItems = new Promise((resolve, reject) => {
            OrderModel.find({}, projections, { limit: args.first || 100 }, (err, orders) => {
              // console.log(orders, projections)             
              err ? reject(err) : resolve(orders)
            })
          })
          return foundItems
        }
      },            
      _allOrdersMeta: {
        type: CountType,
        resolve: (root, args, source, fieldASTs) => {
          return new Promise((resolve, reject) => {
            return ProductModel.count({}, (error, count) => {
              // console.log(count)
              error ? reject(error) : resolve({count})
            })
          })
        }
      }
    }
  })
  
})

module.exports = schema