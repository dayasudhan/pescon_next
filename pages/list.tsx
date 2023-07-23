import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import Header from './landing/header';
import 'semantic-ui-css/semantic.css';
import List from './pescon/list';

export default class HomeList extends Component {
  render() {
    return (
      <Segment>
        <Header />
        <List/>
        {/* <Footer /> */}
      </Segment>
    );
  }
}
