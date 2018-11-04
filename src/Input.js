import React, { Component } from "react";

class Input extends Component {
  handleClick = address => {
    console.log(address);
  };
  render() {
    return (
      <div className="input">
        <h1 className="header">Restaurants in Belmont, Ms</h1>
        <input
          id="filter-list"
          type="text"
          placeholder="Filter List"
          value={this.props.query}
          onChange={event => this.props.updateQuery(event.target.value)}
        />
        <ul className="locationList">
          {this.props.addresses.map(local => (
            <li key={local.venue.name} className="address">
              {local.venue.name.toUpperCase()},
              {local.venue.location.formattedAddress[0]},
              {local.venue.location.formattedAddress[1]},
              {local.venue.location.formattedAddress[2]}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Input;
