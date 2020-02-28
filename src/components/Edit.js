import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import InputMask from "react-input-mask";

import Navbar from './Navbar';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      date: '',
      value: '',
      type: '',
      author: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('freights').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const freight = doc.data();
        this.setState({
          key: doc.id,
          date: freight.date,
          type: freight.type,
          value: freight.value,
          author: freight.author
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({freight:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { value, type, author, date } = this.state;

    const updateRef = firebase.firestore().collection('freights').doc(this.state.key);
    updateRef.set({
      type,
      value,
      date,
      author
    }).then((docRef) => {
      this.setState({
        key: '',
        value: '',
        type: '',
        author: '',
        date: '',
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div>
        <Navbar />
        <Button as={Link} to={`/show/${this.state.key}`} icon labelPosition='left' style={{ margin: '0 0 20px 20px' }}>
          <Icon name='angle left' />
          Retornar para frete atual
        </Button>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title" style={{ marginBottom: '15px' }}>
                Editar frete
              </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label for="author">Nome da transportadora:</label>
                  <input type="text" className="form-control" name="author" value={this.state.author} onChange={this.onChange} placeholder="Logística SA" />
                </div>
                <div className="form-group">
                  <label for="type">Tipo do frete:</label>
                  <input type="text" className="form-control"name="type" value={this.state.type} onChange={this.onChange} placeholder="Tipo do frete" />
                </div>
                <div className="form-group">
                  <label for="value">Valor do frete:</label>
                  <input type="text" className="form-control" name="value" value={this.state.value} onChange={this.onChange} placeholder="1.000,00" />
                </div>
                <div className="form-group">
                  <label for="Date">Date:</label>
                  <InputMask className="form-control" name="date" mask="99/99/9999" onChange={this.onChange} value={this.state.date} placeholder="__/__/____"/>
                </div>
                <button type="submit" className="btn btn-success" style={{ float: 'right' }}>Enviar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;