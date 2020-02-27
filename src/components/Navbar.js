import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header, Image, Divider } from 'semantic-ui-react'

import logo from '../assets/logo.png'

const ColoredLine = ({ color }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          height: 5
      }}
  />
);

class Navbar extends Component {

  render() {
    return (
      <div>
        <Header as='h2'>
          <Image src={logo} style={{ height: '125px', width: '300px' }}/>
        </Header>
        <ColoredLine color="#fa5200" />
      </div>
    );
  }
}

export default Navbar;