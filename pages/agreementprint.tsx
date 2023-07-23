import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.css';
import Info from './pescon/aggreement';

export default class HomeList extends Component {
  render() {
    return (
      <Segment>

        <Info hideButton={true}/>
        {/* <Footer /> */}
      </Segment>
    );
  }
}
