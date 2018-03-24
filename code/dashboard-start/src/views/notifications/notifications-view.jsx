import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import Button from 'elements/CustomButton/CustomButton.jsx'
import {NotificationList} from 'views/notifications/notifications-list.jsx'

class Notifications extends Component {
  render () {
    if (this.props.NotificationsQuery.loading) {
      return (
        <div className=''>
          <div>
            Loading ...
          </div>
        </div>
      )
    }
    return (
      <div className='content'>
        <Grid fluid>
          <div className='card'>
            <div className='header'>
              <h4 className='title'>Notifications</h4>
              <p className='category'>Handcrafted by <a target='_blank' rel='noopener noreferrer' href='https://github.com/igorprado'>Igor Prado</a>. Please checkout the <a href='http://igorprado.com/react-notification-system/' rel='noopener noreferrer' target='_blank'>full documentation.</a></p>
            </div>
            <div className='content'>
              <Row>
                <Col md={12}>
                  <h5>Notifications</h5>
                  <NotificationList notifications={this.props.NotificationsQuery.allNotifications} />
                </Col>
              </Row>
              <br />
              <div className='places-buttons'>
                <Row>
                  <Col md={12}>
                    <Button bsStyle='default' block onClick={() => this.props.handleClick('tc')}>Load More</Button>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Grid>
      </div>
    )
  }
}

// TODO: Implement Apollo GraphQL query

const NotificationsWithMockData = (Component) => {
  const mockData = {"data":{"allNotifications":[{"__typename":"Notification","id":"cjea9dfqg5l7f0189g7x9olqo","createdAt":"2018-03-02T18:14:35.000Z","message":"User logged in","type":"info"}],"__typename":"Query"}}
  const mockDataProps = {
    NotificationsQuery: mockData.data,
  }
  mockDataProps.NotificationsQuery.loading = false
  return (props) => <Component {...mockDataProps} {...props}/>
}
export default NotificationsWithMockData(Notifications)
