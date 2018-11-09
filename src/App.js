import React, { Component } from "react";
import "./App.css";
import Map from "./Map";

class App extends Component {
  state = {
    locations: [],
    logErr: ""
  };
  componentDidMount() {
    fetch(
      "https://api.foursquare.com/v2/venues/explore?client_id=5RQJDOUUNXSGPAHMUHIIKG0H4TJXZV1PTB42MRM2L4M2435W&client_secret=JR2E1K4WRYLEOJGSFWNYYEPLRR2PXXL1KB5ANU3U5E4KFPFZ&v=20180323&near=Belmont,MS&query=food&radius=1000"
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then(data => {
        this.setState({
          locations: this.state.locations.concat(data.response.groups[0].items)
        });

        console.log(data);
        console.log(data.response.groups[0].items);
      })
      .catch(error => {
        this.setState({
          logErr: "The API failed to load"
        });
        console.error(error);
      });
  }

  render() {
    let logError;
    if (this.state.logErr) {
      logError = this.state.logErr;
    } else {
      logError = "";
    }
    return (
      <div className="app">
        {this.state.logErr && (
          <div className="apiError">
            <span>{logError}</span>
          </div>
        )}
        <Map locations={this.state.locations} />
      </div>
    );
  }
}

export default App;
