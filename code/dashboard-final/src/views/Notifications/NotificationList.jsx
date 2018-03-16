import React, { Component } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import Checkbox from 'elements/CustomCheckbox/CustomCheckbox.jsx';
import Button from 'elements/CustomButton/CustomButton.jsx';
import gql from 'graphql-tag'

export class NotificationList extends Component {
    handleCheckbox = event => {
        const target = event.target
        console.log(event.target)
        this.setState({
            [target.name]: target.checked
        })
    }
    render() {
        const edit = (<Tooltip id="edit_tooltip">Edit Task</Tooltip>);
        const remove = (<Tooltip id="remove_tooltip">Remove</Tooltip>);
        const notificationTitles = this.props.notifications
        return <div className="table-full-width">
            <table className="table">
                {this.props.notifications.map((notification, i) => (
            <tr key={i}>
                <td class={notification.type} >{notification.message}</td>
                <td className="td-actions text-right">
                    <OverlayTrigger placement="top" overlay={edit}>
                        <Button
                            bsStyle="info"
                            simple
                            type="button"
                            bsSize="xs"
                        >
                            <i className="fa fa-edit"></i>
                        </Button>
                    </OverlayTrigger>

                    <OverlayTrigger placement="top" overlay={remove}>
                        <Button
                            bsStyle="danger"
                            simple
                            type="button"
                            bsSize="xs">
                            <i className="fa fa-times"></i>
                        </Button>
                    </OverlayTrigger>

                </td>
            </tr>
        ))}
            </table>
        </div>
       
    }
}

NotificationList.fragment = gql`
  fragment allNotifications on Query {
    allNotifications {
        id
        message
        type
        createdAt
    }

  }
`

export default NotificationList;

