import React, { Component } from 'react'
import './App.css'
import ProductListPage from './ProductListPage'
import ProductCreatePage from './ProductCreatePage'
import ProductDetailPage from './ProductDetailPage'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const __SIMPLE_API_ENDPOINT__ = 'https://api.graph.cool/simple/v1/cje64cfdy0knn0161uokrbo7p'

const httpLink = new HttpLink({ uri: __SIMPLE_API_ENDPOINT__ })
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="app">
            <Route exact path='/' component={ProductListPage} />
            <Route path='/create-product' component={ProductCreatePage} />
            <Route path='/products/:id' component={ProductDetailPage} />
          </div>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App
