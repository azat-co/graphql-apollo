import React, { Component } from 'react';
import { Table, Grid, Row, Col } from 'react-bootstrap';

import Card from 'components/Card/Card';

import Button from 'elements/CustomButton/CustomButton';

class Help extends Component {
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={8} mdOffset={2}>
                            <div>
                                Need help form the author, Azat Mardan?<br/> 
                                Ask for help at <a href="https://clarity.fm/azat" target="_blank">https://clarity.fm/azat</a>.
                                <br/>
                                <br/>
                                Built with <a href="https://www.creative-tim.com/">Creative Tim.</a>
                            </div>                            
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Help;
