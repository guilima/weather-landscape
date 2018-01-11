import React, { Component } from "react";

class Landscape extends Component {
  constructor(props) {
    super(props);
    this.handleArrowClick = this.handleArrowClick.bind(this);
    this.slideIncrease = this.slideIncrease.bind(this);
    this.slideDecrease = this.slideDecrease.bind(this);
    this.state = {
      slide: { position: 0, total: 0, animate: false }
    };
  }

  componentWillReceiveProps(nextProps) {
    const hasChangedCity = this.props.collection[0] !== nextProps.collection[0];
    if (hasChangedCity) {
      this.setState({
        slide: {
          animate: false,
          position: 0,
          total: nextProps.collection.length - 1
        }
      });
    }
  }

  slideDecrease() {
    const firstSlide = this.state.slide.position === 0;
    this.setState(prevState => ({
      slide: {
        ...this.state.slide,
        position: firstSlide
          ? this.state.slide.total
          : prevState.slide.position - 1,
        animate: true
      }
    }));
  }

  slideIncrease() {
    const lastSlide = this.state.slide.position >= this.state.slide.total;
    this.setState(prevState => ({
      slide: {
        ...this.state.slide,
        position: lastSlide ? 0 : prevState.slide.position + 1,
        animate: true
      }
    }));
  }

  handleArrowClick(direction) {
    direction();
  }

  render() {
    const { collection, city } = this.props,
      { slide: { total, position, animate } } = this.state;

    console.log(total, position, animate);

    if (collection.length === 0) return <div />;
    const images = collection.map((image, index) => (
      <img src={image} key={index} alt={"Locate in " + city} />
    ));
    return (
      <div className="media-slide">
        {total >= 1 ? (
          <div className="media-slide-arrow arrow-left">
            <button
              className="btn-arrow"
              onClick={() => this.handleArrowClick(this.slideIncrease)}
            >
              &#8249;
            </button>
          </div>
        ) : (
          <React.Fragment />
        )}
        <div
          className={"slider" + (!animate ? " no-animate" : "")}
          style={{ transform: "translateX(" + position * 100 + "%)" }}
        >
          {images}
        </div>
        {total >= 1 ? (
          <div className="media-slide-arrow arrow-right">
            <button
              className="btn-arrow"
              onClick={() => this.handleArrowClick(this.slideDecrease)}
            >
              &#8250;
            </button>
          </div>
        ) : (
          <React.Fragment />
        )}
      </div>
    );
  }
}

export default Landscape;
