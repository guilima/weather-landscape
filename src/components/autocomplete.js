import React, { Component } from "react";
import { debounce } from "lodash";

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.getDebouncePredictions = debounce(this.getDebouncePredictions, 300);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.state = {
      predictions: [],
      searchTerm: "",
      show: false
    };
  }

  getDebouncePredictions(searchTerm) {
    const service = new window.google.maps.places.AutocompleteService();
    const displaySuggestions = (predictions, status) => {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        console.warn(status);
        return;
      }
      //console.log(predictions);
      this.setState({
        show: true,
        predictions: predictions.map(prediction => {
          const {
            place_id,
            structured_formatting: {
              main_text_matched_substrings,
              secondary_text_matched_substrings,
              main_text,
              secondary_text
            }
          } = prediction;
          return {
            place_id,
            city: {
              name: main_text,
              matchedSubstring: main_text_matched_substrings
                ? main_text.substring(
                    main_text_matched_substrings[0].offset,
                    main_text_matched_substrings[0].length
                  )
                : null
            },
            estate: {
              name: secondary_text,
              matchedSubstring: secondary_text_matched_substrings
                ? secondary_text.substring(
                    secondary_text_matched_substrings[0].offset,
                    secondary_text_matched_substrings[0].length
                  )
                : null
            }
          };
        })
      });
    };
    if (!searchTerm) {
      this.setState({
        predictions: []
      });
      return;
    }

    service.getPlacePredictions(
      { input: searchTerm, types: ["(cities)"] },
      displaySuggestions
    );
  }

  handleSearchChange(searchTerm) {
    this.setState({ searchTerm }, () => {
      this.getDebouncePredictions(searchTerm);
    });
  }

  handleBlur() {
    if (this.state.searchTerm && this.state.predictions.length > 0) {
      this.setState({ show: false });
    }
  }

  handleFocus() {
    if (this.state.searchTerm && this.state.predictions.length > 0) {
      this.setState({ show: true });
    }
  }

  setCollectionProps(place_id) {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.getDetails({ placeId: place_id }, (place, status) => {
      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      const address = place.formatted_address,
        photos = place.photos
          ? place.photos
              .filter(photo => photo.width > 2000)
              .map(photo => photo.getUrl({ maxWidth: 3200, maxHeight: 3200 }))
          : [];
      this.props.setCollection(photos, address);
      this.setState({ searchTerm: address, predictions: [] });
    });
  }

  render() {
    console.log("inside autocomplete");
    const predictionsList = predictions => {
      return (
        <div className="pac-container pac-logo">
          {predictions.map((prediction, index) => {
            const { city, estate, place_id } = prediction;
            return (
              <div
                className="pac-item"
                onMouseDown={() => this.setCollectionProps(place_id)}
                key={place_id}
              >
                <span className="pac-icon pac-icon-marker" />
                <span className="pac-item-query">
                  {city.matchedSubstring ? <b>{city.matchedSubstring}</b> : ""}
                  {city.matchedSubstring
                    ? city.name.replace(city.matchedSubstring, "")
                    : city.name}
                </span>
                <span>
                  {estate.matchedSubstring ? (
                    <b>{estate.matchedSubstring}</b>
                  ) : (
                    ""
                  )}
                  {estate.matchedSubstring
                    ? estate.name.replace(estate.matchedSubstring, "")
                    : estate.name}
                </span>
              </div>
            );
          })}
        </div>
      );
    };

    return (
      <React.Fragment>
        <div>
          <input
            placeholder="Digite um local"
            autoComplete="off"
            className="searchBar"
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            value={this.state.searchTerm}
            onChange={e => this.handleSearchChange(e.target.value)}
          />
          {this.state.show ? predictionsList(this.state.predictions) : ""}
        </div>
        <div className="search-explore-text">
          <small>
            Explore cities around the world and find more about weather
            conditions
          </small>
        </div>
      </React.Fragment>
    );
  }
}

export default Autocomplete;
