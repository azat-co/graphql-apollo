import React from 'react'
import {graphql, compose} from 'react-apollo'
import {withRouter} from 'react-router-dom'
import gql from 'graphql-tag'


class ProductDetail extends React.Component {

    render() {
        if (this.props.productQuery.loading) {
            return (
                <div className=''>
                    <div>
                        Loading ...
                    </div>
                </div>
            )
        }

        const {Product} = this.props.productQuery
        console.log(this.props)
        return (
            <div>
                <h2>{Product.name}</h2>
                <a className='btn btn-info'
                    href="#/products">
                    Back
                </a>

                <div className=''>
                    <img className='image'
                        width="150"
                        alt={Product.name}
                        src={Product.productImageUrl} />
                    <div className=''>
                        {Product.description}
                    </div>
                    In store: <div className=''>
                        {Product.inStoreCount}
                    </div>                    
                </div>
                <button
                    className='btn btn-danger'
                    onClick={this.handleDelete}>
                    Delete
                </button>                
            </div>
        )
    }

    handleDelete = async() => {
        console.log(this.props)
        await this
            .props
            .deleteProductMutation({
                variables: {
                    id: this.props.productQuery.Product.id
                },
                update: (proxy, {data: deleteProduct}) => {
                    // const data = proxy.readQuery({ query: ALL_PRODUCTS_QUERY })
                    // console.log(data, proxy, deleteProduct)
                    // var removeIndex = data.allProducts.map((item) => item.id ).indexOf(deleteProduct.id)
                    // ~removeIndex && data.allProducts.splice(removeIndex, 1)
                    // proxy.writeQuery({ query: ALL_PRODUCTS_QUERY, data })                   
                }
            })
        this
            .props
            .history
            .replace('/products')
    }
}

const DELETE_PRODUCT_MUTATION = gql `
  mutation DeleteProductMutation($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`

const PRODUCT_QUERY = gql `
  query ProductQuery($id: ID!) {
    Product(id: $id) {
      id
      productImageUrl
      name
      description
      inStoreCount
    }
  }
`

const ProductDetailWithGraphQL = compose(graphql(PRODUCT_QUERY, {
    name: 'productQuery',
    // see documentation on computing query variables from props in wrapper
    // http://dev.apollodata.com/react/queries.html#options-from-props
    options: ({match}) => ({
        variables: {
            id: match.params.id
        }
    })
}), graphql(DELETE_PRODUCT_MUTATION, { name: 'deleteProductMutation' }))(ProductDetail)

const ProductDetailWithDelete = graphql(DELETE_PRODUCT_MUTATION)(ProductDetailWithGraphQL)

export default withRouter(ProductDetailWithDelete)