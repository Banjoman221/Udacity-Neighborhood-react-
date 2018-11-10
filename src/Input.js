import React, { Component } from "react";

class Input extends Component {
    /*
    * If the width of the window is below 880px hide the side navBar
    */
    responsiveToggle = () => {
        const mapWidth = window.innerWidth;
        if (mapWidth < 880) {
             this.props.toggleNav()
        }
    }
  render() {
    return (
      <div className="input">
        {/* Header for address list*/}
        <h1 className="header">Restaurants in Belmont, Ms</h1>
        {/* Input for updating query */}
        <input
          id="filter-list"
          type="text"
          placeholder="Filter List"
          value={this.props.query}
          aria-label='Filter list for Restaurants'
          onChange={event => this.props.updateQuery(event.target.value)}
        />
    {/* List of Names of places */}
        <div className="locationList">
          {this.props.addresses.map(local => (
            <div className="addressList" key={local.name}>
              <button
                className="address"
                onClick={() => {
                  this.props.clickMarker(local);
                  this.responsiveToggle();
                  this.props.foursquare(local)
                }}
              >
              <h3>{local.name.toUpperCase()}</h3>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Input;
