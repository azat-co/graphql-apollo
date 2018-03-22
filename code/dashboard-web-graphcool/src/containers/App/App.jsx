import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import NotificationSystem from 'react-notification-system';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';

import ProductDetail from 'views/ProductList/ProductDetail';
import { style } from "variables/Variables.jsx";
import { Grid, Row, Col, Table } from 'react-bootstrap';

import appRoutes from 'routes/app.jsx';
const __SIMPLE_API_ENDPOINT__ = 'https://api.graph.cool/simple/v1/cje64cfdy0knn0161uokrbo7p'
// const __SIMPLE_API_ENDPOINT__ = 'http://localhost:3001/graphql'

const httpLink = new HttpLink({ uri: __SIMPLE_API_ENDPOINT__ })
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

class App extends Component {
  constructor(props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.state = {

    }
  }

  componentDidMount() {
  }
  componentDidUpdate(e) {
    if (window.innerWidth < 993 && e.history.location.pathname !== e.location.pathname && document.documentElement.className.indexOf('nav-open') !== -1) {
      document.documentElement.classList.toggle('nav-open');
    }
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="wrapper">

          <NotificationSystem ref="notificationSystem" style={style} />
          <Sidebar {...this.props} />
          <div id="main-panel" className="main-panel">
            <Header {...this.props} />
            <div className="content">
              <Grid fluid>
                <Row>
                  <Col md={12}>
                    <Switch>
                      <Route path="/products/:id" component={ProductDetail} />
                      {
                        appRoutes.map((prop, key) => {
                          if (prop.name === "Notifications")
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
                            );
                          if (prop.redirect)
                            return (
                              <Redirect from={prop.path} to={prop.to} key={key} />
                            );
                          return (
                            <Route path={prop.path} component={prop.component} key={key} />
                          );
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
      </ApolloProvider>
    );
  }
}

export default App;



