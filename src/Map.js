import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";


class Map extends Component {
  render() {
    const MyMap = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          defaultZoom={12}
          defaultCenter={{ lat: 34.5587054, lng: -88.2436643 }}
        >
        {props.markers.map(local =>
            <Marker className="marker" key={local.title} position={ local.location } />
        )}
        </GoogleMap>
      ))
    );
    return (
      <MyMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAyV5BZnr2kzuVz0q-hLwUYvvwN4Q6noU0&v=3.exp&libraries=geometry,drawing,places"
        markers={this.props.markers}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `765px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default Map;
