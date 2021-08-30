import React from 'react';

import './pages.scss';


export default class MainPage extends React.Component {
  render() {
    return (
      <div className="main">
        <h3 className="main-header">Welcome to GoT site!</h3>
        <p className="main-text">This is a small one-page application dedicated to Game of Thrones.</p>
        <p className="additional-text">Thank you very much anapioficeandfire.com for the free API.</p>
      </div>
    );
  }
}
