import React, { Component } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import gql from 'graphql-tag'
import { Grid, Row, Col, Alert } from 'react-bootstrap'

export class NotificationList extends Component {
    handleCheckbox = event => {
        const target = event.target
        console.log(event.target)
        this.setState({
            [target.name]: target.checked
        })
    }
    render() {
        return <div> 
                {this.props.notifications.map((notification, i) => (
                    <Alert key={i} bsStyle={notification.type}>
                        <button type="button" aria-hidden="true" className="close">&#x2715;</button>
                        <span>{notification.message}</span>
                    </Alert>
                ))}
        </div>
    }
}

NotificationList.fragment = gql`
  fragment allNotificationsFragment on Query {
    allNotifications {
        id
        message
        type
        createdAt
    }
  }
`

export default NotificationList

