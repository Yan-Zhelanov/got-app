import React, {Component} from 'react';

import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import './itemDetails.css';


const Field = ({item, field, label}) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
}

export { Field };


export default class ItemDetails extends Component {
  gotService = new GotService();

  state = {
    item: null,
    loading: true,
    error: false
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidCatch() {
    this.setState({
      loading: false,
      error: true
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.setState({loading: true});
      this.updateItem();
    }
  }

  updateItem = () => {
    const {itemId, getData} = this.props;
    if (!itemId) {
      return;
    }
    getData(itemId)
      .then((item) => {
        this.setState({item, loading: false})
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: true
        });
      });
  }

  render() {
    const {item, loading, error} = this.state;
    if (error) {
      return <ErrorMessage />;
    }
    const spinner = loading ? <Spinner /> : null;
    const selectItem = !item ? <span className="select-error">Please select a character</span> : null;
    const content = !(loading || !item) ? <View item={item} children={this.props.children} /> : null;
    return (
      <div className="char-details rounded">
        {spinner}
        {selectItem}
        {content}
      </div>
    );
  }
}


const View = ({item, children}) => {
  const {name} = item;
  return (
    <>
      <h4>{name}</h4>
      <ul className="list-group list-group-flush">
        {
          React.Children.map(children, (child) => {
            return React.cloneElement(child, {item});
          })
        }
      </ul>
    </>
  );
}
