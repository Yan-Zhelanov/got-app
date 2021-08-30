import React from 'react';

import './errorMessage.css';
import errorImg from './error.jpg';


const ErrorMessage = () => {
  return (
    <>
      <img className="error-img" src={errorImg} alt="error"></img>
      <span className="error-text">Something went wrong!</span>
    </>
  )
}

export default ErrorMessage;
