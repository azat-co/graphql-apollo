import React from 'react'
import { Link } from 'react-router-dom'
import Product from './Product'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class ProductListPage extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (this.props.location.key !== nextProps.location.key) {
      this.props.allProductsQuery.refetch()
    }
  }

  render () {
    if (this.props.allProductsQuery.loading) {
      return (
        <div>
          <div>
            Loading...
          </div>
        </div>
      )
    }

    return (
      <div className=''>
        <div className=''>
          <Link
            to='/create-product'
            className=''>
            <button>New Product</button>
          </Link>
          <h1>Product Catalog</h1>
          {this.props.allProductsQuery.allProducts && this.props.allProductsQuery.allProducts.map(product => (
            <Product
              key={product.id}
              product={product}
              refresh={() => this.props.allProductsQuery.refetch()}
            />
          ))}
        </div>
        {this.props.children}
      </div>
    )
  }
}

const ALL_PRODUCTS_QUERY = gql`
  query AllProductsQuery {
    allProducts(orderBy: name_DESC) {
      id
      name
      description
      productImageUrl      
    }
  }
`

const ProductListPageWithQuery = graphql(ALL_PRODUCTS_QUERY, {
  name: 'allProductsQuery',
  options: {
    fetchPolicy: 'network-only'
  }
})(ProductListPage)

export default ProductListPageWithQuery
