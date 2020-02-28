import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import InputMask from "react-input-mask";

import Navbar from './Navbar';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('freights');
    this.state = {
      type: '',
      value: '',
      date: '',
      author: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { type, date, value, author } = this.state;

    this.ref.add({
      type,
      date,
      value,
      author
    }).then((docRef) => {
      this.setState({
        type: '',
        value: '',
        author: '',
        date: '',
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { type, value, date, author } = this.state;
    return (
      <div>
        <Navbar />
        <Button as={Link} to='/' icon labelPosition='left' style={{ margin: '0 0 20px 20px' }}>
          <Icon name='angle left' />
          Retornar para lista de fretes
        </Button>
        <div className="container">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title" style={{ marginBottom: '15px' }}>
                Adicionar novo frete
              </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="author">Nome da transportadora:</label>
                  <input type="text" className="form-control" name="author" value={author} onChange={this.onChange} placeholder="Logística SA" />
                </div>
                <div className="form-group">
                  <label htmlFor="type">Tipo do frete:</label>
                  <input type="text" className="form-control"name="type" value={type} onChange={this.onChange} placeholder="Tipo do frete" />
                </div>
                <div className="form-group">
                  <label htmlFor="value">Valor do frete:</label>
                  <input type="text" className="form-control" name="value" value={value} onChange={this.onChange} placeholder="1.000,00" />
                </div>
                <div className="form-group">
                  <label htmlFor="Date">Date:</label>
                  <InputMask className="form-control" name="date" mask="99/99/9999" onChange={this.onChange} value={date} placeholder="__/__/____"/>
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

export default Create;