/* global google */
import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { compose, withProps } from "recompose";
import NavBar from "./NavBar";
import escapeRegExp from "escape-string-regexp";


/*
* The set up for maps using React-google-maps
*/
const MyMap = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: (
      <div
        style={{
          width: "100%",
          height: `100vh`,
          boxShadow: `0px 12px 60px #505052`,
          borderRadius: `10px`
        }}
      />
    ),
    mapElement: <div style={{ height: `100%` }} />
  }),
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={15} defaultCenter={{ lat: 34.50982, lng: -88.207 }}>
      {/*
      * Loop through my markers
      */}
    {props.markers.map(local => (
      <Marker
        className="marker"
        key={local.id}
        position={local.latLng[0]}
        onClick={() => {
          props.openClick(local);
          props.foursquareApi(local);
        }}
        animation={props.isOpen && props.showIndex === local.id && props.bounce}
      >
        {props.isOpen &&
          props.showIndex === local.id && (
              <InfoWindow onCloseClick={props.closeClick}>
              <div className="infoWindow">
                <h2>{local.name.toUpperCase()}</h2>
                {/*
                * Information gathered from the Foursquare api call
                */}
            { props.locationInfo[0] !== undefined && props.locationInfo.map(info => (
                  <div key={info.id}>
                      <p>Address: {info.location.formattedAddress[0]},</p>
                          <p>{info.location.formattedAddress[1]}</p>
                    {info.likes.summary && <p>Likes: {info.likes.summary}</p>}
                    {info.contact.formattedPhone &&
                      <p>Phone: {info.contact.formattedPhone}</p>
                    }
                    {info.hours && <p>Hours: {info.hours.status}</p>}
                    <a  href="https://foursquare.com/">Powered by Foursquare</a>
                  </div>
                ))}
            { props.locationInfo[0] === undefined  &&
                <p>Data not Available</p>
            }
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
    navToggled: true,
    error: null
  };
  componentWillMount() {
      this.setState({
          error: window.error || !navigator.onLine
      });
  }
  componentDidMount() {
    const windowWidth = window.innerWidth;
    /*
      * Finds the width of the window and toggles navigation bar for responsiveness
      */
    if (windowWidth < 880) {
      this.setState({
        navToggled: false
      });
    } else {
      this.setState({
        navToggled: true
      });
    }
  }



  /*
  * When a marker is clicked on the infoWindow is isOpened and makes it animate
  */
  openClick = index => {
    this.setState({
      isOpen: true,
      showIndex: index.id,
      animation: google.maps.Animation.BOUNCE
    });
  };
  /*
  * Closes the infoWindow and makes it stop animating
  */
  closeClick = () => {
    this.setState({
      isOpen: false,
      animation: null
    });
  };
  /*
  * Updates the Query state for filtering
  */
  updateQuery = address => {
    this.setState({
      query: address
    });
  };
  /*
  * Toggles the navigation bar open
  */
  openNav = () => {
    this.setState({
      navToggled: true
    });
  };
  /*
  * Toggles the navigation bar close
  */
  closeNav = () => {
    this.setState({
      navToggled: false
    });
  };

  render() {
    const { foursquare, location, locationInfo, logError } = this.props;
    const {
      navToggled,
      isOpen,
      showIndex,
      animation,
      query,
      error
    } = this.state;
    let filteredMarkers;
    let map;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      /*
      * Filters the markers by its name according to the query
      */
      filteredMarkers = location.filter(b => match.test(b.name));
    } else {
      /*
        * Default all markers
        */
      filteredMarkers = location;
    }
    if (!navToggled) {
      /*
        * If the navigation bar is closed make map full width
        */
      map = "moveMaps";
    } else {
      /*
        * If the navigation bar is open move map over for nav bar
        */
      map = "maps";
    }
    console.log(logError);

    console.log(location);
    return (
      <div className="mapApp">
        {/* NavBar */}
        <NavBar
          updateQuery={this.updateQuery}
          openClick={this.openClick}
          filteredMarkers={filteredMarkers}
          navToggled={navToggled}
          openNav={this.openNav}
          closeNav={this.closeNav}
          foursquare={foursquare}
          listQuery={query}
        />
        {error &&
            <div className="apiError">
                <span>GoogleMaps could not be loaded check your connection</span>
            </div>
        }
        <div className="error"></div>
    <div className={map} tabIndex='-1' role="application">
          {/* Render My Map
              */}
              {!error &&
            <MyMap
              markers={filteredMarkers}
              openClick={this.openClick}
              closeClick={this.closeClick}
              isOpen={isOpen}
              showIndex={showIndex}
              bounce={animation}
              foursquareApi={foursquare}
              locationInfo={locationInfo}
              logErr={logError}
            />
    }
        </div>
      </div>
    );
  }
}

export default Map;
