import React from 'react';
import { Link } from 'react-router-dom';

import './pages.scss';


export default class NotFound extends React.Component {
  render() {
    return (
      <>
        <div className="not-found-404"><p>404 — Not Found!</p></div>
        <button className="center-button"><Link to="/">Вернуться на главную?</Link></button>
      </>
    );
  }
}
