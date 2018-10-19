import React, { Component } from "react";
import "./App.css";
import Map from "./Map";

class App extends Component {
  render() {
    let locations = [
      {
        title: "HomeTown Pizza",
        location: { lat: 34.4774041, lng: -88.3070001 }
      },
      {
        title: "Piggly Wiggly",
        location: { lat: 34.4778503, lng: -88.3070959 }
    },{
        title: "Tiffins MotorhHomes Inc",
        location: { lat: 34.4778902, lng: -88.3070958 }
    }
    ];
    return (
      <div className="app">
        <div className="titleBar">
          <input id="filter-list" type="text" placeholder="Filter List" />
        </div>
        <Map markers={locations} />
      </div>
    );
  }
}

export default App;
