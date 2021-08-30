import React from 'react';

import GotService from '../../services/gotService';
import ItemDetails, { Field } from '../itemDetails';


export default class BooksItem extends React.Component {
  gotService = new GotService();

  render() {
    return (
      <ItemDetails itemId={this.props.bookId} getData={this.gotService.getBook}>
        <Field field="name" label="Name" />
        <Field field="numberOfPages" label="Number of Pages" />
        <Field field="publisher" label="Publisher" />
        <Field field="releaser" label="Releaser" />
      </ItemDetails>
    );
  }
}
