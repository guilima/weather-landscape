import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import loadjs from "./loadjs";

class App extends Component {
  componentDidMount() {
    function showAutocomplete(autocomplete) {
      var place = autocomplete.getPlace();
      console.log("lugar", place);
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      const photos = place.photos
        .filter(photo => photo.width > 2000)
        .map(photo => photo.getUrl({ maxWidth: 6000, maxHeight: 6000 }));
      console.log("fotos", photos);
    }
    loadjs(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDi34mA0m-tmJqwWwFsaowmbzKrTkUCg9Y&libraries=places&language=pt-br"
    )
      .then(() => {
        const autocomplete = new window.google.maps.places.Autocomplete(
          this.searchInput,
          { types: ["(cities)"] }
        );
        autocomplete.addListener("place_changed", () =>
          showAutocomplete(autocomplete)
        );
      })
      .catch(e => console.log(e));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <input ref={input => (this.searchInput = input)} />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
