import React from 'react'
import {graphql, compose} from 'react-apollo'
import {withRouter} from 'react-router-dom'
import gql from 'graphql-tag'


class ProductDetailPage extends React.Component {

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
                <button
                    className='btn'
                    onClick={this.props.history.goBack}>
                    Back
                </button>

                <div className=''>
                    <img
                        className='image'
                        width="150"
                        src={Product.productImageUrl}                        
                    />
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
                    const data = proxy.readQuery({ query: ALL_PRODUCTS_QUERY })
                    console.log(data, proxy, deleteProduct)
                    var removeIndex = data.allProducts.map((item) => item.id ).indexOf(deleteProduct.id)
                    ~removeIndex && data.allProducts.splice(removeIndex, 1)
                    proxy.writeQuery({ query: ALL_PRODUCTS_QUERY, data })                   
                }
            })
        this
            .props
            .history
            .replace('/')
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

const ProductDetailPageWithGraphQL = compose(graphql(PRODUCT_QUERY, {
    name: 'productQuery',
    // see documentation on computing query variables from props in wrapper
    // http://dev.apollodata.com/react/queries.html#options-from-props
    options: ({match}) => ({
        variables: {
            id: match.params.id
        }
    })
}), graphql(DELETE_PRODUCT_MUTATION, { name: 'deleteProductMutation' }))(ProductDetailPage)

const ProductDetailPageWithDelete = graphql(DELETE_PRODUCT_MUTATION)(ProductDetailPageWithGraphQL)

export default withRouter(ProductDetailPageWithDelete)