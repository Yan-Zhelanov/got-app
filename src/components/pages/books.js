import React from 'react';
import { withRouter } from 'react-router-dom';

import GotService from '../../services/gotService';
import Items from '../items';
import ErrorMessage from '../errorMessage';


class BooksPage extends React.Component {
  gotService = new GotService();

  state = {
    error: false
  };

  componentDidCatch() {
    this.setState({
      error: true
    });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return <ErrorMessage />;
    }
    return (
      <Items getData={this.gotService.getAllBooks}
             onItemSelected={
              (itemId) => {
                this.props.history.push(itemId)
              }
             }
             renderItem={({name}) => `${name}`} />
    );
  }
}


export default withRouter(BooksPage);
