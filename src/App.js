import React, { Component } from "react";
import "./App.css";
import Map from "./Map";
import axios from "axios";
import Input from "./Input";
import escapeRegExp from "escape-string-regexp";

class App extends Component {
  state = {
    query: "",
    locations: [],
    photos: []
  };
  componentDidMount() {
    axios
      .get("https://api.foursquare.com/v2/venues/explore", {
        params: {
          client_id: "5RQJDOUUNXSGPAHMUHIIKG0H4TJXZV1PTB42MRM2L4M2435W",
          client_secret: "JR2E1K4WRYLEOJGSFWNYYEPLRR2PXXL1KB5ANU3U5E4KFPFZ",
          query: "Restaurants",
          near: "Belmont, MS",
          radius: 1000,
          v: "20180323"
        }
      })
      .then(
        response => {
          if (response.status === 200) {
            this.setState({
              locations: this.state.locations.concat(
                response.data.response.groups[0].items
              )
            });

            console.log(response);
            console.log(response.data.response.groups[0].items);
          }
      }).catch(error => {
          console.error(error);
      })
  }
  updateQuery = address => {
    this.setState({
      query: address
    });
  };

  render() {
    let filteredMarkers;
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), "i");
      filteredMarkers = this.state.locations.filter(
        b => match.test(b.venue.name) || match.test(b.venue.location.address)
      );
      console.log(filteredMarkers);
      console.log(this.state.photos);
    } else {
      filteredMarkers = this.state.locations;
    }
    return (
      <div className="app">
        <div className="titleBar">
          <Input addresses={filteredMarkers} updateQuery={this.updateQuery} />
        </div>
        <Map markers={filteredMarkers} />
      </div>
    );
  }
}

export default App;
