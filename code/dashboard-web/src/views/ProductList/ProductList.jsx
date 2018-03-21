import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap'
import React, { Component } from 'react'
import { Grid, Row, Col, Table } from 'react-bootstrap'

import Card from 'components/Card/Card.jsx'
const qs = require('query-string');

const LIMIT = 3
const thArray = ['ID', 'Image', 'Name', 'Description']

class ProductList extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Product Catalog"
                category="List of Products"
                ctTableFullWidth ctTableResponsive
                content={(this.props.allProductsQuery.loading)?'Loading...':
                    <Table striped hover>
                      <thead>
                        <tr>
                          {
                            thArray.map((prop, key) => {
                              return (
                                <th key={key}>{prop}</th>
                              );
                            })
                          }
                        </tr>
                      </thead>
                      <tbody>
                        {
                          this.props.allProductsQuery.allProducts 
                          && this.props.allProductsQuery.allProducts.map((product, key) => {
                            return (
                              <tr key={key}>
                                <td><a href={`#/products/${product.id}`}>{product.id}</a></td>
                                <td><img width="100" src={product.productImageUrl}/></td>
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
              <div>Items per page: {LIMIT}</div>
              {
                
                (() => {
                  if (this.props.allProductsQuery.loading) return false
                  const query = qs.parse(this.props.location.search)
                  let count = this.props.allProductsQuery.allProductsCount
                  const limit = parseInt(query.limit, 10) || LIMIT
                  const offset = parseInt(query.offset, 10) || 0
                  const pages = Math.ceil(count / limit)
                  const Previous = (offset > 0) ? <li className="page-item"><a className="page-link" href={`#/products?limit=${limit}&offset=${offset-limit}`}>Previous</a></li> : false
                  const Next = (count > offset + limit) ? <li className="page-item"><a className="page-link" href={`#/products?limit=${limit}&offset=${offset + limit}`}>Next</a></li> : false
                  return <Nav>
                    <ul className="pagination">
                      {Previous}
                      {/* <li className="page-item"><a className="page-link" href="#">1</a></li>
                      <li className="page-item"><a className="page-link" href="#">2</a></li>
                      <li className="page-item"><a className="page-link" href="#">3</a></li> */}
                      {Next}                      
                    </ul>
                  </Nav>
                })()
              }
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}



const ALL_PRODUCTS_QUERY = gql`
  query AllProductsQuery($limit: Int, $offset: Int) {
    allProducts(orderBy: name_DESC, first: $limit, skip: $offset) {
      id
      name
      description
      productImageUrl      
    }
    allProductsCount
  }
`

const ProductListWithQuery = graphql(ALL_PRODUCTS_QUERY, {
  name: 'allProductsQuery',
  options(props) {
    const query = qs.parse(props.location.search)
    return {
      variables: {
        offset: parseInt(query.offset, 10) || 0,
        limit: parseInt(query.limit, 10) || LIMIT
      },
      fetchPolicy: 'network-only'
    }
  }
})(ProductList)

export default ProductListWithQuery