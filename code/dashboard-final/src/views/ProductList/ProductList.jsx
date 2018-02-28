import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import React, { Component } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import { thArray } from 'variables/Variables.jsx';

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
                content={
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
                        this.props.allProductsQuery.allProducts && this.props.allProductsQuery.allProducts.map((prop, key) => {
                          return (
                            <tr key={key} onClick={this.viewProduct}>{
                              Object.keys(prop).map((key, index) => {
                                if (key == "__typename") return false
                                return (
                                  <td key={key}>{prop[key]}</td>
                                );
                              })                              
                            }
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                }
              />
            </Col>

          </Row>
        </Grid>
      </div>
    );
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

const ProductListWithQuery = graphql(ALL_PRODUCTS_QUERY, {
  name: 'allProductsQuery',
  options: {
    fetchPolicy: 'network-only'
  }
})(ProductList)

export default ProductListWithQuery