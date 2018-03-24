import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import React, { Component } from 'react'
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import NotificationSystem from 'react-notification-system'

import Header from 'components/header/header'
import Footer from 'components/footer/footer'
import Sidebar from 'components/sidebar/sidebar'

import ProductDetail from 'views/products/product-detail.jsx'
import { style } from 'variables/Variables.jsx'
import { Grid, Row, Col } from 'react-bootstrap'

import appRoutes from 'routes/app.jsx'

// TODO: Implement Apollo setup

class App extends Component {

  constructor (props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.state = {
    }
  }

  componentDidMount () {
  }

  componentDidUpdate (e) {
    if (window.innerWidth < 993 && e.history.location.pathname !== e.location.pathname && document.documentElement.className.indexOf('nav-open') !== -1) {
      document.documentElement.classList.toggle('nav-open')
    }
  }

  render () {
    return (
      // TODO: Implement Apollo provider
        <div className='wrapper'>

          <NotificationSystem ref='notificationSystem' style={style} />
          <Sidebar {...this.props} />
          <div id='main-panel' className='main-panel'>
            <Header {...this.props} />
            <div className='content'>
              <Grid fluid>
                <Row>
                  <Col md={12}>
                    <Switch>
                      <Route path='/products/:id' component={ProductDetail} />
                      {
                        appRoutes.map((prop, key) => {
                          if (prop.name === 'Notifications') {
                            return (
                              <Route
                                path={prop.path}
                                key={key}
                                render={routeProps =>
                                  <prop.component
                                    {...routeProps}
                                    handleClick={this.handleNotificationClick}
                                  />}
                              />
                            )
                          }
                          if (prop.redirect) {
                            return (
                              <Redirect from={prop.path} to={prop.to} key={key} />
                            )
                          }
                          return (
                            <Route path={prop.path} component={prop.component} key={key} />
                          )
                        })
                      }
                    </Switch>
                  </Col>
                </Row>
              </Grid>
            </div>
            <Footer />
          </div>
        </div>
    )
  }
}

export default App
