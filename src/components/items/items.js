import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import './items.css';


export default class Items extends Component {
  state = {
    items: null,
    error: false
  }

  componentDidCatch() {
    this.setState({error: true});
  }

  componentDidMount() {
    const {getData} = this.props;
    getData()
      .then((items) => {
        this.setState({items})
      })
      .catch((error) => {
        this.setState({error: true})
      });
  }

  renderItems(items) {
    return items.map((item) => {
      const {id} = item;
      const label = this.props.renderItem(item);
      return (
        <li key={id} 
            className="list-group-item"
            onClick={() => this.props.onItemSelected(id)}>
          {label}
        </li>
      )
    })
  }

  render() {
    const {items, error} = this.state;
    if (error) {
      return <ErrorMessage />;
    }
    const content = items ? this.renderItems(items) : <Spinner />;
    return (
      <ul className="item-list list-group">
        {content}
      </ul>
    );
  }
}


Items.defaultProps = {
  onItemSelected: () => {}
}

Items.propTypes = {
  onItemSelected: PropTypes.func
}
