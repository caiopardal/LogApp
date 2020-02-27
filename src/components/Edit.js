import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

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
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              EDIT FREIGHT
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to={`/show/${this.state.key}`} className="btn btn-primary">Freight List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="author">Author:</label>
                <input type="text" className="form-control" name="author" value={this.state.author} onChange={this.onChange} placeholder="Author" />
              </div>
              <div className="form-group">
                <label for="type">Type:</label>
                <textarea className="form-control" name="type" onChange={this.onChange} placeholder="Freight type" cols="80" rows="3" value={this.state.type}></textarea>
              </div>
              <div className="form-group">
                <label for="value">Value:</label>
                <input type="text" className="form-control" name="value" value={this.state.value} onChange={this.onChange} placeholder="Value" />
              </div>
              <div className="form-group">
                <label for="Date">Date:</label>
                <input type="text" className="form-control" name="date" value={this.state.date} onChange={this.onChange} placeholder="Date" />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;