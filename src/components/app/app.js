import React from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../header';
import RandomChar from '../randomChar';
import { MainPage, CharactersPage, HousesPage, BooksPage, BooksItem, NotFound  } from '../pages';
import ErrorMessage from '../errorMessage';

import './app.scss';


export default class App extends React.Component {
  state = {
    showRandomChar: true,
    error: false
  }

  componentDidCatch() {
    this.setState({
      error: true
    });
  }

  onToggleRandomChar = () => {
    this.setState({
      showRandomChar: !this.state.showRandomChar
    });
  }

  render() {
    const {showRandomChar, error} = this.state;
    if (error) {
      return <ErrorMessage />;
    }
    const randomChar = showRandomChar ? <RandomChar /> : null;
    const color = showRandomChar ? "secondary" : "primary";
    const text = showRandomChar ? "Hide Random Character" : "Show Random Character";
    return (
      <Router>
        <div className="app"> 
          <Container>
            <Header />
          </Container>
          <Container>
            <Row>
              <Col lg={{size: 5, offset: 0}}>
                {randomChar}
                <Button className="button-toggle-random-char" color={color} onClick={this.onToggleRandomChar}>{text}</Button>
              </Col>
            </Row>
            <Switch>
              <Route path="/" exact component={MainPage} />
              <Route path="/characters" component={CharactersPage} />
              <Route path="/houses" component={HousesPage} />
              <Route path="/books" exact component={BooksPage} />
              <Route path="/books/:id" render={
                ({match, location, history}) => {
                  console.log(match, location, history);
                  const { id } = match.params;
                  return <BooksItem bookId={id} />
                }
              } />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}
