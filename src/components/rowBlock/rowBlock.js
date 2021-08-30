import React from 'react';
import { Row, Col } from 'reactstrap';

import './rowBlock.scss';


export default class RowBlock extends React.Component {
  render() {
    const {items, details} = this.props;
    return (
      <Row className="row-block">
        <Col md='6'>
          {items}
        </Col>
        <Col md='6'>
          {details}
        </Col>
      </Row>
    );
  }
}
