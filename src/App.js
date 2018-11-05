import React, { Component } from "react";
import "./App.css";
import Map from "./Map";
import axios from "axios";

class App extends Component {
  state = {
    locations: []
  };
  componentDidMount() {
     { /* Grabs the information from Foursquare api about Restaurants in Belmont, MS */}
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
      .then(response => {
        if (response.status === 200) {
          this.setState({
            locations: this.state.locations.concat(
              response.data.response.groups[0].items
            )
          });

          console.log(response);
          console.log(response.data.response.groups[0].items);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="app">
        <Map locations={this.state.locations} />
      </div>
    );
  }
}

export default App;
