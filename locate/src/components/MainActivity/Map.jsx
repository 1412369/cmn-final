/* eslint-disable no-undef */
import _ from 'lodash'
import React from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  SearchBox,
  InfoWindow, Circle, DirectionsRenderer
} from "react-google-maps"
import { compose, withProps, lifecycle } from 'recompose'

class Map extends React.Component {
  constructor() {
    super()
    this.state = {
      center: {},
    }
  }
  componentDidMount() {
    const DirectionsService = new google.maps.DirectionsService();

    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({
      'address': '150 bau cat'
    }, (results, status) => {
      if (status === 'OK') {
        console.log(results)
        this.setState({
          ...this.state,
          center: results[0].geometry.location
        })
      }
    })
    // DirectionsService.route({
    //   origin: new google.maps.LatLng(10.7626272, 106.6805864),
    //   destination: new google.maps.LatLng(10.7626372, 106.6850864),
    //   travelMode: google.maps.TravelMode.DRIVING,
    // }, (result, status) => {
    //   if (status === google.maps.DirectionsStatus.OK) {
    //     this.setState({
    //       directions: result,
    //     });
    //   } else {
    //     console.error(`error fetching directions ${result}`);
    //   }
    // });
  }
  render() {
    const { center } = this.state
    return (
      <div>
        {
          Object.keys(center).length > 0 ?
            <GoogleMap
              defaultZoom={15}
              defaultCenter={center}
            >
              <Circle
                center={center}
                radius={1000}
              />
              {/* <DirectionsRenderer directions={props.directions} /> */}
              <Marker
                position={center}
                onClick={this.props.onMarkerClick}
                defaultVisible={true}
                // icon={{
                //   url: 'image/user.png',
                //   scaledSize: new google.maps.Size(30, 30)
                // }}
              >
                <InfoWindow ><div>this is infor</div></InfoWindow>
              </Marker>
            </GoogleMap >
            : <h2>Loading</h2>
        }
      </div>
    )


  }
}
const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCScHlkcWZyzl7P0MfNYutchAEzoSzAUgU&libraries=geometry,drawing,places&sensor=false",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `520px` }} />,
    mapElement: <div style={{ height: `100%`, width: "930px" }} />,
  }),
  withScriptjs,
  withGoogleMap
)(Map)
export default MyMapComponent