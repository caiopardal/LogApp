import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Card } from 'semantic-ui-react'
import {
  FloatingMenu,
  MainButton,
  ChildButton,
} from 'react-floating-button-menu';

import './App.css';
import firebase from './Firebase';
import Navbar from './components/Navbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('freights');
    this.unsubscribe = null;
    this.state = {
      freights: [],
      isOpen: false,
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const freights = [];
    querySnapshot.forEach((doc) => {
      const { type, value, author, date } = doc.data();
      freights.push({
        key: doc.id,
        doc, // DocumentSnapshot
        type,
        value,
        author,
        date,
      });
    });
    this.setState({
      freights
    });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title" style={{ fontWeight: 'bold', marginBottom: '25px', textAlign: 'center' }}>
                Lista de Fretes
              </h3>
            </div>
            <div className="panel-body">
              <Card.Group style={{ display: 'grid'}}>
                {this.state.freights.map((freight, index) => 
                  <Card key={index} as={Link} to={`/show/${freight.key}`} style={{ width: '500px' }}>
                    <Card.Content>
                      <Card.Header>{freight.author}</Card.Header>
                      <Card.Meta>{freight.type}</Card.Meta>
                      <Card.Description style={{ display: 'grid'}}> 
                        <span>R${freight.value}</span>
                        <span>{freight.date}</span>
                      </Card.Description>
                    </Card.Content>
                  </Card>
                )}
              </Card.Group>
            </div>
          </div>
        </div>
        <div style={{ float: 'right', marginRight: '40px' }}>
          <FloatingMenu
            slideSpeed={500}
            direction="up"
            spacing={8}
            isOpen={this.state.isOpen}
          >
            <MainButton
              className="mainButton"
              iconResting={<Icon style={{ fontSize: 20, margin: '0 0 8px 0' }} name='plus' />}
              iconActive={<Icon style={{ fontSize: 20, margin: '0 0 8px 0' }} name='times' />}
              onClick={() => this.setState({ isOpen: !this.state.isOpen })}
              size={56}
            />
            <ChildButton
              as={Link}
              to="/create" 
              icon={<Icon style={{ fontSize: 20, margin: '0 0 8px 0', color: 'black' }} name='truck' />}
              size={46}
            >
              <span>Adicionar</span>
            </ChildButton>
          </FloatingMenu>
        </div>
      </div>
    );
  }
}

export default App;