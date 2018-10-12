import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    dogs: [],
    newDogName: ""
  };
  componentDidMount() {
    fetch("http://localhost:3000/dogs")
      .then(r => r.json())
      .then(dogs => {
        this.setState({
          dogs
        });
      });
  }

  onChange = event => this.setState({ newDogName: event.target.value });

  handleNewDog = () => {
    const postConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.newDogName
      })
    };
    const apiAddress = "http://localhost:3000/dogs";
    fetch(apiAddress, postConfig).then(r => r.json());
    // .then(dog => {
    //   this.setState({
    //     dogs: [...this.state.dogs, dog],
    //     newDogName: ""
    //   });
    // });
    const dog = { id: `${new Date()}`, name: `${this.state.newDogName}` };
    this.setState({
      dogs: [...this.state.dogs, dog],
      newDogName: ""
    });
  };

  render() {
    return (
      <div>
        <h1>A dog named Fish</h1>
        {this.state.dogs.map(d => {
          return <p key={d.id}>{d.name}</p>;
        })}
        <h2>Add dog</h2>
        <input
          onChange={this.onChange}
          type="text"
          value={this.state.newDogName}
        />
        <button onClick={this.handleNewDog}>Add puppy</button>
      </div>
    );
  }
}

export default App;
