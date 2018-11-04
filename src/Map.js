import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { compose, withProps } from "recompose";

const mapHeight = window.innerHeight;
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
  <GoogleMap defaultZoom={15} defaultCenter={{ lat: 34.50982, lng: -88.20923 }}>
    {props.markers.map(
      local => (
        (
          <Marker
            className="marker"
            key={local.venue.id}
            position={local.venue.location.labeledLatLngs[0]}
            onClick={() => props.openClick(local.venue.id)}
          >
            {(props.isOpen && props.showIndex === local.venue.id) && <InfoWindow onCloseClick={props.closeClick}>
              <span>
                {local.venue.name.toUpperCase()},
                {local.venue.location.formattedAddress[0]},
                {local.venue.location.formattedAddress[1]},
                {local.venue.location.formattedAddress[2]}
              </span>
          </InfoWindow>}
          </Marker>
        )
      )
    )}
  </GoogleMap>
));

class Map extends Component {
    state = {
        isOpen: false,
        showIndex: null
    }
    openClick = (index) => {
        this.setState({
            isOpen: true,
            showIndex: index
        });
    }
    closeClick = () => {
        this.setState({
            isOpen: false
        });
    }
  render() {
    return (
      <div className="maps">
        <MyMap markers={this.props.markers} openClick={this.openClick} closeClick={this.closeClick} isOpen={this.state.isOpen} showIndex={this.state.showIndex}/>
      </div>
    );
  }
}

export default Map;
