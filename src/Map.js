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
import NavBar from "./NavBar";
import escapeRegExp from "escape-string-regexp";


const mapHeight = window.innerHeight;

const MyMap = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAyV5BZnr2kzuVz0q-hLwUYvvwN4Q6noU0&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
containerElement: <div style={{ width: "100%", height: `${mapHeight}px` , border: `3px solid black`, borderRadius: `10px`}} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={15} defaultCenter={{ lat: 34.50982, lng: -88.207 }}>

    {props.markers.map(local => (
      <Marker
        className="marker"
        key={local.venue.id}
        position={local.venue.location.labeledLatLngs[0]}
        onClick={() => props.openClick(local.venue)}
        animation={
          props.isOpen && props.showIndex === local.venue.id && props.bounce
        }
      >

        {props.isOpen &&
          props.showIndex === local.venue.id && (
            <InfoWindow onCloseClick={props.closeClick}>
              <div className="infoWindow">
                <img
                  src={local.venue.categories[0].icon.prefix + "100.png"}
                  alt=" "
                  className="img"
                />
                <h2>{local.venue.name.toUpperCase()}</h2>
                <p>
                  {local.venue.location.formattedAddress[0]},{
                    local.venue.location.formattedAddress[1]
                  }
                </p>
              </div>
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
    query: "",
    navToggled: true
  };
  openClick = index => {
    this.setState({
      isOpen: true,
      showIndex: index.id,
      animation: google.maps.Animation.BOUNCE
    });
  };
  closeClick = () => {
    this.setState({
      isOpen: false,
      animation: null
    });
  };
  updateQuery = address => {
    this.setState({
      query: address
    });
  };
  openNav = () => {
    this.setState({
      navToggled: true
    });
  };
  closeNav = () => {
    this.setState({
      navToggled: false
    });
  };
  render() {
    let filteredMarkers;
    let map;
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), "i");
      filteredMarkers = this.props.locations.filter(
        b =>
          match.test(b.venue.name) ||
          match.test(b.venue.location.formattedAddress[0]) ||
          match.test(b.venue.location.formattedAddress[1])
      );
      console.log(filteredMarkers);
    } else {
      filteredMarkers = this.props.locations;
    }
    if (!this.state.navToggled) {
        map='moveMaps'
    } else {
        map='maps'
    }

    return (
      <div className="mapApp">
        <NavBar
          updateQuery={this.updateQuery}
          openClick={this.openClick}
          filteredMarkers={filteredMarkers}
          navToggled={this.state.navToggled}
          openNav={this.openNav}
          closeNav={this.closeNav}
        />
    <div className={map}>
          <MyMap
            markers={filteredMarkers}
            openClick={this.openClick}
            closeClick={this.closeClick}
            isOpen={this.state.isOpen}
            showIndex={this.state.showIndex}
            bounce={this.state.animation}
            image={this.state.picture}
            alt=''
          />
        </div>
      </div>
    );
  }
}

export default Map;
