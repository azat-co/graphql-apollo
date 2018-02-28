import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import React, { Component } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';
import { thArray } from 'variables/Variables.jsx';

const LIMIT = 3

class OrderList extends Component {
  componentDidMount() {

  }
  render() {
 
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Recent Orders"
                category="List of Orders"
                ctTableFullWidth ctTableResponsive
                content={(this.props.allOrdersQuery.loading)?'Loading...':
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
                        this.props.allOrdersQuery.allOrders && this.props.allOrdersQuery.allOrders.map((prop, key) => {
                          return (
                            <tr key={key} onClick={this.viewOrder}>
                              <td>{prop['id']}</td>  
                              <td>{prop._productQuantityPerOrdersMeta.customerEmail}</td>  
                              <td>{prop._productQuantityPerOrdersMeta.customerPayment}</td>  
                              <td>{prop._productQuantityPerOrdersMeta.count}</td>  
                              <td>{prop.productQuantityPerOrders.map((productQuantityPerOrder, index) => 
                                <div>{productQuantityPerOrder.product.name} x {productQuantityPerOrder.quantity}</div>
                              )}</td>                            
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



const ALL_ORDERS_QUERY = gql`
query {
  allOrders(orderBy: orderCreateAt_DESC) {
    id
    customerEmail
    customerPayment
    _productQuantityPerOrdersMeta {count}    
		productQuantityPerOrders {          
      id       
      quantity
      product {
        name
        _productQuantityPerOrdersMeta {count}
      }
    }
  }
}
`

const OrderListWithQuery = graphql(ALL_ORDERS_QUERY, {
  name: 'allOrdersQuery',
  options: {
    fetchPolicy: 'network-only'
  }
})(OrderList)

export default OrderListWithQuery