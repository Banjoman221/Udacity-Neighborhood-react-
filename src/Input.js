import React, { Component } from "react";

class Input extends Component {
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
          aria-label='filter list'
          onChange={event => this.props.updateQuery(event.target.value)}
        />
        {/* List of addresses from Foursquare */}
        <div className="locationList">
          {this.props.addresses.map(local => (
            <div className="addressList" key={local.venue.name}>
              <div
                className="address"
                onClick={() => {
                  this.props.clickMarker(local.venue);
                  this.props.toggleNav();
                }}
              >
                <h3>{local.venue.name.toUpperCase()}</h3>
                <p>
                  {local.venue.location.formattedAddress[0]},
                  {local.venue.location.formattedAddress[1]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Input;
