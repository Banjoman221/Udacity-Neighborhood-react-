import React, { Component } from "react";
import "./App.css";
import Map from "./Map";


class App extends Component {
  state = {
    locations: [{
        'id': "4df6976862e141c907622c93",
        'name':'Subway',
        'address': '361 2nd St, Belmont, MS 38827',
        'latLng':[{  'lat':34.507865,  'lng': -88.207565}]
    },{
        'id': "4e26095e149503e37192eeb1",
        'name':'SONIC Drive In',
        'address': '291 2nd St, Belmont, MS 38827',
        'latLng': [{ 'lat':34.500472535568,  'lng': -88.2068869471549}]
    },{
        'id': "55ea8f57498e8a5c53dbad2d",
        'name':'Hallmark"s Restaurant',
        'address': '15 3RD ST, Belmont, MS 38827',
        'latLng': [{'lat':34.50832484674941,  'lng': -88.20935726165771}]
    },{
        'id': '50a2e0b3e4b068340ee7031d',
        'name':"Costa Oaxaqueña",
        'address': 'Main Street, Belmont, MS 38827',
        'latLng': [{ 'lat':34.50950322558888,  'lng': -88.20876079804148}]
    },{
        'id': "52bc92da498e4aaf1e6c2c0c",
        'name':'Hometown Pizza',
        'address': 'Belmont, MS, United States',
        'latLng': [{ 'lat':34.5077681647155, 'lng': -88.20660078502023}]
    }],
    logErr: "",
    locationInfo: [],
    error: false
};
componentWillMount() {
    this.setState({
        error: window.error || !navigator.onLine
    });
}
/*
* Fetch The Additional Data from Foursquare
*/
  fetchData = (location) => {
      fetch('https://api.foursquare.com/v2/venues/' + location.id +'?&client_id=5RQJDOUUNXSGPAHMUHIIKG0H4TJXZV1PTB42MRM2L4M2435W&client_secret=JR2E1K4WRYLEOJGSFWNYYEPLRR2PXXL1KB5ANU3U5E4KFPFZ&v=20180323'
      )
        .then(response => {
            return response.json()
        }).then(data => {
            if (this.state.locationInfo) {
                this.setState({
                    locationInfo: []
                });
            }
            this.setState({
                locationInfo: this.state.locationInfo.concat(data.response.venue)
            });
            console.log(this.state.locationInfo)
        })
        .catch(error => {
          this.setState({
            logErr: "The API failed to load check internet connection"
          });
          console.error(error);
        });
  }


  render() {
      const {logErr,locations , locationInfo, error} = this.state;
      /*
      * If there is an error set it to logErr or if not an empty string
      */
      let logError;
    if (logErr) {
      logError = logErr;
    } else {
      logError = "";
    }
    return (
        <div className="app">
            {/* Error Message if fetchData does not work*/}
            {logErr && <div className='apiError'>
                <span>{logError}</span>
            </div>}
            { !error &&
                <Map location={locations} foursquare={this.fetchData} locationInfo={locationInfo} logErr={logError}/>
            }
              {error &&
                  <div className="apiError">
                      <span>GoogleMaps could not be loaded check your connection</span>
                  </div>
              }
      </div>
    );
  }
}

export default App;
