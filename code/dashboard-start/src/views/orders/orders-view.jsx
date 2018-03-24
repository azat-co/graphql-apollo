import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import React, { Component } from 'react'
import {Table } from 'react-bootstrap'
import Card from 'components/Card/Card.jsx'

const thArray = ['ID', 'Status', 'Action', 'Customer Email', 'Customer Payment', 'Amount', 'Quantity', 'Products']

class OrderList extends Component {
  componentDidMount () {

  }
  render () {
    return (
      <Card
        title='Recent Orders'
        category='List of Orders'
        ctTableFullWidth ctTableResponsive
        content={(this.props.allOrdersQuery.loading) ? 'Loading...'
          : <Table striped hover>
            <thead>
              <tr>
                {
                  thArray.map((prop, key) => {
                    return (
                      <th key={key}>{prop}</th>
                    )
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
                      <td><button className={`btn btn-${(prop.isCompleted) ? 'danger' : 'primary'}`} onClick={() => {
                        (prop.isCompleted) ? this.props.unFullfillOrderMutation({ variables: { id: prop.id } }) : this.props.fullfillOrderMutation({variables: {id: prop.id}})
                      }}>{(prop.isCompleted) ? 'UN' : ''}FULLFILL</button></td>
                      <td>{prop.customerEmail}</td>
                      <td>{prop.customerPayment.substr(0, 9)}*****</td>
                      <td>{prop.amount}</td>
                      <td>{prop._productQuantityPerOrdersMeta.count}</td>
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

    )
  }
}

// TODO: Implement Apollo GraphQL query

const OrderListWithMockData = (Component) => {
  const mockData = {"data":{"allOrders":[{"isCompleted":false,"productQuantityPerOrders":[{"id":"cje6ms9k64rnx0189ode05ow6","quantity":1,"product":{"name":"Pro Express.js","_productQuantityPerOrdersMeta":{"count":1,"__typename":"_QueryMeta"},"__typename":"Product"},"__typename":"ProductQuantityPerOrder"},{"id":"cje6msyim4rok01892irqwdir","quantity":2,"product":{"name":"Practical Node.js","_productQuantityPerOrdersMeta":{"count":1,"__typename":"_QueryMeta"},"__typename":"Product"},"__typename":"ProductQuantityPerOrder"}],"__typename":"Order","amount":49.99,"customerPayment":"0x20a788ff3daf7d3d288630ce7a5bf1eac3461091e151c6591c00b496e8912449","id":"cje64l4as4ms70189e2r94a6m","customerEmail":"hi@node.university","_productQuantityPerOrdersMeta":{"count":2,"__typename":"_QueryMeta"}}]}}
  const props = {
    allOrdersQuery: mockData.data,
  }
  props.allOrdersQuery.loading = false
  return () => <Component {...props} />
}
export default OrderListWithMockData(OrderList)