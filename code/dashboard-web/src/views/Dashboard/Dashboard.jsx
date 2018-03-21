import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'

import { Card } from 'components/Card/Card.jsx';
import { StatsCard } from 'components/StatsCard/StatsCard.jsx';
import { NotificationList } from 'views/Notifications/NotificationList.jsx';


import {
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from 'variables/Variables.jsx';

class Dashboard extends Component {
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(
        <i className={type} key={i}></i>
      );
      legend.push(" ");
      legend.push(
        json["names"][i]
      );
    }
    return legend;
  }
  render() {
    if (this.props.DashboardQuery.loading) {
      return (
        <div className=''>
          <div>
            Loading ...
          </div>
        </div>
      )
    }
    console.log(this.props)
    // Data for Pie Chart
    let sum = 0
    const productsPie = this.props.DashboardQuery.allProducts.map(p => p.productQuantityPerOrders.reduce( // ['40%', '20%', '40%'], 
        (previousValue, currentValue)=>{       
          sum += currentValue.quantity
          return (previousValue+currentValue.quantity)
        }, 0
      )).map((p, i)=>({ name: this.props.DashboardQuery.allProducts[i].name, quantity: p}))
        .filter(p => p.quantity > 0)
    const dataPie = {
      labels: productsPie.map(p=>p.quantity),
      series: productsPie.map(p => p.quantity/sum)
    }

    console.log(dataPie)
    var legendPie = {
      names: productsPie.map(p=>p.name),
      types: ["info", "danger"]
    };
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-gift text-warning"></i>}
                statsText="Orders"
                statsValue={this.props.DashboardQuery.allOrdersCount}
                statsIcon={<i className="fa fa-refresh"></i>}
                statsIconText="Since beginning of the year"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success"></i>}
                statsText="Revenue"
                statsValue="$1,345"
                statsIcon={<i className="fa fa-calendar-o"></i>}
                statsIconText="Last day"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-danger"></i>}
                statsText="Errors"
                statsValue="23"
                statsIcon={<i className="fa fa-clock-o"></i>}
                statsIconText="In the last hour"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa pe-7s-box2 text-info"></i>}
                statsText="Products"
                statsValue={this.props.DashboardQuery.allProductsCount}
                statsIcon={<i className="fa fa-refresh"></i>}
                statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Users Behavior"
                category="24 Hours performance"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">
                    {this.createLegend(legendSales)}
                  </div>
                }
              />
            </Col>
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Product Sales Statistics"
                category="YTD Performance"
                stats="Campaign sent 2 days ago"
                content={
                  <div id="chartPreferences" className="ct-chart ct-perfect-fourth">
                    <ChartistGraph data={dataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">
                    {this.createLegend(legendPie)}
                  </div>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card
                id="chartActivity"
                title="2014 Sales"
                category="All products including Taxes"
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">
                    {this.createLegend(legendBar)}
                  </div>
                }
              />
            </Col>

            <Col md={6}>
              <Card
                title="Tasks"
                category="Backend development"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={                  
                      <NotificationList notifications={this.props.DashboardQuery.allNotifications}/>                  
                }
              />
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
}

Dashboard.fragments = {
  allNotifications: NotificationList.fragment
}

// year-mm-day
const DASHBOARD_QUERY = gql`
query DashboardQuery {
    allProductsCount
    allOrdersCount
  	allOrders( filter: {
      orderCreatedAt_gte: "2018-01-01" 
    }) {
      amount
      customerEmail
      productQuantityPerOrders {        
        product {
          id
        }
        quantity
      }
    }
    allProducts {
      name
      productQuantityPerOrders {
        id
        quantity
      }
      allProductQuantityPerOrdersCount
    }  
    ...allNotifications
    
    
  }
  ${Dashboard.fragments.allNotifications}
`

const DashboardWithQuery = graphql(DASHBOARD_QUERY, {
  name: 'DashboardQuery',
  options(props) {
    return {
      variables: {
      },
      fetchPolicy: 'network-only'
    }
  }
})(Dashboard)

export default DashboardWithQuery;
