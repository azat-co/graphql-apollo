import React from 'react'
import {graphql, compose} from 'react-apollo'
import {withRouter} from 'react-router-dom'
import gql from 'graphql-tag'


class DetailPage extends React.Component {

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

        return (
            <div>
                <h2>{Product.name}</h2>
                <button
                    className=''
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
                </div>
                <button
                    className=''
                    onClick={this.handleDelete}>
                    Delete
                </button>                
            </div>
        )
    }

    handleDelete = async() => {
        await this
            .props
            .deleteProductMutation({
                variables: {
                    id: this.props.productQuery.Product.id
                }
            })
        this
            .props
            .history
            .replace('/')
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

const DetailPageWithGraphQL = compose(graphql(PRODUCT_QUERY, {
    name: 'productQuery',
    // see documentation on computing query variables from props in wrapper
    // http://dev.apollodata.com/react/queries.html#options-from-props
    options: ({match}) => ({
        variables: {
            id: match.params.id
        }
    })
}), graphql(DELETE_PRODUCT_MUTATION, {name: 'deleteProducttMutation'}))(DetailPage)

const DetailPageWithDelete = graphql(DELETE_PRODUCT_MUTATION)(DetailPageWithGraphQL)

export default withRouter(DetailPageWithDelete)