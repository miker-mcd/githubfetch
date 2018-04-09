import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    cards: []
  };
  render() {
    return (
      <div>
        <Form onSubmit={this.addNewCard} />
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}

const Card = props => {
  return (
    <div style={{ margin: '1em' }}>
      <img alt="avatar" style={{ width: '70px' }} src={props.avatar_url} />
      <div>
        <div style={{ fontWeight: 'bold' }}>{props.name}</div>
        <div>{props.blog}</div>
      </div>
    </div>
  );
};

const CardList = props => {
  return <div>{props.cards.map(card => <Card {...card} />)}</div>;
};

class Form extends React.Component {
  state = {
    userName: ''
  };

  handleSubmit = event => {
    event.prevenDefault();

    axios.get(`https://api.github.com/users/${this.state.userName}`).then(resp => {
      this.props.onSubmit(resp.data);
      this.setState({ userName: '' });
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.userName}
          onChange={event => this.setState({ userName: event.target.value })}
          placeholder="GitHub username"
          required
        />
        <button type="submit">Add card</button>
      </form>
    );
  }
}

export default App;
