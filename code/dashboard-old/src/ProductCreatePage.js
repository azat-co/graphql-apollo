import React from 'react'
import {withRouter} from 'react-router-dom'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

class ProductCreatePage extends React.Component {

    state = {
        name: '',
        description: '',
        productImageUrl: '',
        inStoreCount: 0
    }

    render() {
        return (
            <div>                
                <div className=''>                    
                    <h2>Create Product</h2>
                    <div style={{maxWidth: 400}} className=''>                        
                        <input
                            className=''
                            value={this.state.name}
                            placeholder='Name'
                            onChange={e => this.setState({ name: e.target.value })}
                            autoFocus />
                        <br/>
                        <input
                            className=''
                            value={this.state.productImageUrl}
                            placeholder='Image Url'
                            onChange={e => this.setState({productImageUrl: e.target.value})}
                            />
                        <br />    
                        <input
                            className=''
                            value={this.state.description}
                            placeholder='Description'
                            onChange={e => this.setState({description: e.target.value})}/> 
                        <br />                                
                        <input
                            className=''
                            value={this.state.inStoreCount}
                            placeholder='In Store'
                            onChange={e => this.setState({ inStoreCount: parseInt(e.target.value, 10) })}
                        />
                        <br />    
                        {this.state.productImageUrl && <img src={this.state.productImageUrl} alt='' className='' />}                            
                        <button onClick = {this.props.history.goBack}>Cancel</button>
                        {this.state.name && this.state.description && this.state.productImageUrl && <button
                            className='' onClick={this.handleProduct}>
                                Create Product
                        </button>}
                    </div>
                </div>
            </div>
        )
    }

    handleProduct = async() => {
        const { description, name, productImageUrl, inStoreCount} = this.state
        await this
            .props
            .createProductMutation({
                variables: {
                    description,
                    name,
                    productImageUrl,
                    inStoreCount
                }
            })
        this
            .props
            .history
            .replace('/')
    }

}

const CREATE_PRODUCT_MUTATION = gql `
  mutation CreateProductMutation($name: String!, $description: String!, $productImageUrl: String!, $inStoreCount: Int!) {
    createProduct(name: $name, description: $description, productImageUrl: $productImageUrl, inStoreCount: $inStoreCount) {
      id
      description
      name
      productImageUrl,
      inStoreCount
    }
  }
`

const ProductCreatePageWithMutation = graphql(CREATE_PRODUCT_MUTATION, {name: 'createProductMutation'})(ProductCreatePage)
export default withRouter(ProductCreatePageWithMutation)