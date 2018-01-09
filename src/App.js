import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Autocomplete from "./components/autocomplete";
import Landscape from "./components/landscape";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      address: ""
    };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Autocomplete
          setCollection={(images, address) =>
            this.setState({
              images,
              address
            })
          }
        />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Landscape collection={this.state.images} city={this.state.address} />
      </div>
    );
  }
}

export default App;
