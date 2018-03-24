import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { NavItem, Nav } from 'react-bootstrap'
import React, { Component } from 'react'
import { Grid, Row, Col, Table } from 'react-bootstrap'

import Card from 'components/Card/Card.jsx'
const qs = require('query-string')

const LIMIT = 3
const thArray = ['ID', 'Image', 'Name', 'Description']

class ProductList extends Component {
  
  componentDidMount () {
  }

  render () {
    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title='Product Catalog'
                category='List of Products'
                ctTableFullWidth ctTableResponsive
                content={(this.props.allProductsQuery.loading) ? 'Loading...'
                : <Table striped hover>
                  <thead>
                    <tr>
                      {thArray.map((prop, key) => {
                              return (
                                <th key={key}>{prop}</th>
                              )
                            })
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.allProductsQuery.allProducts &&
                          this.props.allProductsQuery.allProducts.map((product, key) => {
                            return (
                              <tr key={key}>
                                <td><a href={`#/products/${product.id}`}>{product.id}</a></td>
                                <td><img alt={product.name} width='100' src={product.productImageUrl} /></td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                              </tr>
                            )
                          })
                    }
                  </tbody>
                </Table>
                }
              />
              {(() => {
                if (this.props.allProductsQuery.loading) return false
                const query = qs.parse(this.props.location.search)
                let count = this.props.allProductsQuery._allProductsMeta.count
                const limit = parseInt(query.limit, 10) || LIMIT
                const offset = parseInt(query.offset, 10) || 0
                const pages = Math.ceil(count / limit)
                const Previous = (offset > 0) ? <NavItem className='page-item page-link' href={`#/products?limit=${limit}&offset=${offset - limit}`}>Previous</NavItem> : false
                const Next = (count > offset + limit) ? <NavItem className='page-item page-link' href={`#/products?limit=${limit}&offset=${offset + limit}`}>Next</NavItem> : false
                return <div>
                  <Nav className='pagination'>
                    {Previous}
                    {Next}
                  </Nav>
                  <div>This is page: {1 + pages - Math.ceil((count - offset) / limit)}</div>
                  <div>Items per page: {limit}</div>
                  <div>Total pages: {pages}</div>
                </div>
              })()
              }
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

// TODO: Implement Apollo GraphQL query

const ProductListWithMockData = (Component) => {
  const mockData = {"data":{"allProducts":[{"name":"React Quickly","productImageUrl":"https://images-na.ssl-images-amazon.com/images/I/5159foIB0EL._SX396_BO1,204,203,200_.jpg","description":"Painless web apps with React, JSX, Redux, and GraphQL","__typename":"Product","id":"cje7uz5ur52ec01893q9ohakm"},{"name":"Pro Express.js","productImageUrl":"https://images-na.ssl-images-amazon.com/images/I/51ZM3FAioPL._SX404_BO1,204,203,200_.jpg","description":"Master Express.js: The Node.js Framework For Your Web Development","__typename":"Product","id":"cje64j94f4mrm0189ka7o2p33"},{"name":"Practical Node.js","productImageUrl":"https://images-na.ssl-images-amazon.com/images/I/512022zZ3OL._SX403_BO1,204,203,200_.jpg","description":"Building Real-World Scalable Web Apps","__typename":"Product","id":"cje64k58b4mrz0189kg2yjjic"}],"_allProductsMeta":{"count":4,"__typename":"_QueryMeta"}}}
  const mockDataProps = {
    allProductsQuery: mockData.data,
  }
  mockDataProps.allProductsQuery.loading = false
  return (props) => <Component {...mockDataProps} {...props}/>
}
export default ProductListWithMockData(ProductList)

