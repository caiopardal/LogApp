import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import { Button, Icon, Card } from 'semantic-ui-react';

import Navbar from './Navbar';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      freight: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('freights').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          freight: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('freights').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <Button as={Link} to='/' icon labelPosition='left' style={{ margin: '0 0 40px 20px' }}>
          <Icon name='angle left' />
          Retornar para lista de fretes
        </Button>
        <div className="container">
          <Card style={{ width: '500px' }}>
            <Card.Content>
              <Card.Header>Nome da transportadora: {this.state.freight.author}</Card.Header>
              <Card.Meta>Tipo do frete: {this.state.freight.type}</Card.Meta>
              <Card.Description style={{ display: 'grid'}}> 
                <span>Valor: R${this.state.freight.value}</span>
                <span>Data: {this.state.freight.date}</span>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button as={Link} to={`/edit/${this.state.key}`} basic color='blue'>
                  Editar
                </Button>
                <Button onClick={this.delete.bind(this, this.state.key)} basic color='red'>
                  Excluir
                </Button>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    );
  }
}

export default Show;