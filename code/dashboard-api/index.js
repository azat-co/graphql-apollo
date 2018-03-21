const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const app = express()
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/dashboard')

// const DashboardGraphQLSchema = require('./dashboardschema.js')
const DashboardGraphQLSchema = require('./models/graphql-schema.js')
app.use(cors(corsOptions))
app.use('/graphql', graphqlHTTP({
  schema: DashboardGraphQLSchema,
  graphiql: true
}))

app.listen(3001)