import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import React, { Component } from 'react';
import {Table } from 'react-bootstrap';

import Card from 'components/Card/Card.jsx'

const LIMIT = 3
const thArray = ['ID', 'Status', 'Action', 'Customer Email', 'Customer Payment', 'Amount', 'Quantity', 'Products']

class OrderList extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <Card
        title="Recent Orders"
        category="List of Orders"
        ctTableFullWidth ctTableResponsive
        content={(this.props.allOrdersQuery.loading) ? 'Loading...' :
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
                      <td>{(prop.isCompleted) ? '✅' : '⏳' }</td>
                      <td><button className={`btn btn-${(prop.isCompleted)? 'danger' : 'primary'}`} onClick={()=>{
                        (prop.isCompleted) ? this.props.unFullfillOrderMutation({ variables: { id: prop.id } }) : this.props.fullfillOrderMutation({variables: {id: prop.id}})
                      }}>{(prop.isCompleted)?'UN':''}FULLFILL</button></td>
                      <td>{prop.customerEmail}</td>
                      <td>{prop.customerPayment.substr(0, 9)}*****</td>
                      <td>{prop.amount}</td>
                      <td>{prop.allProductQuantityPerOrdersCount}</td>
                      <td>{prop.productQuantityPerOrders.map((productQuantityPerOrder, index) =>
                        <div key={index}>{productQuantityPerOrder.product.name} x {productQuantityPerOrder.quantity}</div>
                      )}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        }
      />

    );
  }
}


const FULLFILL_ORDER_MUTATION = gql`
  mutation FullfillOrderMutation($id: ID!) {
    updateOrder(id: $id, isCompleted: true) {
      id
      isCompleted
    }
  }
`

const UNFULLFILL_ORDER_MUTATION = gql`
  mutation UnFullfillOrderMutation($id: ID!) {
    updateOrder(id: $id, isCompleted: false) {
      id
      isCompleted
    }
  }
`

const ALL_ORDERS_QUERY = gql`
query {
  allOrders(orderBy: orderCreatedAt_DESC) {
    id
    customerEmail
    customerPayment
    amount
    isCompleted
    allProductQuantityPerOrdersCount
		productQuantityPerOrders {          
      id       
      quantity
      product {
        name
        allProductQuantityPerOrdersCount
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

const OrderListWithMutations =
  graphql(FULLFILL_ORDER_MUTATION, { name: 'fullfillOrderMutation' })(
    graphql(UNFULLFILL_ORDER_MUTATION, { name: 'unFullfillOrderMutation' })(OrderListWithQuery)
  )

export default OrderListWithMutations