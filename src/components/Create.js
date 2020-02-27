import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

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
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              ADD FREIGHT
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/" className="btn btn-primary">Freight List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="author">Author:</label>
                <input type="text" className="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author" />
              </div>
              <div className="form-group">
                <label htmlFor="type">Type:</label>
                <textarea className="form-control" name="type" onChange={this.onChange} placeholder="Freight type" cols="80" rows="3" value={type}></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="value">Value:</label>
                <input type="text" className="form-control" name="value" value={value} onChange={this.onChange} placeholder="Value" />
              </div>
              <div className="form-group">
                <label htmlFor="Date">Date:</label>
                <input type="text" className="form-control" name="date" value={date} onChange={this.onChange} placeholder="Date" />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;