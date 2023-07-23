import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import ImageCarousel from './landing/carousal';
import Header from './landing/header';
import Header2 from './landing/header2';
import Footer from './landing/footer';
import 'semantic-ui-css/semantic.css';
import Info from './pescon/aggreement';

export default class HomeList extends Component {
  render() {
    return (
      <Segment>
        <Header />
        <Info/>
        {/* <Footer /> */}
      </Segment>
    );
  }
}
