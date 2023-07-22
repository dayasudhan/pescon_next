import React, { Component } from 'react';
import { Menu, Input } from 'semantic-ui-react';
// import { Router   } from 'next/router';
import axios from 'axios';
export default class Header extends React.Component {
  
  state = { 
    activeItem: 'home' ,
    homelistrefLink: '/homelist',
    homerefLink: '/home',
    inforefLink: '/info'
};
  //router = useRouter();
  handleItemClick = (e, { name ,href}) => {
    //const { router } = Router;
    this.setState({ activeItem: name })
    this.setState({ refLink: href });
    //router.push('/pescon/list');
};
handlePdfItemClick = (e, { name ,href}) => {
  console.log("handlePdfItemClick")
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');
  console.log('id:', id);
  axios.get('/pdf?id='+id)
  .then(response => {
    console.log("response",response.data);
  })
  .catch(error => {
    console.log(error);
  });
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
        <Menu.Item
          name="CustoMer Detail"
          href={inforefLink}
          active={activeItem === 'plants'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu.Menu>
        <Menu.Item
            name="PDF"
            active={activeItem === 'Register'}
            onClick={this.handlePdfItemClick}
          />
        {/* <Menu.Menu position="right">
          <Menu.Item
            name="Register"
            active={activeItem === 'Register'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="login"
            active={activeItem === 'login'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu> */}
      </Menu>
    );
  }
}
