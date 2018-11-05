import React, { Component } from "react";

class Input extends Component {
  handleClick = address => {
    console.log(address);
  };
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
          onChange={event => this.props.updateQuery(event.target.value)}
        />
        {/* List of addresses from Foursquare */}
        <div className="locationList">
          {this.props.addresses.map(local => (
            <div
              key={local.venue.name}
              className="address"
              onClick={() => this.props.clickMarker(local.venue.id)}
            >
              <h4>{local.venue.name.toUpperCase()}</h4>
              <p>
                {local.venue.location.formattedAddress[0]},
                {local.venue.location.formattedAddress[1]}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Input;
