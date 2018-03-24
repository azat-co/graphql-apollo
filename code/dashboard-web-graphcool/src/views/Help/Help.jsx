import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import Button from 'elements/CustomButton/CustomButton'

class Help extends Component {
  render () {
    return (
      <div className='content'>
        <Grid fluid>
          <Row>
            <Col md={8} mdOffset={2}>
              <div>
                                Need help form the author, Azat Mardan?<br />
                <br />
                <Button className='btn btn-primary btn-lg' >Ask for help at <a href='https://clarity.fm/azat' target='_blank' rel='noopener noreferrer'>https://clarity.fm/azat</a></Button>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                                Theme from <a href='https://www.creative-tim.com'>Creative Tim.</a>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default Help
