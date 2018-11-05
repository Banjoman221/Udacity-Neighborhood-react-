/* global google */
import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { compose, withProps } from "recompose";
import Input from "./Input";
import escapeRegExp from "escape-string-regexp";

{/* Sets the height of the map to window */}
const mapHeight = window.innerHeight;
{/* Creates the GoogleMap */}
const MyMap = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAyV5BZnr2kzuVz0q-hLwUYvvwN4Q6noU0&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `${mapHeight}px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={15} defaultCenter={{ lat: 34.50982, lng: -88.207 }}>
      {/* Map Markers */}
    {props.markers.map(local => (
      <Marker
        className="marker"
        key={local.venue.id}
        position={local.venue.location.labeledLatLngs[0]}
        onClick={() => props.openClick(local.venue.id)}
        animation={
          props.isOpen && props.showIndex === local.venue.id && props.bounce
        }
      >
      {/* InfoWindow for Markers */}
        {props.isOpen &&
          props.showIndex === local.venue.id && (
            <InfoWindow onCloseClick={props.closeClick}>
              <span>
                {local.venue.name.toUpperCase()},
                {local.venue.location.formattedAddress[0]},
                {local.venue.location.formattedAddress[1]},
                {local.venue.location.formattedAddress[2]}
              </span>
            </InfoWindow>
          )}
      </Marker>
    ))}
  </GoogleMap>
));

class Map extends Component {
  state = {
    isOpen: false,
    showIndex: null,
    animation: null,
    query: ""
  };
  openClick = index => {
      {/* Sets animation and grabs the index and allows the InfoWindow to popup */}
    this.setState({
      isOpen: true,
      showIndex: index,
      animation: google.maps.Animation.BOUNCE
    });
  };
  closeClick = () => {
      {/* Sets animation to null and closes InfoWindow */}
    this.setState({
      isOpen: false,
      animation: null
    });
  };
  updateQuery = address => {
      {/* Updates the query of input */}
    this.setState({
      query: address
    });
  };

  render() {
    let filteredMarkers;
    if (this.state.query) {
        {/* Filters through the markers and sees if the query matches the letters or numbers on the list */}
      const match = new RegExp(escapeRegExp(this.state.query), "i");
      filteredMarkers = this.props.locations.filter(
        b =>
          match.test(b.venue.name) ||
          match.test(b.venue.location.formattedAddress[0]) ||
          match.test(b.venue.location.formattedAddress[1])
      );
      console.log(filteredMarkers);
    } else {
        {/* All Markers */}
      filteredMarkers = this.props.locations;
    }
    return (
      <div className="mapApp">
        <div className="titleBar">
            {/* Input for filtering the markers */}
          <Input
            addresses={filteredMarkers}
            updateQuery={this.updateQuery}
            clickMarker={this.openClick}
          />
        </div>
        <div className="maps">
            {/* GoogleMap */}
          <MyMap
            markers={filteredMarkers}
            openClick={this.openClick}
            closeClick={this.closeClick}
            isOpen={this.state.isOpen}
            showIndex={this.state.showIndex}
            bounce={this.state.animation}
          />
        </div>
      </div>
    );
  }
}

export default Map;
