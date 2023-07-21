import React, { Component } from 'react';
import { Menu, Input, Segment } from 'semantic-ui-react';
import Link from 'next/link';
export default class Header extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <h5>
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </h5>
      </div>
    );
  }
}
