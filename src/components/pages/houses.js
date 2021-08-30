import React from 'react';

import GotService from '../../services/gotService';
import Items from '../items';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';

import './pages.scss';


export default class HousesPage extends React.Component {
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
      <Items getData={this.gotService.getAllHouses} 
             onItemSelected={this.onItemSelected}
             renderItem={({name}) => `${name}`} />
    );
    const details = selectedItem ? (
      <ItemDetails itemId={selectedItem} getData={this.gotService.getHouse}>
        <Field field="name" label="Name" />
        <Field field="region" label="Region" />
        <Field field="words" label="Words" />
        <Field field="titles" label="Titles" />
        <Field field="overlord" label="Overlord" />
        <Field field="ancestralWeapons" label="Ancestral Weapons" />
      </ItemDetails>
    ) : <span className="please-select-item">Please, select item in the list</span>;
    return (
      <RowBlock items={items} details={details} />
    );
  }
}
