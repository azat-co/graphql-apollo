const mongoose = require('mongoose')

const express = require('express')
const graphqlHTTP = require('express-graphql')
const MyGraphQLSchema = require('./models/product.js')
const app = express()

mongoose.connect('mongodb://localhost:27017/dashboard')

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true
}))

app.listen(3000)