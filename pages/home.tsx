import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import Header from './landing/header';
import 'semantic-ui-css/semantic.css';
import PersonDetails from './pescon/input';

export default class Cart extends Component {
  render() {
    return (
      <Segment>
        <Header />
        <PersonDetails />
        {/* <Footer /> */}
      </Segment>
    );
  }
}
