import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import ImageCarousel from './landing/carousal';
import Header from './landing/header';
// import Header2 from './landing/header2';
import 'semantic-ui-css/semantic.css';
import PersonDetails from './details';

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
