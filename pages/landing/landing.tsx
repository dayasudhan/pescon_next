import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import ImageCarousel from './carousal';
import Header from './header';
import Header2 from './header2';
import Footer from './footer';
import Items from './items';
import 'semantic-ui-css/semantic.css';
// import './Header.scss';

export default class Landing extends Component {
  render() {
    return (
      <Segment>
        <Header2 />
        <Header />
        <ImageCarousel />
        <Items />
        <Footer />
      </Segment>
    );
  }
}
