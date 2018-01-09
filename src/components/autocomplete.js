import React, { Component } from "react";
import loadjs from "./../helpers/loadjs";

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      googleapisOk: false
    };
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.state.googleapisOk !== nextState.googleapisOk) {
      console.log("show", nextState);
      const googleapisPlaces = new window.google.maps.places.Autocomplete(
        this.searchInput,
        { types: ["(cities)"] }
      );
      googleapisPlaces.addListener("place_changed", () =>
        this.showAutocomplete(googleapisPlaces)
      );
    }
  }
  showAutocomplete(googleapisPlaces) {
    var place = googleapisPlaces.getPlace();
    console.log("lugar", place);
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
    const address = place.formatted_address,
      photos = place.photos
        .filter(photo => photo.width > 2000)
        .map(photo => photo.getUrl({ maxWidth: 3200, maxHeight: 3200 }));
    console.log("fotos", photos);
    this.props.setCollection(photos, address);
  }
  componentDidMount() {
    loadjs(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDi34mA0m-tmJqwWwFsaowmbzKrTkUCg9Y&libraries=places&language=pt-br"
    )
      .then(() => this.setState({ googleapisOk: true }))
      .catch(e => console.error(e));
  }
  render() {
    return (
      <input className="searchBar" ref={input => (this.searchInput = input)} />
    );
  }
}

export default Autocomplete;
