import React from 'react';

import GotService from '../../services/gotService';
import Items from '../items';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';

import './pages.scss';


export default class CharactersPage extends React.Component {
  gotService = new GotService();

  state = {
    selectedItem: null,
    error: false
  };

  componentDidCatch() {
    this.setState({
      error: true
    });
  }

  onItemSelected = (id) => {
    this.setState({selectedItem: id});
  }

  render() {
    const {selectedItem, error} = this.state;
    if (error) {
      return <ErrorMessage />;
    }
    const items = (
      <Items getData={this.gotService.getAllCharacters} 
             onItemSelected={this.onItemSelected}
             renderItem={({name, gender}) => `${name} (${gender})`} />
    );
    const details = selectedItem ? (
      <ItemDetails itemId={selectedItem} getData={this.gotService.getCharacter}>
        <Field field="gender" label="Gender" />
        <Field field="born" label="Born" />
        <Field field="died" label="Died" />
        <Field field="culture" label="Culture" />
      </ItemDetails>
    ) : <span className="please-select-item">Please, select item in the list</span>;
    return (
      <RowBlock items={items} details={details} />
    );
  }
}
