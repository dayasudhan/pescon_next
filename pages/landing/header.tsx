import React, { Component } from 'react';
import { Menu, Input } from 'semantic-ui-react';

export default class Header extends React.Component {
  
  state = { 
    activeItem: 'home' ,
    homelistrefLink: '/homelist',
    homerefLink: '/home',
    inforefLink: '/info'
};

  handleItemClick = (e, { name ,href}) => {
    this.setState({ activeItem: name })
    this.setState({ refLink: href });
};

  render() {
    const { activeItem,homelistrefLink,homerefLink,inforefLink } = this.state;

    return (
      <Menu inverted seconday pointing size="mini" color="blue">
        <Menu.Item
          name="Home"
          active={activeItem === 'home'}
          href={homerefLink}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="List"
          active={activeItem === 'equipments'}
          href={homelistrefLink}
          onClick={this.handleItemClick}
        />
        {/* <Menu.Item
          name="CustoMer Detail"
          href={inforefLink}
          active={activeItem === 'plants'}
          onClick={this.handleItemClick}
        /> */}
      </Menu>
    );
  }
}
