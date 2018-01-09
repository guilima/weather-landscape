import React, { Component } from "react";
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
        <Autocomplete
          setCollection={(images, address) =>
            this.setState({
              images,
              address
            })
          }
        />
        <Landscape collection={this.state.images} city={this.state.address} />
      </div>
    );
  }
}

export default App;
