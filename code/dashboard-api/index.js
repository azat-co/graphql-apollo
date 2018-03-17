const mongoose = require('mongoose')

const express = require('express')
const graphqlHTTP = require('express-graphql')
const DashboardGraphQLSchema = require('./models/graphql-schema.js')
const app = express()

mongoose.connect('mongodb://localhost:27017/dashboard')

app.use('/graphql', graphqlHTTP({
  schema: DashboardGraphQLSchema,
  graphiql: true
}))

app.listen(3000)